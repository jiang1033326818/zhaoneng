// 用于修改默认配置
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const { DefinePlugin }  = require('webpack')
module.exports = function override(config, env) {

  // do stuff with the webpack config...
  // config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#40A9FF" },
    javascriptEnabled: true
  })(config, env);
  config.plugins.push(new DefinePlugin({
    'process.env.APP_TYPE': JSON.stringify(process.env.APP_TYPE),
  }));
  return config;
};