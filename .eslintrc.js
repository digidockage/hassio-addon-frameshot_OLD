/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    hassio-addon-frameshot                                                                       *
 *    Copyright (c) 2022 Sgobbi Federico                                                           *
 *    All rights reserved                                                                          *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// > > > > > > > > > > > > > > > > > > > > > > > The code
const eslintConfig = {
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
    es2021: true
  },
  plugins: [
    'jest'
  ],
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: [
      2,
      'always'
    ]
  }
};

// > > > > > > > > > > > > > > > > > > > > > > > Module export
module.exports = eslintConfig;
