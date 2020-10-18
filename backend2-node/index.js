const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const _ = require('./getToken') // access token to npr api
const axios = require('axios');
var qs = require('qs');
const getAccounts = require('./ncrlogic')


const PORT = process.env.PORT || 5000;
app.use(cors())

const server = http.createServer(app);

// parse application/x-www-form-encoded and application/json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
})); app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("hello, world!")
})

app.get('/userid/:userid', async (req, res) => {
    const { userId } = req.params

    let r = await getAccounts('HACKATHONUSER001')
    res.send(r)

})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
