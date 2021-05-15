const path = require('path');

// 给 react 默认配置添加 @ alias
module.exports = (config, env) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };
  return config;
}