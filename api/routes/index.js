const fs = require('fs');
/**
 * @description This module is automatically add all the routes
 * @param {Object} app
 */
module.exports = function (app) {
  const routes = fs.readdirSync(__dirname);
  routes.forEach((file) => {
    const moduleArr = file.split('.');
    if (moduleArr[1] === 'js' && moduleArr[0] != 'index') {
      app.use('/api/v1/', require(`./${moduleArr[0]}`));
    }
  });
};