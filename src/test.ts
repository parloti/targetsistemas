// This file is required by karma.conf.js and loads recursively all the .spec and framework files

/**
 * *************** IMPORTANT ***************
 *
 * A lot of things here have to be done in a
 * strict order.
 *
 * To prevent the loading order from being
 * changed by automatic formatters, * the
 * sources were saved in 'import-X' files,
 * where X is the loading order.
 */

import './test/fix-webpack-source-paths';
import './test/import-1';
import {
  BrowserDynamicTestingModule,
  getTestBed,
  platformBrowserDynamicTesting
} from './test/import-2';

(Error as any).stackTraceLimit = 50;


declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
debugger;
// Then we find all the tests.
const context = require.context('./app/', true, /\.spec\.ts$/);
// And load the modules.
debugger;
context.keys().map(context);

