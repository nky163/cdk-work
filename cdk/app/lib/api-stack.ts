import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaApiNestedStack } from './lambda-api-nested-stack';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaApiNestedStack(this, 'LambdaApiNestedStack');
  }
}
