import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkWork from '../lib/cdk-work-stack';

import { LambdaApiNestedStack } from "../lib/lambda-api-nested-stack";
import { ApiStack } from '../lib/api-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-work-stack.ts
test('lambda-api-nested-stackテスト', () => {
  const app = new cdk.App();
  const stack = new ApiStack(app, 'AppTest');
  new LambdaApiNestedStack(stack, 'StackTest');
//   const app = new cdk.App();
//     // WHEN
//   const stack = new CdkWork.CdkWorkStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
