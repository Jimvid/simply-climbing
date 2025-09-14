import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { getConfig } from "../config";

interface ApiStackProps extends cdk.StackProps {
  domainName: string;
  certificateArn: string;
}

export class ApiStack extends cdk.Stack {}

export class ApiWithDynamo extends Construct {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id);

    const config = getConfig();
    const dlq = new sqs.Queue(this, "ApiLambdaDlq");

    // DynamoDB
    const table = new cdk.aws_dynamodb.Table(this, "SimplyClimbing", {
      partitionKey: {
        name: "id",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
    });

    // Setup domain
    const { domainName, certificateArn } = props;
    const rootDomain = domainName.split(".").slice(-2).join(".");
    const subdomainPart = domainName.replace(`.${rootDomain}`, "");
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: rootDomain,
    });

    // Import SSL certificate from ARN
    const certificate = Certificate.fromCertificateArn(
      this,
      "Certificate",
      certificateArn,
    );

    const customDomain = new apigateway.DomainName(this, "CustomDomain", {
      domainName: props.domainName,
      certificate: certificate,
      endpointType: apigateway.EndpointType.EDGE,
    });

    // Lambda - API
    const apiLambda = new lambda.Function(this, "ApiLambda", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      handler: "bootstrap",
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      deadLetterQueue: dlq,
      tracing: lambda.Tracing.ACTIVE,
      code: lambda.Code.fromAsset("../apps/api", {
        bundling: {
          image: lambda.Runtime.PROVIDED_AL2023.bundlingImage,
          command: [
            "bash",
            "-c",
            "export GOCACHE=/tmp/go-cache && export GOMODCACHE=/tmp/go-mod && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o /asset-output/bootstrap ./cmd",
          ],
        },
      }),
      environment: {
        TABLE_NAME: table.tableName,
        CLERK_SECRET: config.CLERK_SECRET,
      },
    });
    // CloudWatch
    new cloudwatch.Alarm(this, "LambdaErrorAlarm", {
      metric: apiLambda.metricErrors(),
      threshold: 5,
      evaluationPeriods: 2,
    });

    // API Gateway
    const api = new apigateway.RestApi(this, "SimplyClimbingApi", {
      restApiName: "Simply Climbing API",
      description: "API for 'Simply Climbing' application",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    // Add domain name to API gateway
    customDomain.addBasePathMapping(api);

    // Create a new record
    new route53.ARecord(this, "ARecord", {
      zone: hostedZone,
      recordName: subdomainPart,

      target: route53.RecordTarget.fromAlias(
        new route53Targets.ApiGatewayDomain(customDomain),
      ),
    });

    // Grant access to the DynamoDB table
    table.grantReadData(apiLambda);
    table.grantWriteData(apiLambda);

    // Integration
    const lambdaIntegration = new apigateway.LambdaIntegration(apiLambda);

    // Proxy everything and handle routes in the lambda
    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
    });

    // Outputs
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "API Gateway URL",
    });

    new cdk.CfnOutput(this, "DynamoTableName", {
      value: table.tableName,
      description: "DynamoDB table name",
    });
  }
}
