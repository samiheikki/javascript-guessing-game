'use strict'
var gulp = require('gulp')
const uuidv4 = require('uuid/v4')

gulp.task('generate-service-worker', callback => {
  var path = require('path')
  var swPrecache = require('sw-precache')
  var rootDir = 'dist'

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    'staticFileGlobs': [rootDir + '/**/*.{html,css,png,ico,js,map,ogg,mp3}'],
    'stripPrefix': rootDir
  }, callback)
})

gulp.task('rename-images', callback => {
  var fs = require('fs')
  var logos = JSON.parse(fs.readFileSync('./static/logos.json'))
  logos.forEach((logo) => {
    const uuid = uuidv4()
    fs.renameSync('./dist/static/logos/' + logo.name.toLowerCase() + '.png', './dist/static/logos/' + uuid + '.png')
    logo.uuid = uuid
  })
  fs.writeFileSync('./dist/static/logos.json', JSON.stringify(logos, null, 2))
  callback()
})
