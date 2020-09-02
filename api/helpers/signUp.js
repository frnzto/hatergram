const bcrypt = require("bcryptjs")
import {Op} from "sequelize"
import {sequelize} from "../db"

const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export async function signUpHandle({email, password, username}){
    if(!validateEmail(email)){throw new Error("Please enter valid email")}
    return sequelize.models.user.findOne({where: {[Op.or]:{ email: email, username: username}}}).then(isExisting=>{
        if(isExisting){
            console.log(isExisting)
            console.log(username)
            if(isExisting.email === email){throw new Error("Email is already taken")}
            if(isExisting.username === username){throw new Error("Username is already taken")}
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return sequelize.models.user.create({
            username: username,
            email: email,
            password: hash
        })
    })
}