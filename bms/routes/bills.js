import { mongoPool } from '../database/connection';
var express = require('express');
var router = express.Router();

var db;
mongoPool().then((res) => {
  db = res;
}).catch((err) => {
  console.log(err);
})

router.post('/getbills', (req, res) => {
    let billCollection = db.collection('bills');
    billCollection.findAll({billerId: req.userName}).toArray((er, resp) => {
        if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(resp);
            if (resp.length > 0) {
              res.status(200).json({success: true, user: resp[0]})
            } else {
              res.status(200).json({success: false, user: null})
            }
            res.send(resp);
          }
    })
})

router.post('/getbillByBillId', (req, res) => {
    let billCollection = db.collection('bills');
    billCollection.findAll({billerId: req.userName, billId: req.params.billId}).toArray((er, resp) => {
        if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(resp);
            if (resp.length > 0) {
              res.status(200).json({success: true, user: resp[0]})
            } else {
              res.status(200).json({success: false, user: null})
            }
            res.send(resp);
          }
    })
})
module.exports = router;