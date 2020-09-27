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
  },
  plugins: [
    'serverless-plugin-typescript'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    hello: {
      handler: 'handler.hello'
    }
  }
}

module.exports = serverlessConfiguration;
