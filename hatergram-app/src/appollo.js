import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:5000/graphql',
  cache: new InMemoryCache()
});
client.query({
  query: gql`
    query GetPosts {
      posts{
        title,
        user{
          username
        }
      }
    }
  
  `
}).then(res => console.log(res))