import React, {useState} from 'react';
import './App.css';
import { useQuery} from '@apollo/client'
import Login from "./components/LogIn/Login"
import SignUp from "./components/SignUp/SignUp"
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Posts from './components/Posts/Posts';
import ChatContainer from "./components/ChatContainer/ChatContainer"
import {POSTS_FOLLOWED, USER, PAGINATE_POSTS} from "./graphql/queries"
import UserInfo from './components/UserInfo/UserInfo';


function App() {
  const {loading, error, data}= useQuery(USER)
  let user= null
  const checkDarkMode = localStorage.getItem("DarkMode")
  const [darkMode , setDarkMode]= useState(checkDarkMode === "true" ? true : false)

  let root= document.documentElement
  
  const changeToDarkColors = () => {
      root.style.setProperty('--body-bg-color', "#18191a")
      root.style.setProperty('--text-color', "#a8abaf")
      root.style.setProperty('--logo-color', "#a8abaf")
      root.style.setProperty('--form-main-color', "#242526")
      root.style.setProperty('--form-main-color-hover', "#3a3b3c")
      root.style.setProperty('--username-caption-color', "#e4e6eb")
      root.style.setProperty('--white-color', "#3a3b3c")
      root.style.setProperty('--comments-text-color', "#e4e6eb")
  }

  const changeToLightColors = () => {
      root.style.setProperty('--body-bg-color', " #f3f6f6")
      root.style.setProperty('--text-color', "#eb6678")
      root.style.setProperty('--logo-color', "#2a363b")
      root.style.setProperty('--form-main-color', "#acdbdf")
      root.style.setProperty('--form-main-color-hover', "#c4ebf0")
      root.style.setProperty('--username-caption-color', "#2a363b")
      root.style.setProperty('--white-color', "white")
      root.style.setProperty('--comments-text-color', "#546b75")
      
  }
  
  darkMode ? changeToDarkColors() :changeToLightColors()


  if(loading){return <div>Loading...</div>}
  if(error){return <div>{error}</div>}
  if(data.user === null){
    user=null
    return (
    <div className="App">
      <NavBar user={user}/>
      <Switch>
        <Route exact path="/signup" component={SignUp}/> 
        <Route exact path="/login" component={Login}/>
        <Route exact path="/users/:id" render={(props)=>{
          return <UserInfo {...props} user={user}/>
        }}/>
      </Switch>
    </div>
  )}
  if(data.user != null){
    user = data.user
    return (
  
        <div className="App">
          <NavBar user={user}/>
          <ChatContainer user={user}/>
          <Switch>
            <Route exact path="/posts"  render={(props)=>{
              return <Posts {...props} query={PAGINATE_POSTS}  user={user}/>}}/>
            <Route exact path="/dashboard"  render={(props)=>{
              return <Posts {...props} query={POSTS_FOLLOWED} user={user}/>}}/>
            <Route exact path="/signup" component={SignUp}/> 
            <Route exact path="/login" render={(props)=>{
              return <Login {...props} user={user}/>}}/>
            <Route exact path="/users/:id" render={(props)=>{
              return <UserInfo {...props} user={user}/>
            }}/>
          </Switch>
        </div>
    );
  }
}

export default App;
