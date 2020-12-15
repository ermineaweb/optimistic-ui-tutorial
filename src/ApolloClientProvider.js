import React from "react";
import { ApolloClient, HttpLink, from, ApolloProvider, InMemoryCache } from "@apollo/client";

const GRAPHQL_HOST = "localhost";
const GRAPHQL_PORT = 5000;
const GRAPHQL_ROUTE = "/graphql";

const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_HOST}:${GRAPHQL_PORT}${GRAPHQL_ROUTE}`,
});

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
});

function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
