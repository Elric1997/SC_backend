const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//const db = require('../../bin/database/utility');
//const mail= require('../../bin/mail/utility');
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    //logger.debug(req.sessionID)

    if(!token){
        res.json({
            auth: false,
            message: "Kein Token gefunden!"
        });
    } else {
        jwt.verify(token, "secret", (err, decoded) => {
            if(err){
                res.json({
                    auth: false,
                    message: "Bitte logge dich erst ein!"
                });
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}


router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(function(req, res, next) {
    //res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Origin", 'http://213.109.160.202:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/', function (req, res) {

});



module.exports = router;