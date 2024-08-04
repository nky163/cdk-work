// lib/main-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';
import { ApiGatewayStack } from './api-gateway-stack';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaStack = new LambdaStack(this, 'LambdaStack');
    const apiGatewayStack = new ApiGatewayStack(this, 'ApiGatewayStack');

    // APIGatewayとLambdaの統合 (x-amazon-apigateway-integrationを使用)
    const api = apiGatewayStack.api;

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaStack.handler);
    api.root.addResource('example').addMethod('GET', lambdaIntegration);
  }
}
