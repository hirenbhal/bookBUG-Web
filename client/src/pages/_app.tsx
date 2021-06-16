import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:5000/graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
