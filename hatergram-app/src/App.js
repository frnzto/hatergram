import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client'
import Login from "./components/LogIn/Login"
import SignUp from "./components/SignUp/SignUp"
import Logout from "./components/Logout/Logout"
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Post from './components/Post/Post';
const GetPosts= gql`
    query GetPosts {
      users{
        username,
      
        
      }
    }
  
  `


function App() {
  
  return (

      <div className="App">
        <NavBar/>
        <Post/>
        <Logout />
        <Switch>
          <Route exact path="/signup" component={SignUp}/> 
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
  );
}

export default App;
