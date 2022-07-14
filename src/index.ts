import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { readFileSync } from 'fs';
import { GraphQLSchema } from 'graphql';
import { resolvers } from './graphql/resolvers/resolvers';

export const app: Express = express();

app.use(cors());

const schemaString: string = readFileSync('./src/graphql/schema.graphql', { encoding: 'utf8'});
const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: schemaString,
    resolvers: resolvers
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true, //isDevelopment,
    }),
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Exception thrown while handling the request...');
    if(err) {
        console.error(err.toString());
        console.error(err.stack);
    }
    res.status(500).send('500: Exception thrown while handling the request.');
});
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404: Unknown route.');
});

const PORT: string | number = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
