// import 'zone.js/node';

// import { APP_BASE_HREF } from '@angular/common';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import * as express from 'express';
// import { existsSync } from 'fs';
// import { join } from 'path';

// import { AppServerModule } from './src/main.server';

// // The Express app is exported so that it can be used by serverless Functions.
// function register(): express.Express {
//   const server = express();
//   const distFolder = join(process.cwd(), 'dist/angular-ssr-serverless/browser');
//   const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

//   // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
//   server.engine('html', ngExpressEngine({
//     bootstrap: AppServerModule,
//   }));

//   server.set('view engine', 'html');
//   server.set('views', distFolder);

//   // Example Express Rest API endpoints
//   // server.get('/api/**', (req, res) => { });
//   // Serve static files from /browser
//   server.get('*.*', express.static(distFolder, {
//     maxAge: '1y'
//   }));

//   // All regular routes use the Universal engine
//   server.get('*', (req, res) => {
//     res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
//   });

//   return server;
// }

// export const app = register();

// function run(): void {
//   const port = process.env['PORT'] || 4000;

//   // Start up the Node server
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// // Webpack will replace 'require' with '__webpack_require__'
// // '__non_webpack_require__' is a proxy to Node 'require'
// // The below code is to ensure that the server is run only when not requiring the bundle.
// declare const __non_webpack_require__: NodeRequire;
// const mainModule = __non_webpack_require__.main;
// const moduleFilename = mainModule && mainModule.filename || '';
// if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
//   run();
// }

//export * from './src/main.server';



import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
//import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import { AppServerModule } from './src/app/app.server.module';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();

const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
//const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
  // providers: [
  //   provideModuleMap(LAZY_MODULE_MAP)
  // ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});