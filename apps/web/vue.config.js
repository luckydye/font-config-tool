// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

module.exports = process.env.NODE_ENV === 'production' ? {
  outputDir: '../../dist',
  publicPath: '../../',
} : {};
