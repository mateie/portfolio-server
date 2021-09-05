const { gql } = require('apollo-server');

module.exports = gql`
    type Post {
        id: String!
        title: String!
        description: String!
        createdAt: String!
    }

    type Repo {
        id: String!
        name: String!
        description: String
        url: String
        lang: String
        createdAt: String!
        updatedAt: String!
        pushedAt: String!
        archived: Boolean!
        private: Boolean!
        fork: Boolean!
    }

    type Query {
        getPosts: [Post]!
        getRepos: [Repo]!
    }
`;