import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id: ID!
    email: String!
    token: String!
}
type RootQuery {
    verifyToken(token: String!): User
}
type RootMutation {
    tokenAuth(email: String!, password: String!): User
    createUser(email: String!, password: String!, confirm: String!): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)