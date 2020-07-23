const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appHtml: resolveApp('public/index.html'),
  notFoundHtml: resolveApp('public/404.html'),
};
