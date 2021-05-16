import { mongoPool } from '../database/connection';
var express = require('express');
var router = express.Router();

var db;
mongoPool().then((res) => {
  db = res;
}).catch((err) => {
  console.log(err);
})

/* GET users listing. */
router.post('/login', function(req, res, next) {
  let userCOllection = db.collection('users');
  var regex = new RegExp(["^", req.body.userName, "$"].join(""), "i");
  userCOllection.find({userName: regex,
    password: req.body.password}).toArray((err, resp) => {
    if (err) {
      res.send(err);
    } else {
      if (resp.length > 0) {
        res.status(200).json({success: true, user: resp[0]})
      } else {
        res.status(200).json({success: false, user: null})
      }
    }
  })
});


router.post('/register', (req, res) => {
  console.log(db);
  let userCollection = db.collection('users');
  var regex = new RegExp(["^", req.body.userName, "$"].join(""), "i");
  userCollection.find({userName: regex}).toArray((err, resp) => {
    if (err) {
      res.send('err');
    } else if(resp.length > 0) {
      res.send('User with same username already exists');
    } else {
      userCollection.insertOne({
        userName: req.body.userName,
        password: req.body.password,
        contactNo: req.body.contactNo,
        email: req.body.email
      }, (errInsert, resp) => {
        if(errInsert) {
          res.send('err');
        } else {
          res.send(resp);
        }
      })
    }
  })
})

router.post('/registerVendor', (req, res) => {
  let userCollection = db.collection('vendors');
  var regex = new RegExp(["^", req.body.vendorName, "$"].join(""), "i");
  userCollection.find({vendorName: regex}).toArray((err, resp) => {
    if (err) {
      res.send('err');
    } else if(resp.length > 0) {
      res.send('User with same vendorName already exists');
    } else {
      userCollection.insertOne({
        vendorName: req.body.vendorName,
        password: req.body.password,
        contactNo: req.body.contactNo,
        email: req.body.email,
        metaData: req.body.metaData
      }, (errInsert, resp) => {
        if(errInsert) {
          res.status(500).json({err: "Database Error Occured"});
        } else {
          res.status(200).json({resp});
        }
      })
    }
  })
})

module.exports = router;
