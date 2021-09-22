const { readFileSync } = require('fs'); // For reading typedefs

const { Neo4jGraphQL } = require('@neo4j/graphql');
const { ApolloServer, gql } = require('apollo-server');
const neo4j = require('neo4j-driver');

// Ensure environment variables first
const dotenv = require('dotenv');
dotenv.config();

const getEnv = () => {
    return {
        uri: process.env.NEO4J_URI,
        user: process.env.NEO4J_USER,
        password: process.env.NEO4J_PASSWORD,
    }
}

const setupServer = () => {
    const { uri, user, password } = getEnv();

    const typeDefs = readFileSync('./schema.graphql').toString('utf-8')

    const driver = neo4j.driver(
        uri,
        neo4j.auth.basic(user, password),
    );

    const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

    return new ApolloServer({schema: neoSchema.schema});

}

setupServer().listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
