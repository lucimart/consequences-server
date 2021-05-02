import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    info: String!
    feed(groupId: ID, parentId: Int, take: Int): [Post!]!
    text(id: ID!): Text
  }

  type Mutation {
    createText(body: String!, groupId: ID, parentId: ID): Text!
    deleteText(id: ID!): Text
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createGroup(name: String!): Group!
    createVote(postId: ID, replyId: ID): Vote!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    posts: [Post!]!
    profile: Profile!
    role: Role!
    ownerOf: [Group!]!
    memberOf: [Member!]!
    votes: [Vote!]!
    replies: [Reply!]!
  }

  type Profile {
    bio: String
    instagram: String
    twitter: String
    user: User!
  }

  type Vote {
    id: ID!
    post: Post
    reply: Reply
    user: User!
  }

  type Group {
    id: ID!
    name: String!
    private: Boolean!
    members: [Member!]!
    posts: [Post!]!
    owner: User!
  }

  input GroupInput {
    id: ID!
    name: String
    private: Boolean
  }

  type Member {
    user: User!
    group: Group!
    write: Boolean!
    isModerator: Boolean!
  }

  scalar DateTime

  enum Role {
    USER
    ADMIN
  }

  type Post {
    id: ID!
    createdAt: DateTime!
    author: User!
    group: Group!
    text: Text
    image: Image
    votes: [Vote!]!
    votesCount: Int!
    replies: [Reply!]!
    parent: Post
    children: [Post!]!
  }

  type Image {
    id: ID!
    post: Post!
    imageUrl: String!
  }

  type Text {
    id: ID!
    post: Post!
    body: String!
  }

  type Reply {
    id: ID!
    createdAt: DateTime!
    body: String!
    author: User!
    post: Post
    votes: [Vote!]!
    parent: Reply
    children: [Reply!]!
  }
`;

export default typeDefs;
