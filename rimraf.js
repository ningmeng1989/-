/**
 * Created by JianBo.Wang on 2018/9/13.
 */
module.exports = rimraf
rimraf.sync = rimrafSync

var assert = require('assert')
var path = require('path')
var fs = require('fs')
var glob = require('glob')
var _0666 = parseInt('666', 8)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

var timeout = 0

var isWindows = (process.platform === 'win32')

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function (m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p)) {
    return afterGlob(null, [p])
  }

  options.lstat(p, function (er, stat) {
    if (!er) {
      return afterGlob(null, [p])
    }
    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0) {
      cb(errState)
    }
  }

  function afterGlob (er, results) {
    if (er) {
      return cb(er)
    }
    n = results.length
    if (n === 0) {
      return cb()
    }
    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {

        timeout = 0
        next(er)
      })


    })
  }
}































