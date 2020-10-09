import passport from "passport"
import jwt from "jsonwebtoken";
import {sequelize} from "../db";
import bcrypt from "bcryptjs"

export const login=({email, password, req})=>{
    const validateEmail=(email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    return new Promise((resolve, reject)=>{
        // passport.authenticate('local',(err, user) =>{
        //     if(err){return reject(err)}
        //     if(!user) { return reject(new Error('Wrong Email Or Password.'))}
        //     console.log("LOGIN")
        //     req.login(user, () => resolve(user));
        // })({body: {email, password} })
        if(!validateEmail(email)){return reject("Please enter valid email")}
    sequelize.models.user.findOne({where:{email:email}}).then(user=>{
        if(!user){return reject("Email is not correct")}
        if(user){
            bcrypt.compare(password, user.password, function (err, isMatch){
                if(err)throw err
                if(isMatch){
                    const token = jwt.sign({id: user.id},"secret")
                    console.log(token)
                    console.log(req.headers)
                    return resolve({
                        userId: user.id,
                        token: token
                    }) 
                }else{
                    return reject("Password is not correct") 
                }
            })
        }else{
            return reject("No such user")
        }
            
        }
    )
    })
}

