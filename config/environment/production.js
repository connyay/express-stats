'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEDIY_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEDIY_PORT ||
    process.env.PORT ||
    8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      'mongodb://localhost/stats-development'
  }
};
