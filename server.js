const express = require('express')
const app = express();
const dbUtility = require("./bin/database/utility.js")
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const router = require("./routes/routes")(app);
const session = require('express-session');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text({ type:"application/json" }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dbUtility.testConnectToServer( function( err, client ) {

} );

server.listen(PORT, () => console.log(`Server listen on Port: ${PORT}!`));