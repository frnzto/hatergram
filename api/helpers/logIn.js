import passport from "passport"


export const login=({email, password, req})=>{
   
    return new Promise((resolve, reject)=>{
        passport.authenticate('local',(err, user) =>{
            if(err){return reject(err)}
            if(!user) { return reject(new Error('Wrong Email Or Password.'))}
            req.login(user, () => resolve(user));
        })({body: {email, password} })
    })
}

