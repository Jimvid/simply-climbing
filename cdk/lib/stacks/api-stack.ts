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
    });

    // CloudWatch
    new cloudwatch.Alarm(this, "LambdaErrorAlarm", {
      metric: apiLambda.metricErrors(),
      threshold: 5,
      evaluationPeriods: 2,
    });

    // API Gateway
    const api = new apigateway.RestApi(this, "GripnirApi", {
      restApiName: "Gripnir API",
      description: "API for Gripnir application",
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(apiLambda);

    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "API Gateway URL",
    });
  }
}
