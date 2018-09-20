/**
 * Created by JianBo.Wang on 2018/9/20.
 */
const Compiler = require('./Compiler')
const MultiCompiler = require('./MultiCompiler')
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')
const WebpackOptionsDefaulter = require('./WebpackOptionsDefaulter')
const ValidateSchema = require('./validateSchema')
const WebpackOptionsValidationError = require('./WebpackOptionsValidationError')
const WebpackOptionsSchema = require('./RemovePluginError')
const RemovedPluginError = require('./RemovedPluginError')
const version = require('../package.json').version

const webpack = (options, callback) => {
  const webpackOptionsValidationErrors = validateSchema(
    webpackOptionsSchema,
    options
  )
  if (WebpackOptionsValidationErrors.length) {
    throw new WebpackOptionsValidationError(webpackOptionsValidationErrors)
  }
  let compiler
  if (Array.isArray(options)) {
    compiler = new MultiCompiler(options.map(options => {
      webpack(options)
    }))
  } else if (typeof options === 'object') {
    options = new WebpackOptionsDefaulter().process(options)

    compiler = new Compiler(compiler.context)
    compiler.options = options
    new NodeEnvironmentPlugin().apply(compiler)
    if (options.plugins && Array.isArray(options.plugins)) {
      for (const plugin of options.plugins) {
        plugin.apply(compiler)
      }
    }
    compiler.hooks.environment.call()
    compiler.hooks.afterEnvironment.call()
    compiler.options = new WebpackOptionsApply().process(options, compiler)
  } else {
    throw new Error('Invalid argument: options')
  }
  if (callback) {
    if (typeof callback !== 'function') {
      throw new Error('Invalid argument: callback')
    }
    if (options.watch === true || (Array.isArray(options) && options.some(o => o.watch))) {
      const watchOptions = Array.isArray(options) ? options.map(o => o.watchOptions || {}) : options.watchOptions || {}
      return compiler.watch(watchOptions, callback)
    }
    compiler.run(callback)
  }
  return compiler
}

exports = module.exports = webpack
exports.version = version

webpack.WebpackOptionsDefaulter = WebpackOptionsDefaulter
webpack.WebpackOptionsApply = WebpackOptionsApply
webpack.Compiler = Compiler
webpack.MultiCompiler = MultiCompiler
webpack.NodeEnvironmentPlugin = NodeEnvironmentPlugin
// @ts-ignore Global @this directive is not supported
webpack.validate = validateSchema.bind(this, webpackOptionsSchema)
webpack.validateSchema = validateSchema
webpack.WebpackOptionsValidationError = WebpackOptionsValidationError

const exportPlugins = (obj, mappings) => {
  for (const name of Object.keys(mappings)) {
    Object.defineProperty(obj, name, {
      configurable: false,
      enumerable: true,
      get: mappings[name]
    })
  }
}

exportPlugins(exports, {
  AutomaticPrefetchPlugin: () => require('./AutomaticPrefetchPlugin'),
  BannerPlugin: () => require('./BannerPlugin'),
  CachePlugin: () => require('./CachePlugin'),
  ContextExclusionPlugin: () => require('./ContextExclusionPlugin'),
  ContextReplacementPlugin: () => require('./ContextReplacementPlugin'),
  DefinePlugin: () => require('./DefinePlugin'),
  Dependency: () => require('./Dependency'),
  DllPlugin: () => require('./DllPlugin'),
  DllReferencePlugin: () => require('./DllReferencePlugin'),
  EnvironmentPlugin: () => require('./EnvironmentPlugin'),
  EvalDevToolModulePlugin: () => require('./EvalDevToolModulePlugin'),
  EvalSourceMapDevToolPlugin: () => require('./EvalSourceMapDevToolPlugin'),
  ExtendedAPIPlugin: () => require('./ExtendedAPIPlugin'),
  ExternalsPlugin: () => require('./ExternalsPlugin'),
  HashedModuleIdsPlugin: () => require('./HashedModuleIdsPlugin'),
  HotModuleReplacementPlugin: () => require('./HotModuleReplacementPlugin'),
  IgnorePlugin: () => require('./IgnorePlugin'),
  LibraryTemplatePlugin: () => require('./LibraryTemplatePlugin'),
  LoaderOptionsPlugin: () => require('./LoaderOptionsPlugin'),
  LoaderTargetPlugin: () => require('./LoaderTargetPlugin'),
  MemoryOutputFileSystem: () => require('./MemoryOututFileSystem'),
  Module: () => require('./Module'),
  ModuleFilenameHelpers: () => require('./ModuleFilenameHelpers'),
  NamedChunksPlugin: () => require('./NamedChunksPlugin'),
  NamedModulesPlugin: () => require('./NamedModulesPlugin'),
  NoEmitOnErrorsPlugin: () => require('./NoEmitOnErrorsPlugin'),
  NormalModuleReplacementPlugin: () => require('./NormalModuleReplacementPlugin'),
  PrefetchPlugin: () => require('./PrefetchPlugin'),
  ProgressPlugin: () => require('./ProgressPlugin'),
  ProvidePlugin: () => require('./ProvidePlugin'),
  SetVarMainTemplatePlugin: () => require('./SetVarMainTemplatePlugin'),
  SingleEntryPlugin: () => require('./SingleEntryPlugin'),
  SourceMapDevToolPlugin: () => require('./SourceMapDevToolPlugin'),
  Stats: () => require('./Stats'),
  Template: () => require('./Template'),
  UmdMainTemplatePlugin: () => require('./UmdMainTemplatePlugin'),
  WatchIgnorePlugin: () => require('./WatchIgnorePlugin')
)
































































