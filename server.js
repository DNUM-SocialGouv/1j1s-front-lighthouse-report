/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const {createServer} = require('@lhci/server');

console.log('Starting server...');
createServer({
  port: process.env.PORT,
  storage: {
    storageMethod: 'sql',
    sqlDialect: 'postgres',
    sqlConnectionSsl: true,
    sqlConnectionUrl: process.env.DATABASE_URL,
    sqlDialectOptions: {
      ssl: true
    },
  },
  deleteOldBuildsCron: {
    schedule: '0 0 * * *', // Daily at midnight
    maxAgeInDays: 60,
  }
}).then(({port}) => console.log('Listening on port', port));
