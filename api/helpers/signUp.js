const bcrypt = require("bcryptjs")
import {Op} from "sequelize"
import {sequelize} from "../db"

export async function signUpHandle({email, password, username}){
    return sequelize.models.user.findOne({where: {[Op.or]:{ email: email, username: username}}}).then(isExisting=>{
        console.log(isExisting)
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