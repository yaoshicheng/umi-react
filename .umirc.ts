import { defineConfig } from 'umi';
import path from 'path';

let TimeStamp = new Date().getTime();

export default defineConfig({
  base: '/bill/',
  publicPath: '/bill/',
  chainWebpack: (config, { webpack }) => {
    config.merge({
      output: {
        // 输出重构  打包编译后的 文件名称
        filename: `[name].${TimeStamp}.js`,
        chunkFilename: `[name].${TimeStamp}.js`,
      },
    });
    config.plugin('extract-css').tap(() => [
      {
        filename: `[name].${TimeStamp}.css`,
        chunkFilename: `[name].${TimeStamp}.css`,
        ignoreOrder: true,
      },
    ]);
  },

  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  // mfsu: {},
  extraPostCSSPlugins: [require('tailwindcss')()],
  routes: [
    { exact: true, path: '/', redirect: '/demo' },
    { path: '/demo', component: '@/pages/demo' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://xxxxxxxxxx.com',
      changeOrigin: true,
    },
  },
});
