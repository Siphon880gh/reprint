const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type UserSchema {
    _id: ID
  }

  type Reprint {
    _id: ID
    asset: String
  }

  type ReprintSchema {
    _id: ID
    asset: String
  }

  type users {
    _id: ID
    username: String
    email: String
    reprints: [ReprintSchema]
    favorites: [ReprintSchema]
    followers: [UserSchema]
    followed: [UserSchema]
  }

  type Query {
    trending: [Reprint]
    me: User
    users: [User]
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