import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//local query
import { IS_LOGGED_IN } from "./gql/query";

const uri = process.env.REACT_APP_API_URI || "http://localhost:4000/api";
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

//check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

//check for a local token
const data = {
  isLoggedIn: !!localStorage.getItem("token"),
};
cache.writeQuery({ query: IS_LOGGED_IN, data });
client.onResetStore(() => {
  cache.writeQuery({ query: IS_LOGGED_IN, data });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
