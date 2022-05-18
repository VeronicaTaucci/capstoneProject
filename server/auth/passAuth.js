// require passport 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  //local strategy 
const JwtStrategy = require('passport-jwt').Strategy; //jwt strategy, helps us to decode the jwt
const ExtractJwt = require('passport-jwt').ExtractJwt; //

// access db 
const db = require('../models'); //access to all models in the db

//bcrypt , encrypt the inputed the password and compare ti db
const bcrypt = require('bcryptjs');

//secret file for JWT
const secrets = require('../secrets');

let options = {
    usernameField: 'email'
}
let localLogin = new LocalStrategy(options, async (email, password, done) => {
    try {
        //check to see if email is in our db
        let records = await db.users.findAll({ where: { email } })// [{}, {}, {},{} ]
        if (records !== null) {
            //*if the email was found, //check if password is valid 
            bcrypt.compare(password, records[0].password, (err, isMatch) => {
                if (err) {
                    return done(err) // error found by bcrypt  
                }
                if (!isMatch) {
                    return done(null, false) //no auth because passwords didn't match
                }
                // valid user - send back to the login route req.user   //if match found, then user is valid //if no match, then user is invalid
                return done(null, records[0]) // => this is set on req.user
            })
        }
        else {
            // no email was found  //exit with an error
            return done(null, false)
        }
    }
    catch (error) {
        // can't access db 
        return done(error)
    }
})
passport.use(localLogin)
// JWT Strategy check to see if token is valid

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secrets.secrets,
}
let jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        //check if user is in db
        let userID = payload.sub;
        let user = await db.users.findByPk(userID); //{}
        //true - success
        if (user) {
            return done(null, user)  //place the user object on req.user

            //req.user = {id, email, password}
        }
        else {
            //else - error
            return done(null, false)
        }
    }
    catch (error) {
        //error reading db 
        return done(error)
    }
})
passport.use(jwtLogin)

