import hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import schema from './graphql/schema';

const init = async () => {
  const server = hapi.server({
    port: 8080,
    host: '0.0.0.0'
  });


  try {

    await server.register({
      plugin: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        },
        route: { cors: true }
      }
    });

    await server.register({
      plugin: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: { schema },
        route: { cors: true }
      }
    });

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
