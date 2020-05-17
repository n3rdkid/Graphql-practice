const buildSchmea = require("graphql").buildSchema
module.exports = buildSchmea(`
    type User{
        _id:ID!,
        email:String!,
        password:String!,
        token:[String!]
    }
    type AuthData{
        user:User
        token:String!
    }
    type Shows{
        _id:ID!,
        title:String!,
        releasedYear:String!,
        poster:String!
    }
    input UserInput{
        email:String!
        password:String!
    }
    type RootQuery{
       shows:[Shows!]!
       getWatchLater:[Shows!]!
    }
    type RootMutation{
        signIn(email:String!,password:String!):AuthData!
        signUp(userInput:UserInput!):AuthData!
        addShow(title:String!,releasedYear:String!, poster:String!):String!
        addShowToWatchLater(id:String!):String,
        addShowToWatchList(id:String!):String
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }`)
