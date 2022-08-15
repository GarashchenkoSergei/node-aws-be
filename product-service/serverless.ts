import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, createProduct } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'node-aws-be-product',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin', 'serverless-postgres'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_USERNAME: '${env:DB_USERNAME}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
      DB_DATABASE: '${env:DB_DATABASE}',
    },
  },
  functions: { getProductsList, getProductById, createProduct },
  package: { individually: true },
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
  },
};

module.exports = serverlessConfiguration;
