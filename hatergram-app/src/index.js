import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createHttpLink} from 'apollo-link-http'
import { ApolloLink , split ,ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom"
import { typePolicies } from "./graphql/typePorlicies"
import {WebSocketLink} from "@apollo/client/link/ws"
import { getMainDefinition } from '@apollo/client/utilities'
import {Provider} from "react-redux"
import store from "./reduxStore"

//config for cookies from backend to fronetnd
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([splitLink])

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: typePolicies
  }),
  link,
  
});
ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ApolloProvider>
  ,
  document.getElementById('root')
);

