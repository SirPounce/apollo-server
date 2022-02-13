import { readFileSync } from 'fs';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from 'apollo-server';
import { driver as _driver, auth } from 'neo4j-driver';

const server = () => {
	const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;

	const typeDefs = readFileSync(
		new URL('./schema/schema.graphql', import.meta.url),
	).toString('utf-8');

	const driver = _driver(NEO4J_URI, auth.basic(NEO4J_USER, NEO4J_PASSWORD));

	const { schema } = new Neo4jGraphQL({ typeDefs, driver });

	return new ApolloServer({ schema });
};

export default server;
