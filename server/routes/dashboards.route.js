/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import third-party modules
const express = require('express');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const validate = require('../middlewares/validate.middleware');
const dashboardsController = require('../controllers/dashboards.controller');
const dashboardsValidation = require('../validations/dashboards.validation');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const router = express.Router();

router.use(
  '/:dashboard',
  validate(dashboardsValidation.getOne),
  dashboardsController.getOne
);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
