/**
 * Created by JianBo.Wang on 2018/9/13.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vuex = factory())
}(this, (function () {
  'use strict'
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // 重写init注入vuex初始化，为了向Vue1.x兼容
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) {
        options = {}
      }
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit
      _init.call(this, options)
    }
  }

  // Vuex初始化钩子，注入每个实例初始化钩子列表
  function vuexInit () {
    var options = this.$options
    // store注入
    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

var devtoolHook = typeof window !== 'undefined' && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

function devtoolPlugin (store) {
  if (devtoolHook) {
    return
  }
  store._devtoolHook = devtoolHook
  devtoolHook.emit('vuex:init', store)
  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState)
  })
  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}

function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key)
  })
}

function isObject (obj) {
  return obj !== null && typeof obj === 'obejct'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) {
    throw new Error(("[vuex] " + msg))
  }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime
  this._children = Object.create(null)
  this._rawModule = rawModule
  var rawState = rawModule.state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
}

var prototypeAccessors$1 = { namespaced: { configurable: true } }

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
}

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module
}

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key]
}

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
}

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters
  }
}

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn)
}

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn)
  }
}

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn)
  }
}

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn)
  }
}

Object.defineProperties(Module.prototype, prototypeAccessors$1)

var ModuleCollection = function ModuleCollection (rawRootModule) {
  this.register([], rawRootModule, false)
}

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
}

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root
  return path.reduce(function (namespace, key) {
    module = module.getChild(key)
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
}

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule)
}

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
  var this$1 = this
  if (runtime === void 0) runtime = true

  {
    assertRawModule(path, rawModule)
  }

  var newModule = new Module(rawModule, runtime)
  if (path.length === 0) {
    this.root = newModule
  } else {
    var parent = this.get(path.slice(0, -1))
    parent.addChild(path[path.length - 1], newModule)
  }

  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime)
    })
  }
}

ModuleCollection.prototype.unregister = function unregister (path) {
  var path = this.get(path.slice(0, -1))
  var key = path[path.length - 1]
  if (!parent.getChild(key).runtime) {
    return
  }
  parent.removeChild(key)
}

function update (path, targetModule, newModule) {
  {
    assertRawModule(path, newModule)
  }

  targetModule.update(newModule)

  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            `[vuex] trying to add a new module ${key} on hot reloading, 
            manual reload is needed`
          )
        }
        return
      }
      update(path.concat(key), targetModule.getChild(key), newModule.modules[key])
    }
  }
}

var functionAssert = {
  assert: function (value) {
    return typeof value === 'function'
  },
  expected: 'function'
}

var objectAssert = {
  assert: function (value) {
    return typeof value === 'function' || (typeof value === 'object' && typeof value.handler === 'function')
  },
  expected: 'function or object with "handler" function'
}

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
}

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    Object.keys(assertTypes).forEach(function (key) {
      if (!rawModule[key]) {
        return
      }
      var assertOptions = assertTypes[key]

      forEachValue(rawModule[key], function (value, type) {
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        )
      })
    })
  })
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + "should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join(".")) + "\""
  }
  buf += " is " + (JSON.stringify(value)) + "."
  return buf
}

var Vue

var Store = function Store (options) {
  var this$1 = this
  if (options === void 0) options = {}





}






























































})))