import { readFileSync } from "fs";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from "apollo-server";
import { driver as _driver, auth } from "neo4j-driver";
import getEnv from "./environment.js";

const setupServer = () => {
  const { uri, user, password } = getEnv();

  const typeDefs = readFileSync(
    new URL("./schema/schema.graphql", import.meta.url)
  ).toString("utf-8");

  const driver = _driver(uri, auth.basic(user, password));

  const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

  return new ApolloServer({ schema: neoSchema.schema });
};

export default setupServer;
