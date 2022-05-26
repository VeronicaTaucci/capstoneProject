const express = require("express");
const router = express.Router();
const jwt = require('jwt-simple'); //allows us to create a jwt token
const bcrypt = require('bcryptjs'); //used to encrypt passwords
const passport = require('passport');
const secrets = require('../secrets'); // secrets object inside of secrets.js file in root directory

const db = require('../models'); //access to all db models
const users = require("../models/users");
const Media = require("../models/media");

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


//! delete media
router.post('/delete', async (req, res) => {
    let media = req.body
    let id = media.id
    console.log(id)
    try {
        await db.Media.destroy( {where: {id:id}})
    } catch (err) {
        console.log(err)
    }
})

//! add/delete from favourites
router.post('/favourite', async (req, res) => {
    let response = req.body
    console.log(response)

})

//when react sends us info from form, and we send back a JWT to be saved on the client side -
//because token is what authenticates the user and persists their login.
router.post('/register', async (req, res) => {

    // collect info from header
    //email, password
    let { name, email, password } = req.body;
    //*determine if email already exists in our db
    try {
        //if anything is returned from this query, it means that the user's email already exits
        //in out database
        let records = await db.users.findAll({ where: { email } })
        if (records.length === 0) { //no record exits, must create new user record
            // encrypt our password
            password = bcrypt.hashSync(password, 8)
            //create db entry
            let newUserRecord = await db.users.create({ name, email, password }) //user is an object that we just created
            //user => {id, email, password, createdAt, updatedAt}
            //create jwt
            let jwtTokenObj = token(newUserRecord)
            let jwtToken = jwtTokenObj.JWT
            let userId = jwtTokenObj.UserId
<<<<<<< HEAD

=======
>>>>>>> main
            //return our jwt
            return res.json({ token: jwtToken, userId: userId })
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


<<<<<<< HEAD
router.post('/login', requireLogin, (req, res) => { //add async
    // try {
    //     let records = await db.users.findAll({ where: { email } })
    //     if (records.length === 0) {
    //         return res.status(422).json({ error: "User doesn't exist in the data base" })
    //     } else {
=======
router.post('/login',requireLogin, (req, res) => { 
>>>>>>> main
            res.json({ token: token(req.user) })
})


// router.get('/protected', requireJwt, (req, res) => {

//     console.log('passed protected page');

//     res.json({ isValid: true })
// })

// router.get('/profile/:id', requireJwt, (req, res) => {

// })


//! all media routes

//add comment
router.post('/comment', async (req, res) => {
    // collect info from header
    let { comment, userId, mediaFormat } = req.body;
    try {
        //create db entry
        let newComment = await db.Media.create({ comment, userId, mediaFormat })
    }
    catch (err) {
        return res.status(423).json({ err })
    }
})



// display comment
router.get('/comment', async (req, res) => {
    try {
        let allComments = await db.Media.findAll({
            include: db.users
        })
            .then((results) => {
                console.log(results)
                res.send(results)
            })
    }
    catch (err) {
        return res.status(423).json({ err })
    }

})

//! add cloudinary media
router.post('/media', async (req, res) => {
    let { mediaUrl, userId, mediaFormat} = req.body;
    try {
        //create db entry
        let newCloud = await db.Media.create({ mediaUrl: mediaUrl, userId: userId, mediaFormat: mediaFormat })
        res.json(newCloud)
    }
    catch (err) {
        return res.status(423).json({ error: "Can't access database" })
    }
})

router.post('/recorder', async (req, res) => {

    let { userId, comment, mediaFormat, mediaUrl } = req.body;

    try {
        let newAudio = await db.Media.create({ userId, comment, mediaFormat, mediaUrl })
        res.json(newAudio)
    } catch (error) {
        return res.status(423).json({ error: "Can't access database" })
    }
})


module.exports = router;