import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { getMfeBaseUrl } from './scripts/utils/getMfeBaseUrl.js';
import { createPromiseRemote } from './scripts/utils/createPromiseRemote.js';

import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ENV = process.env.NODE_ENV ?? 'local';
const isDev = APP_ENV === 'development';

export default {
  entry: {
    remoteAuthApp: './src/index.tsx',
  },
  mode: APP_ENV === 'development' ? 'development' : 'production',
  devServer: {
    port: 9001,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    open: false,
  },
  output: {
    publicPath: 'auto',
    library: { type: 'window', name: 'enterprise_auth' },
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    isDev && new ReactRefreshWebpackPlugin(),
    new webpack.container.ModuleFederationPlugin({
      name: 'enterprise_auth',
      filename: 'remoteEntry.js',
      remotes: {
        enterprise_ui: createPromiseRemote(
          'enterprise_ui',
          getMfeBaseUrl('enterprise-scalable-practice-design-mfe'),
        ),
        enterprise_data: createPromiseRemote(
          'enterprise_data',
          getMfeBaseUrl('enterprise-scalable-practice-data-mfe'),
        ),
      },
      exposes: {
        './AuthApp': './src/routes/AuthRoutes.tsx',
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-router-dom': { singleton: true, requiredVersion: '7.x.x' },
        'react-redux': { singleton: true, requiredVersion: '9.x.x' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '2.x.x' },
        '@mui/material': { singleton: true, requiredVersion: '7.x.x' },
        '@mui/system': { singleton: true, requiredVersion: '7.x.x' },
        '@emotion/react': { singleton: true, requiredVersion: '11.x.x' },
        '@emotion/styled': { singleton: true, requiredVersion: '11.x.x' },
        rxjs: { singleton: true, requiredVersion: '7.x.x' },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.ENTERPRISE_ASSET_URL': JSON.stringify(
        process.env.ENTERPRISE_ASSET_URL ?? '',
      ),
    }),
  ].filter(Boolean),
};
