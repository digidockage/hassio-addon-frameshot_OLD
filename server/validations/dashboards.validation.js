/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import third-party modules
const Joi = require('joi');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const getOne = {
  params: Joi.object().keys({
    dashboard: Joi.string()
  }),
  query: Joi.object().keys({
    height: Joi.number().integer().min(480).max(1920).default(800),
    width: Joi.number().integer().min(480).max(1920).default(600)
  })
};

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  getOne
};
