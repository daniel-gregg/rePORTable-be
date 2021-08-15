const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    designation: String
    bio: String
    lastName: String
    email: String
    team: [User]
  }
  
  type Report {
    _id: ID
    title: String
    owner: User
    synopsis: String
    contributors: [User]
    content: String
    state: String
  }

  type Auth {
    token: ID
    user: User
  }

  type PartialReport {
    _id: ID
    title: String
    owner: User
    synopsis: String
    contributors: [User]
    state: String
  }

  type Query {
    user: User
    allUsers: [User]
    singleReport(id: ID!): Report
    userReports: [PartialReport]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!,designation: String!, bio: String,team: [String], email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String,designation: String, bio: String,team: [String], email: String, password: String): User
    updateBio(_id: ID!, bio: String): User
    updateTeam(member: String): User
    login(email: String!, password: String!): Auth
    addReport(title: String!, owner: String, synopsis: String!, contributors: [String], content: String!, state: String!): Report
    updateReport(id: ID!, title: String, owner: String, synopsis: String, contributors: [String], content: String, state: String): Report
    updateTitle(id: ID!, title: String): Report
    updateSynopsis(id: ID!, synopsis: String): Report
    updateContent(id: ID!, content: String): Report
  }
`;

module.exports = typeDefs;
