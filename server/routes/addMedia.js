const express = require("express");
const router = express.Router();
const db = require('../models'); //access to all db models
const passport = require('passport');


//must initialize passport for it to work 
router.use(passport.initialize());

//import all of the passAuth code from ../auth/passAuth.js file
require('../auth/passAuth');

let requireJwt = passport.authenticate('jwt', { session: false })



//add comment
// router.post('/comment', requireJwt, async (req, res) => {

//     // collect info from header 
//     let { comment, userId, userProfileId } = req.body;
//     try {
//         //create db entry 
//         let newComment = await db.media.create({ comment, userId, userProfileId })
//     }
//     catch (err) {
//         return res.status(423).json({ error: "Can't access database" })
//     }

// })