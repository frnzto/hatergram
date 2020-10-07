import bcrypt from "bcryptjs"
import passportLocal from "passport-local"
import {sequelize} from "../db"
const LocalStrategy = passportLocal.Strategy

const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

const initialize= (passport) =>{
    const findUser = (email, password, done)=> {
        if(!validateEmail(email)){return done(new Error("Please enter valid email"),false)}
        sequelize.models.user.findOne({where:{email:email}}).then(user=>{
            if(!user){return done(new Error("Email is not correct"), false)}
            if(user){
                bcrypt.compare(password, user.password, function (err, isMatch){
                    if(err)throw err
                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(new Error("Password is not correct"), false )
                    }
                })
            }else{
                return done(new Error("No such user"), null, false )
            }
                
            }
        )

    }
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },findUser))
    
    passport.serializeUser((user, done) =>{
        console.log("ID ", user)
        return done(null, user.id)})
    passport.deserializeUser(async (id, done)=>{
        console.log("user",id)
        const loggedUser= await sequelize.models.user.findOne({where: {id: id}})
        return done(null, loggedUser)
    })

}

export default initialize