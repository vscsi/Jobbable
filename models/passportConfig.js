const LocalStrategy = require('passport-local').Strategy;
const {pool} =require('../models/database')
const bcrypt = require('bcrypt');

//initialize a local strategy
function initialize(passport){
const authenticateUser = (email,password,done)=>{
  pool.query(
    `select * from employees where email = $1`, [email], (err, results)=>{
      if(err) {
        throw err;
      }
      console.log(results.rows)
//finding user in DB
      if(results.rows.length>0){
        const user = results.rows[0];
        bcrypt.compare(password,user.password, (err,isMatch)=>{
          if(err){
            throw err;
          }
          if(isMatch){
            return done(null,user)
          }else{
            return done(null,false,{message: "Password is not correct"})
          }
        }) 
      }else{  //if there are no users
        return done (null,false,{message: "Email is not registered"})
      }
    }
  )
};

passport.use(
  new LocalStrategy(
    {
      //change the default authentication units: username and password to other parameters
      usernameField: 'username',
      passportField: 'password'
  },
  authenticateUser
  )
)

passport.serializeUser((user,done)=>done(null,user.id));
passport.deserializeUser((id,done)=>{
  pool.query(
    `select * from users where id = $1`, [id] , (err, result)=>{
      if(err){
        throw error
      }
      return done (null, result.rows[0]);
    }
  )
})

}

module.exports = initialize