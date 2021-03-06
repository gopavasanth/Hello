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
    travelDetails: String
}
type Travel{
    _id: ID!
    from: String!
    fromlatitude: String!
    fromlongitude: String!
    to: String!
    users: String!
}
type RootQuery {
    Users: [User!]!
    getProfile(token: String!): User
}
type RootMutation {
    Travels(token: String!): [Travel!]!
    createChat(token: String!, message: String!): User
    tokenAuth(email: String!, password: String!): User
    createUser(email: String!, password: String!, confirm: String!,username: String!,firstname: String!,lastname: String!,imageUrl: String): User
    createTravel(token: String!, from: String!, to: String!, fromlatitude: String! , fromlongitude: String!): Travel
    updateProfile(token: String!, username: String!, firstname: String!, lastname: String!): User
    getMyTravels(token:String!): [Travel]
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)