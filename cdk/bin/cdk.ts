#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { ApiStack } from "../lib/stacks/api-stack";

const app = new cdk.App();

new FrontendStack(app, "SimplyClimbingFrontend", {});
new ApiStack(app, "SimplyClimbingApi", {});
