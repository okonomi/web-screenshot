import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'web-screenshot-serverless',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  configValidationMode: 'warn',
  custom: {
    'serverless-layers': {
      layersDeploymentBucket: 'web-screenshot-serverless-layers-deployment'
    }
  },
  plugins: [
    'serverless-plugin-typescript',
    'serverless-layers'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:PutObject',
        Resource: 'arn:aws:s3:::web-screenshot-images-okonomi/*'
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello'
    },
    screenshot: {
      handler: 'src/handlers/screenshot.handler'
    }
  }
}

module.exports = serverlessConfiguration;
