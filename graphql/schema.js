const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: Int!
    task: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: Int!): Todo
  }

  type Mutation {
    addTodo(task: String!): Todo
  }
`;

module.exports = typeDefs;
