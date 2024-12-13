import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  concat,
  from,
  HttpLink,
  DefaultOptions,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { clearUserData, getUserData } from "./util.service";
import { onError } from "@apollo/client/link/error";
export default function initGraphQLClient() {
  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: getUserData().token,
      },
    }));
    return forward(operation).map((response) => {
      const keys = Object.keys(response?.data || {});
      for (const key of keys) {
        const item = response?.data?.[key];
        if (item && item.error) {
          throw new GraphQLError(
            `Error ${operation.operationName} - ${item.error.message}`
          );
        }
      }
      return response;
    });
  });
  const errorLink = onError((error) => {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message, locations, path, extensions: { code } }: any) => {
          if (code === "UNAUTHENTICATED") {
            clearUserData();
            window.location.href = "/login";
          }
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        }
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const responseLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() });
    return forward(operation).map((data) => {
      console.log(`Response`, data);
      return data;
    });
  });
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, responseLink, concat(authMiddleware, httpLink)]),
    defaultOptions,
  });
  return client;
}
