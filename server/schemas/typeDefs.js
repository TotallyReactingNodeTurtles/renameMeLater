const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    user:User
}
type User{
    _id:ID
    username:String!
    email:String!
}


type Query{
    getSingleUser(username:String):User
    me:User
}
type Mutation{
    createUser(username:String!,email:String!,password:String!):Auth
    login(email: String!, password: String!,):Auth
  }
`
module.exports=typeDefs