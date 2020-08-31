import React , {useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import logo from "../../static/images/logo.png"
import "./SignUp.css"

const Add_User = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            username
        }
    }
`

function CreateUser() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [addUser] = useMutation(Add_User)
    const [errors, setErrors]= useState('')
    
    
    const handleSubmit =(e)=>{
        e.preventDefault()
        
        addUser({variables: { username: `${username}`, email: `${email}`, password}}).catch(res => res.graphQLErrors.map(error=> setErrors(error.message)))
        setErrors("")
    }
    return (
        <div className="signup__container">  
            <div className="signup__header">
                <img src={logo} alt=""/>
            </div>
            <form className='signup__form'>
                <div>{errors}</div>
                <div className='signup__fields'>
                    <input name="username" className="signup__input" type="text" required onChange={e=> setEmail(e.target.value)} />
                    <label htmlFor="username"className="signup__label"><span>Username</span></label>
                </div>
                <div className='signup__fields'>
                    <input name="email" className="signup__input" type="email" required onChange={e=> setEmail(e.target.value)} />
                    <label htmlFor="email"className="signup__label"><span>Email</span></label>
                </div>
                <div className="signup__fields">
                    <input name="password" className="signup__input" type="password" onChange={e=> setPassword(e.target.value)} required/>
                    <label htmlFor="password" className="signup__label"><span>Password</span></label>
                </div>
            </form>
                <button className="signup__button" onClick={handleSubmit} >Sign Up</button> 
        </div>
    )
}

export default CreateUser
