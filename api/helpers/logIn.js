import passport from "passport"


export const login=({email, password, req})=>{
    return new Promise((resolve, reject)=>{
        passport.authenticate('local',(err, user) =>{
            if(err){return console.log(err)}
            if(!user) { reject('Invalid credentials.')}

            req.login(user, () => resolve(user));
        })({body: {email, password} })
    });
}

