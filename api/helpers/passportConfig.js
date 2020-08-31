import bcrypt from "bcryptjs"
import passportLocal from "passport-local"
import {sequelize} from "../db"
const LocalStrategy = passportLocal.Strategy

const initialize= (passport) =>{
    const findUser = (email, password, done)=> {
        sequelize.models.user.findOne({where:{email:email}}).then(user=>{
            if(!user){throw new Error("Not existing user")}
            if(user){
                bcrypt.compare(password, user.password, function (err, isMatch){
                    if(err)throw err
                    if(isMatch){
                        return done(null, user)
                    }else{
                        return done(null, false, "Password is not correct")
                    }
                })
            }else{
                return done(null, false, "Email is not registered")
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
        done(null, user.id)})
    passport.deserializeUser((id, done)=>{
        console.log(id)
        sequelize.models.user.findOne({where: {id: id}}).then(res=>{
            if(!res) throw err
            return done(null, res)
        })
    })

}

export default initialize