const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../bin/database/utility');
const mail= require('../../bin/mail/utility');
const crypto = require('crypto');


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
    let data = req.body;
    let user = {
        firstName : data._firstName,
        lastName : data._lastName,
        EMail : data._EMail,
        password: data._password,
        repeatPassword: data._repeatPassword,
        verifyToken: crypto.randomBytes(16).toString('hex')
    }

    db.addUser(user, cb => {
        switch (cb) {
            case 200:
                mail.sendmail(user.EMail,
                    'Willkommen in der Slick Community!',
                    'Moin ' + user.firstName + ' ! \n\n schön dass du dich für unseren Service entschieden hast. \n ' +
                    '\nhttp://213.109.160.202:5000/register/confirmation?q=' + user.verifyToken + ' .\n\n' +
                    'Wir wünschen Dir viel Spaß! ' +
                    '\n\n\n Bis bald dein \n Slick-Team');
                res.sendStatus(202);
                break;
            case 403:
                res.sendStatus(403);
                break;
            case 500:
                res.sendStatus(500);
                break;
        }
    });
});

router.get('/confirmation', function (req,res){
    db.activateUser(req.query.q, cb => {
        switch (cb) {
            case 200:
                res.sendStatus(200);
                break;
            case 400:
                res.sendStatus(400);
                break;
        }
    })
})

router.get('/requestVerified', function (req,res){
    db.requestActivationUser(req.query.q, cb => {
        switch (cb) {
            case 202:
                res.sendStatus(202);
                break;
            case 400:
                res.sendStatus(400);
                break;
        }
    })
})


module.exports = router;