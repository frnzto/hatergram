import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createHttpLink} from 'apollo-link-http'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom"


//config for cookies from backend to fronetnd
const link = createHttpLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      PostType: {
        fields: {
          hates: {
            merge:false
            
          },
        },
      },
      Query:{
        fields:{
          posts:{
            merge:false
          },
          userById:{
            merge:false
          }
        },
      },
      UserType: {
        fields:{
          followers:{
            merge:false
          }
        }
      },
    },
  }),
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

