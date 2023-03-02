const awsServerlessExpress = require('aws-serverless-express');
const server = require('./dist/angular-ssr-serverless/server/main');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

server.app.use(awsServerlessExpressMiddleware.eventContext());

const serverProxy = awsServerlessExpress.createServer(server.app);
module.exports.universal = (event, context) => awsServerlessExpress.proxy(serverProxy, event, context);