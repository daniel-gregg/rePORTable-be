const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    designation: String
    bio: String
    lastName: String
    email: String
  }
  
  type Report {
    title: String
    owner: User
    synopsis: String
    contributors: [User]
    headings: String
    content: String
    state: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    report: Report
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!,designation: String!, bio: String, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String,designation: String!, bio: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addReport(title: String!, owner: String, synopsis: String!, contributors: [String], headings: String!, content: String!, state: String!): Report
  }
`;

module.exports = typeDefs;
