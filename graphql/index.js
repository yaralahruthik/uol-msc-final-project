const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

(async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4000;

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
