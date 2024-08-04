#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CodeCommitStack } from '../lib/codecommit-stack';

const app = new cdk.App();
new CodeCommitStack(app, 'CodeCommitStack');