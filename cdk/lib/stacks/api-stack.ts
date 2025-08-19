import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dlq = new sqs.Queue(this, "ApiLambdaDlq");

    // DynamoDB
    const table = new cdk.aws_dynamodb.Table(this, "SimplyClimbing", {
      partitionKey: {
        name: "id",
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
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
