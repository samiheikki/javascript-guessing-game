'use strict';
var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    "staticFileGlobs": [rootDir + '/**/*.{html,css,png,ico,js,map}'],
    "stripPrefix": rootDir
  }, callback);
});
