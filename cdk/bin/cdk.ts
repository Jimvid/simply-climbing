#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { ApiStack } from "../lib/stacks/api-stack";

const app = new cdk.App();

new FrontendStack(app, "SimplyClimbingFrontend", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new ApiStack(app, "SimplyClimbingApi", {});
