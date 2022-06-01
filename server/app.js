const express = require('express');
const app = express();

require('dotenv').config()
const path = require('path')
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false })) // scrape email and pwd from request header

app.use(express.json())  //req.body

app.use(require('./routes/authentication'))

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});