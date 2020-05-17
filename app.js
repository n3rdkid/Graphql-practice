const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const cors = require("cors")
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/isAuth');
require("./db/mongoose")
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAuth);
app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        customFormatErrorFn:(err)=>{
            console.log(err)

        }
    })
);
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

