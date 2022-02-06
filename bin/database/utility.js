//const { MongoClient } = require('mongodb');
//const User = require("../../bin/classes/user")

// Database config
const MongoClient = require( 'mongodb' ).MongoClient;
const uri = process.env.MONGODB_URL || "mongodb+srv://slick:1Ax5RBEwXUxAc4lL@scdb.9rwlo.mongodb.net/SCDB?retryWrites=true&w=majority";
const mongoose = require('mongoose');

mongoose.connect(uri);


const client = new MongoClient(uri)

const Schema = mongoose.Schema;
const Model = mongoose.model;

const userSchema = Schema({
    avatar: {
        type: String,
        default: ""
    },
    Nick: String,
    FirstName: String,
    LastName: String,
    eMail: String,
    Password: String,
    Phonenumber: {
        type: Number,
        default: 0
    },
    LastLogin: {
        type: Date,
        default: 0
    },
    Permission: {
        type: Array,
        default: 0
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        default: ""
    },
    darkmode: {
        type: Boolean,
        default: false
    }
});

const User = Model('SCDB_userData', userSchema);

//Passwort verschlüsselung
const bcrypt = require("bcrypt");
const saltRounds = 15;

module.exports = {
    testConnectToServer: function( callback ) {
        client.connect(err => {
            const collection = client.db("SCDB");
            client.close();
        });
    },

    addUser: function (user, callback) {
        // diese funktion dienst dazu um einen neuen User in der DB anzulegen
        console.log("Backend : ", user)
        User.find({eMail: user.EMail}, function(err, result){
            if(err) {console.log(err); callback(500);}; //TODO: Error Handling muss überarbeitet werden
            console.log(result)
            if (result.length >= 1) {
                callback(403) //User bereits vorhanden
            } else {
                if(user.password == user.repeatPassword) {
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if(err) {console.log(err); callback(500);};//TODO: Error Handling muss überarbeitet werden
                        let newUser = new User({
                            FirstName: user.firstName,
                            LastName: user.lastName,
                            eMail: user.EMail,
                            Password: salt,
                            verifyToken: user.verifyToken
                        });
                        newUser.save(function (err){
                            if(err) {console.log(err); callback(500);}; //TODO: Error Handling muss überarbeitet werden
                            callback(200)
                        })
                    })
                }
            }
        })
    },

    activateUser: function (token, callback){
        User.findOneAndUpdate({verifyToken: token}, {isVerified: true},function(err, result){
            if(err) callback(400)

            callback(200)
        });
    },

    requestActivationUser: function (email, callback){
        User.find({eMail: email}, function (err, result){
            if(err) {console.log(err); callback(500);};//TODO: Error Handling muss überarbeitet werden
            //console.log("result")
            if(result.length >= 1) {
                //console.log("größer 1")
                if (result[0].isVerified) {
                    //console.log(result[0].isVerified )
                    callback(202)
                } else {
                    //console.log(result[0].isVerified )
                    callback(400)
                }
            }else{
                //console.log("kleiner 1")
                callback(400)
            }
        })
    },

    loginUser: function (user, callback){
        user.find({eMail: user.email}, function (err, result){
            if (err) throw err;
            if(result.length >= 1){

            }else {
                console.log("User nicht gefunden!")
            }
        })
    }
};