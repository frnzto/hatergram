import jwt from "jsonwebtoken";
import {sequelize} from "../db";

const findUser = (email, password)=> {
    if(!validateEmail(email)){return new Error("Please enter valid email")}
    sequelize.models.user.findOne({where:{email:email}}).then(user=>{
        if(!user){return new Error("Email is not correct")}
        if(user){
            bcrypt.compare(password, user.password, function (err, isMatch){
                if(err)throw err
                if(isMatch){
                    jwt.sign({id: user.id},"secret")
                    return {user}
                }else{
                    return new Error("Password is not correct") 
                }
            })
        }else{
            return new Error("No such user")
        }
            
        }
    )

}