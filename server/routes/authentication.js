const express = require("express");
const router = express.Router();
const jwt = require('jwt-simple'); //allows us to create a jwt token
const db = require('../models'); //access to all db models
const bcrypt = require('bcryptjs'); //used to encrypt passwords

const secrets = require('../secrets'); // secrets object inside of secrets.js file in root directory

const passport = require('passport');
// const { SELECT } = require("sequelize/types/query-types");
// const { NOEXPAND } = require("sequelize/types/table-hints");

//must initialize passport for it to work 
router.use(passport.initialize());

//import all of the passAuth code from ../auth/passAuth.js file
require('../auth/passAuth');

//must call authenticate method on passport instance 
//* this our gatekeeper
let requireLogin = passport.authenticate('local', { session: false })
let requireJwt = passport.authenticate('jwt', { session: false })



//this function return a JWT & user.Id
const token = (userRecord) => {
    let timestamp = new Date().getTime(); // current time
    return { JWT: jwt.encode({ sub: userRecord.id, iat: timestamp }, secrets.secrets), UserId: userRecord.id }//first argument is the payload, second arg is secret

}


// console.log(token({id: 1}))

router.get('/', (req, res) => {

    res.send('home page')
})

//when react sends us info from form, and we send back a JWT to be saved on the client side - 
//because token is what authenticates the user and persists their login.
router.post('/register', async (req, res) => {

    // collect info from header 
    //email, password 

    let { email, password } = req.body;


    //*determine if email already exists in our db
    try {

        //if anything is returned from this query, it means that the user's email already exits
        //in out database
        let records = await db.users.findAll({ where: { email } })

        if (records.length === 0) { //no record exits, must create new user record

            // encrypt our password

            password = bcrypt.hashSync(password, 8)

            //create db entry 

            let newUserRecord = await db.users.create({ email, password }) //user is an object that we just created
            //user => {id, email, password, createdAt, updatedAt}


            //create jwt
            
             
            let jwtTokenObj = token(newUserRecord)
            let jwtToken = jwtTokenObj.JWT
            let userId = jwtTokenObj.UserId


            //return our jwt

            return res.json({ token: jwtToken, userId: userId})
        }
        else {
            //user's email already exists in our db, so send back an error message to react 

            return res.status(422).json({ error: "Email already exists" })
        }

    }
    catch (err) {
        return res.status(423).json({ error: "Can't access database" })
    }

})


router.post('/login', requireLogin, (req, res) => {

    //when they have logged successfully 
    //req.user => set by passport when a user has successfully logged in


    res.json({ token: token(req.user) })

})


router.get('/protected', requireJwt, (req, res) => {

    console.log('passed protected page');

    res.json({ isValid: true })
})

router.get('/profile/:id', requireJwt, (req, res) => {
    
})



//! all media routes 
router.post('/comment', async (req, res) => {
    // collect info from header 
    let { comment, userId, userProfileId } = req.body;
    try {
        //create db entry 
        let newComment = await db.media.create({ comment, userId, userProfileId })
    }
    catch (err) {
        return res.status(423).json({ error: "Can't access database" })
    }

})




router.get('/comment', async (req, res) => {
    try {
        //create db entry 
        let allComments = await db.media.findAll()
            .then((results) => {
                res.send(results)
            
        })
    }
    catch (err) {
        return res.status(423).json({ error: "Can't access database" })
    }

})

module.exports = router;