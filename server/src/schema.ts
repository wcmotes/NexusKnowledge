import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum NodeType {
    NOTE
    TASK
    DAILY_NOTE
    COLLECTION
    REFERENCE
    MEDIA
    CUSTOM
  }

  type Field {
    id: ID!
    name: String!
    type: String!
    options: [String]
    required: Boolean!
    value: String
  }

  type SuperTag {
    id: ID!
    name: String!
    icon: String
    fields: [Field!]!
  }

  type Node {
    id: ID!
    type: NodeType!
    title: String!
    content: String!
    tags: [String!]!
    supertags: [SuperTag!]!
    createdAt: String!
    updatedAt: String!
    parent: ID
    children: [ID!]!
    references: [ID!]!
    referencedBy: [ID!]!
    properties: String # JSON stringified object
  }

  type DailyNote {
    id: ID!
    date: String!
    content: String!
    tasks: [Task!]!
  }

  type Task {
    id: ID!
    content: String!
    completed: Boolean!
    dueDate: String
    priority: String
  }

  type User {
    id: ID!
    email: String!
    name: String!
    avatar: String
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Query {
    getNode(id: ID!): Node
    getNodes: [Node!]!
    getNodesByType(type: NodeType!): [Node!]!
    getDailyNote(date: String!): DailyNote
    getDailyNotes: [DailyNote!]!
    searchNodes(query: String!): [Node!]!
    getCurrentUser: User
  }

  type Mutation {
    createNode(
      type: NodeType!
      title: String!
      content: String!
      tags: [String!]
      supertags: [ID!]
      parent: ID
    ): Node!
    
    updateNode(
      id: ID!
      title: String
      content: String
      tags: [String!]
      supertags: [ID!]
      parent: ID
    ): Node!
    
    deleteNode(id: ID!): Boolean!
    
    addReference(sourceId: ID!, targetId: ID!): Boolean!
    removeReference(sourceId: ID!, targetId: ID!): Boolean!
    
    createDailyNote(date: String!, content: String!): DailyNote!
    updateDailyNote(id: ID!, content: String!): DailyNote!
    
    createTask(
      content: String!
      dueDate: String
      priority: String
      dailyNoteId: ID
    ): Task!
    
    updateTask(
      id: ID!
      content: String
      completed: Boolean
      dueDate: String
      priority: String
    ): Task!
    
    deleteTask(id: ID!): Boolean!
    
    login(email: String!, password: String!): AuthResponse!
    register(email: String!, password: String!, name: String!): AuthResponse!
    updateUser(name: String, avatar: String): User!
  }
`;
