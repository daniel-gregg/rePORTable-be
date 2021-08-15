require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ 
  app,
  bodyParserConfig: {
    limit:"10mb"
  }
 });

app.use(express.urlencoded({ extended: false, limit: '16mb', parameterLimit: 1000000 }));
app.use(express.json({ limit: '16mb', parameterLimit: 1000000 }));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
