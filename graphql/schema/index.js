import { buildSchema } from 'graphql';

export default buildSchema(`
type User {
    _id: ID!
    email: String!
    username: String!
    firstname: String!
    lastname: String!
    token: String!
    imageUrl: String
}
type Travel{
    _id: ID!
    from: String!
    to: String!
    time: String!
    date: String!
}
type RootQuery {
    Users: [User!]!
    Travels: [Travel!]!
    getProfile(token: String!): User
}
type RootMutation {
    createChat(token: String!, message: String!): User
    tokenAuth(email: String!, password: String!): User
    createUser(email: String!, password: String!, confirm: String!,username: String!,firstname: String!,lastname: String!,imageUrl: String): User
    createTravel(token: String!, from: String!, to: String!): Travel
    updateProfile(token: String!, username: String!, firstname: String!, lastname: String!): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)