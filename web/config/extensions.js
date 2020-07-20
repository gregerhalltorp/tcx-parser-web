/* eslint-disable import/prefer-default-export */

const FILE_EXTENSIONS = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const useTypeScript = process.env.USE_TYPE_SCRIPT === 'true';

const getExtensions = () =>
  FILE_EXTENSIONS.map((ext) => `.${ext}`).filter(
    (ext) => useTypeScript || !ext.includes('ts')
  );

module.exports = { FILE_EXTENSIONS, getExtensions };
