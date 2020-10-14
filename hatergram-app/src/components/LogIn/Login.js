import React ,{ useState, useEffect }from 'react'
import { useMutation } from '@apollo/client'

import logo from "../../static/images/logo.png"
import { USER } from "../../graphql/queries"
import {LOGIN} from "../../graphql/mutations"

import "./Login.css"

function Login({user, history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login]=useMutation(LOGIN)
    const [errors, setErrors]= useState("")
    
    useEffect(()=>{
        if(user){history.push("/posts")}
    },[history, user])

    const handleLogin=(e)=>{
        e.preventDefault()
        if(email.length === 0){return setErrors("Email Required")}
        setErrors("")
        if(password.length === 0){return setErrors("Password Required")}
        setErrors("")
        login({variables: {email: `${email}`, password: `${password}`},
                            refetchQueries: [{query: USER}]
        }).then(res=> history.push("/dashboard")).catch(res =>{
            res.graphQLErrors.map(error=> setErrors(error.message))
        })  
        
    }

    const onKeyPress=(event)=>{
        if(event.key === "Enter"){
            return handleLogin(event)
        }
    }
  
    return (
        <div className="login__container">
            <div className="login__header">
                <img src={logo} alt=""/>
            </div>
            <form className='login__form'>
                {errors.length > 0 ? <div className="login__errors">{errors}</div> : null}
                <div className='login__fields'>
                    <input onKeyPress={onKeyPress} name="email" className="login__input" type="email" required onChange={e=> setEmail(e.target.value)} />
                    <label htmlFor="email"className="login__label"><span>Email</span></label>
                </div>
                <div className="login__fields">
                    <input onKeyPress={onKeyPress} name="password" className="login__input" type="password" onChange={e=> setPassword(e.target.value)} required/>
                    <label htmlFor="password" className="login__label"><span>Password</span></label>
                </div>
            </form>
                <button 
                    className="login__button" 
                    onKeyPress={onKeyPress}
                    onClick={handleLogin} 
                >
                    Log In
                </button> 
        </div>
    )

}

export default Login
