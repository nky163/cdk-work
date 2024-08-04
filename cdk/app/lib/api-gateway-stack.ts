// lib/api-gateway-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import {load as loadSwagger} from '../swagger-loader';

export class ApiGatewayStack extends cdk.Stack {
  public readonly api: apigateway.SpecRestApi;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new apigateway.SpecRestApi(this, 'SpecRestApi', {
      apiDefinition: apigateway.ApiDefinition.fromInline(loadSwagger()),
    });
  }
}
