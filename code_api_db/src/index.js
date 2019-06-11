const hapi = require('hapi');

import Db from './models/model';

const server = hapi.server({
  port: 8080,
  host: 'localhost'
});

const init = async () => {
  try {
    server.route({
      method: 'GET',
      path: '/api/v1/gettest',
      handler: function(request, reply){
        return Db.models.user.findAll();
      }
    })
    await server.start();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
