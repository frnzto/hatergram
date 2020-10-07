import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createHttpLink} from 'apollo-link-http'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {WebSocketLink} from "@apollo/client/link/ws"
import { BrowserRouter as Router } from "react-router-dom"
import { typePolicies } from "./graphql/typePorlicies"

//config for cookies from backend to fronetnd

const wsLink = new WebSocketLink({
  uri:'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: typePolicies
  }),
  link,
  
});
console.log(client)
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

