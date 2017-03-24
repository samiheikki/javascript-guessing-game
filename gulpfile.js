'use strict';
var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'dist';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    'staticFileGlobs': [rootDir + '/**/*.{html,css,png,ico,js,map,ogg,mp3}'],
    'stripPrefix': rootDir
  }, callback);
});

gulp.task('rename-images', function(callback) {
  var fs = require('fs');
  var logos = JSON.parse(fs.readFileSync('./static/logos.json'));
  logos.forEach((logo) => {
    const base64 = new Buffer(logo.name).toString('base64');
    fs.rename('./dist/static/logos/' + logo.name + '.png', './dist/static/logos/' + base64 + '.png', err => {
      if (err) {
        console.log(err);
      }
    });
  });
  callback();
});
