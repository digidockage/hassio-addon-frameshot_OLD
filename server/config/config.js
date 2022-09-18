/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import node-core modules
const path = require('node:path');

// > > > > > > > > > > > > > > > > > > > > > > > Import third-party modules
const dotenv = require('dotenv');
const Joi = require('joi');

// > > > > > > > > > > > > > > > > > > > > > > > The code
dotenv.config({
  path: path.join(__dirname, '../../data/.env'),
  override: true
});

const envVarsSchema = Joi
  .object()
  .keys({
    NODE_ENV: Joi
      .string()
      .valid('production', 'development', 'test')
      .default('production'),
    SERVER_ADDRESS: Joi
      .string()
      .ip({
        version: [
          'ipv4',
          'ipv6'
        ]
      })
      .default('0.0.0.0'),
    SERVER_PORT: Joi
      .number()
      .integer()
      .min(1)
      .max(65535)
      .default(3000),
    HASSIO_TOKEN: Joi
      .string()
      .required(),
    HASSIO_URL: Joi
      .string()
      .default('http://supervisor/core')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key'
    }
  })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error}`);
}

const config = {
  env: envVars.NODE_ENV,
  server: {
    address: envVars.SERVER_ADDRESS,
    port: envVars.SERVER_PORT
  },
  hassio: {
    token: envVars.HASSIO_TOKEN,
    url: envVars.HASSIO_URL
  }
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = config;
