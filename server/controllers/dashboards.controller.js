/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > Import node-core modules
const fs = require('node:fs');
const path = require('node:path');

// > > > > > > > > > > > > > > > > > > > > > > > Import third-party modules
const puppeteer = require('puppeteer');

// > > > > > > > > > > > > > > > > > > > > > > > Import digidockage's modules
const catchAsync = require('@digidockage/node-server-util-catchasync');

// > > > > > > > > > > > > > > > > > > > > > > > Import internals
const config = require('../config/config');

// > > > > > > > > > > > > > > > > > > > > > > > The code
const getOne = catchAsync(async (req, res) => {
  const { dashboard } = req.params;
  const { height, width } = req.query;
  let screenshotPath = path.join(__dirname, '..', '..', 'data', 'screenshots');
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
  screenshotPath = path.join(screenshotPath, `${dashboard}.png`);

  // Initialize browser istance
  const browser = await puppeteer
    .launch(
      {
        defaultViewport: {
          height,
          width
        }
      }
    );

  // Navigate home assistant dashboard
  const page = await browser.newPage();
  await page.goto(
    config.hassio.url,
    {
      waitUntil: 'networkidle2'
    }
  );

  // Take screenshot of dashboard
  await page.screenshot(
    {
      path: screenshotPath
    }
  );

  // Close browser istance
  await browser.close();

  // Send screenshot as response
  res.sendFile(screenshotPath);
});

// > > > > > > > > > > > > > > > > > > > > > > > Module exports
module.exports = {
  getOne
};
