import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createHttpLink} from 'apollo-link-http'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom"


//config for cookies from backend
const link = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  link,
});

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

