/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('./config/config');
const logger = require('./config/logger');
const { name: appName, version: appVersion } = require('../package.json');
const app = require('./app');

// > > > > > > > > > > > > > > > > > > > > > > > The code
logger.info(`${appName} is starting...`);

// Print config
logger.debug(`Environment config: \n${JSON.stringify(config, null, 2)}`);

const server = app.listen(config.server.port, () => {
  logger.info(`Server ${appName}:${appVersion} in ${config.env} mode, listening to ${config.server.address}:${config.server.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
