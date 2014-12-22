'use strict';

module.exports = function(app) {

  app.use('/', require('./api/stat'));
  app.use('/api/stats/', require('./api/stat'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function(req, res) {
      res.status(404).end();
    });
};
