import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { load as loadSwagger } from '../swagger-loader';


export class LambdaApiNestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);
    
    const api = new apigateway.SpecRestApi(this, 'MyApp', {
      apiDefinition: apigateway.ApiDefinition.fromInline(loadSwagger()),  // OpenAPI定義ファイルを指定
    });
    
    const swagger = loadSwagger();
    const resourceMap: { [path: string]: apigateway.IResource } = {};
    
    for (const path in swagger.paths) {
      for (const method in swagger.paths[path]) {
        const resourcePath = path.startsWith('/') ? path.slice(1) : path;
        const index = `${resourcePath}-${method}`
        
        console.log(`create api path: ${resourcePath}    method: ${method}`);
        console.log(index);
        
        const fn = new lambda.Function(this, index, {
          runtime: lambda.Runtime.PYTHON_3_12,
          handler: `${method}.handler`,
          code: lambda.Code.fromAsset(`app/${resourcePath}`),
          functionName: `${index}-function`
        });
        
        // API Gatewayの統合設定
        if (!resourceMap[resourcePath]) {
          resourceMap[resourcePath] = api.root.addResource(resourcePath)
        }
        const integration = new apigateway.LambdaIntegration(fn);
        resourceMap[resourcePath].addMethod(method, integration);
      }
    }
  }
}
