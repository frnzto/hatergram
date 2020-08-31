import React ,{ useState }from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import logo from "../../static/images/logo.png"
import "./Login.css"
import loginIcon from "../../static/icons/login.svg"
const LOGIN = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            email
            id
        }
    }
`
const USER = gql`
    query User{
        user{
            email
            id
        }
    }
`



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login]=useMutation(LOGIN)
    const [errors, setErrors]= useState("")
    const {loading, error, data}= useQuery(USER)
    const handleLogin=(e)=>{
        e.preventDefault()

        login({variables: {email: `${email}`, password: `${password}`},
                            refetchQueries: [{query: USER}]
        }).catch(res => res.graphQLErrors.map(error=> setErrors(error.message)))
        
    }
    const showUser = ()=>{
        console.log(data.user)
    }
    
    return (
        <div className="login__container">
            <div className="login__header">
                <img src={logo} alt=""/>
            </div>
            <form className='login__form'>
                <div>{errors}</div>
                <div className='login__fields'>
                    <input name="email" className="login__input" type="email" required onChange={e=> setEmail(e.target.value)} />
                    <label for="email"className="login__label"><span>Email</span></label>
                </div>
                <div className="login__fields">
                    <input name="password" className="login__input" type="password" onChange={e=> setPassword(e.target.value)} required/>
                    <label for="password" className="login__label"><span>Password</span></label>
                </div>
            </form>
                <button className="login__button" onClick={handleLogin} >Log In</button> 
        </div>
    )

}

export default Login
