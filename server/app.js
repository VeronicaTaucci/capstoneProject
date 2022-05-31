const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false })) // scrape email and pwd from request header
app.use(express.json())  //req.body

app.use(require('./routes/authentication'))

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});