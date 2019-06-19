import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id: ID!
    email: String!
    username: String!
    firstname: String!
    lastname: String!
    token: String!
}
type Travel{
    _id: ID!
    location: String!
    time: String!
    date: String!
}
type RootQuery {
    Users: [User!]!
    Travels: [Travel!]!
    getProfile(token: String!): User
}
type RootMutation {
    tokenAuth(email: String!, password: String!): User
    createUser(email: String!, password: String!, confirm: String!,username: String!,firstname: String!,lastname: String!): User
    createTravel(location: String!, time: String!, date: String!): Travel
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)