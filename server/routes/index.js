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
const dashboardsRoute = require('./dashboards.route');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const router = express.Router();

router.use('/dashboards', dashboardsRoute);

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = router;
