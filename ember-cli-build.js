'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sass = require('sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      implementation: sass
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    autoImport: {
      alias: {
        'webstomp-obs': 'webstomp-obs/dist/webstompobs.web'
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  app.import('node_modules/sockjs-client/dist/sockjs.min.js');
  app.import('node_modules/materialize-css/dist/js/materialize.min.js');
  return app.toTree();
};
