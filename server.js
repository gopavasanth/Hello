import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from "express-graphql";
import cors from "cors";
import mongoose from 'mongoose';
import graphQLSchema from './graphql/schema';
import graphQLResolvers from './graphql/resolvers';

const app = express();

app.use(
    cors(),
    bodyParser.json()
)
app.use(
    "/",
    expressGraphQL({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

function main() {
    const port = process.env.PORT || 4000;
    const URI = `mongodb+srv://hello:hello@hello-jnl1o.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            app.listen(port, () => console.log(`Server is listening on port: ${port}`));
        })
        .catch(err => {
            console.log(err);
        })
}

main();