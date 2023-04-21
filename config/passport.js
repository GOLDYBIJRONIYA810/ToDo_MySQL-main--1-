const passport = require('passport');
const Localstrategy = require('passport-local') .Strategy;
const { validatePassword } = require('../controller/commonController')
const user = require('../models/users')
 
console.log("passport called");
passport.use(new Localstrategy({
    usernameField: 'email',
    passwordField: 'password'
},
   async (email , password , done) => {
      console.log( email, password);
  
     const findUser = await user.findOne({email , include: 'role'})
     console.log("user");

     if(!findUser)
     {
        return done(null , false , {message:"incorrect email."});
     }
     if(!validatePassword(password , findUser.password)) {
        
        return done(null , false , {message: "incorrect password"});
     }
     if(!validatePassword( password , findUser.password)) {
      return done(null, false , { message: 'Incorrect password'});
  } console.log("user2");
     
     const returnUser = {
        id: findUser.id,
        name: findUser.firstName + ' ' + findUser.lastName,
        email: findUser.email,
        role: findUser.role.authority
     }
     
     return done(null , findUser);
   }
));


passport.serializeUser((user,done) => {
    done(null , user.id)
});

passport.deserializeUser(async (id ,done) => {
    const findUser = await user.findOne({id , include: 'role'});
    const  userData = {
      id: findUser.id,
      name : findUser.firstName + ' ' + findUser.lastName,
      email : findUser.email,
      role: findUser.role.authority
    }
    return done(null,userData);
});

module.exports= passport