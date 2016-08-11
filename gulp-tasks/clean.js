/**
 * @license
 * Copyright (c) 2016 The GDG Spain Authors. All rights reserved.
 * This code may only be used under the MIT style license found at http://gdg.es/LICENSE.txt
 */

'use strict';

const del = require('del');

// Returns a Promise to delete the build directory
function clean() {
  return del(global.config.build.rootDirectory);
}

module.exports = {
  build: clean
};
