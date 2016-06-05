'use strict'

const gulp = require('gulp')
const fs = require('fs')
const path = require('path')
const del = require('del')
const packager = require('electron-packager')

gulp.task('clean', function () {
  return del('output/**/*')
})

gulp.task('package-electron', ['clean'], function (done) {
  var options = {
    dir: './electron-app/',
    arch: 'x64',
    platform: 'win32',
    name: 'ElectronBackground',
    out: './output/',
    overwrite: true
  }

  packager(options, (err, appPaths) => {
    if (err) {
      console.log(err)
    }

    if (appPaths && appPaths[0]) {
      let appPath = path.normalize('./output/app')

      fs.rename(appPaths[0], appPath, (err) => {
        if (err) {
          console.log('Renaming built Electron app failed. Did you run "gulp clean"?')
        } else {
          done()
        }
      })
    }
  })
})

gulp.task('copy-assets', function (done) {
  return gulp
    .src('appx-assets/**/*')
    .pipe(gulp.dest('output'))
})

gulp.task('build-electron', ['clean', 'package-electron', 'copy-assets'])
gulp.task('default', ['build-electron'])
