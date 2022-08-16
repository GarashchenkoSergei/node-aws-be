import type { AWS } from '@serverless/typescript'
import { importProductsFile, importFileParser } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'node-aws-import-service',
  frameworkVersion: '3',
  configValidationMode: 'error',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: '${opt:stage, "dev"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET_NAME: '${env:BUCKET_NAME}',
      UPLOADED_FOLDER: '${env:UPLOADED_FOLDER}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: "s3:ListBucket",
        Resource: ['arn:aws:s3:::${self:custom.BucketName}']
      },
      {
        Effect: 'Allow',
        Action: "s3:*",
        Resource: ['arn:aws:s3:::${self:custom.BucketName}/*']
      }
    ]
  },
  functions: { importProductsFile, importFileParser },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    BucketName: '${env:BUCKET_NAME}',
  },
}

module.exports = serverlessConfiguration