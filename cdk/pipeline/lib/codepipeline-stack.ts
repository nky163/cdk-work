import * as cdk from 'aws-cdk-lib';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CodePipelineStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // GitHubトークンのSecretを取得（AWS Secrets Managerに保存済みのトークンを使用）
    const githubToken = cdk.SecretValue.secretsManager('GITHUB_TOKEN');

    // ソースステージを作成
    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner: 'your-github-username',  // GitHubユーザー名
      repo: 'your-repo-name',         // リポジトリ名
      branch: 'main',                 // ブランチ名
      oauthToken: githubToken,
      output: sourceOutput,
    });

    // ビルドプロジェクトの作成
    const project = new codebuild.PipelineProject(this, 'MyBuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
    });

    // ビルドステージを作成
    const buildOutput = new codepipeline.Artifact();
    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project: project,
      input: sourceOutput,
      outputs: [buildOutput],
    });

    // CodePipelineの定義
    new codepipeline.Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Build',
          actions: [buildAction],
        },
      ],
    });

    // 必要なIAMポリシーを追加
    project.addToRolePolicy(new iam.PolicyStatement({
      actions: ['*'],
      resources: ['*'],
    }));
  }
}
