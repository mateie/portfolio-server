require('dotenv').config();
require('./models');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { DATABASE, PORT } = process.env;

const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    subscriptions: {
        path: '/subscriptions',
    },
});

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        return server.listen({ port: PORT });
    })
    .then(({ url, subscriptionsUrl }) => {
        console.log(`Server running at ${url}`);
        console.log(`Subscriptions running at ${subscriptionsUrl}`);
    })
    .catch(console.error);