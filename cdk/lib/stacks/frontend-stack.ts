import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticWebsiteHosting } from "../constructs/static-website-hosting";

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new StaticWebsiteHosting(this, "StaticWebsiteHosting");
  }
}
