const { gql } = require('apollo-server-express');

const typeDefs = gql `
  type User {
    _id: ID
    username: String
    email: String
    reprints: [Reprint]
    favorites: [Reprint]
  }

  type Reprint {
    _id: ID
    asset: String
  }

  type Query {
    trending: [Reprint]
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;