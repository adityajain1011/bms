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
    billCollection.find({billerId: req.body.userName}).toArray((err, resp) => {
        if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(resp);
            if (resp.length > 0) {
              res.status(200).json({success: true, bills: resp})
            } else {
              res.status(200).json({success: false, bills: []})
            }
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
// let payload = {
//   billerId: 'Ashish',
//   vendor: 'Amazon',
//   products: [
//     {
//       itemName: 'Watch',
//       itemCode: 'A10001101',
//       itemPrice: 2340,
//       quantity: 2,
//       DOO: '05/01/2020',
//       DOD: '07/01/2020',
//       subVendor: 'CloudTail',
//       discountPercent: '5%',
//       discountedAmount: 4446
//     },{
//       itemName: 'Watch',
//       itemCode: 'Cs0001101',
//       itemPrice: 2340,
//       quantity: 2,
//       DOO: '05/01/2020',
//       DOD: '07/01/2020',
//       subVendor: 'CloudTail',
//       discountPercent: '5%',
//       discountedAmount: 4446
//     }],
//     totalBill: 8892,
//     promocodeApplied: null,
//     promocodeDiscount: null,
//     paymentDetails: {
//       via: 'creditCard',
//       cardDetails: '1234-4444-4444-4444'
//     }
// }
router.post('/addBill', (req, res) => {
  let billCollection = db.collection('bills');
  let payload = {
      billerId: req.body.customerId,
      vendor: req.body.vendor,
      products: req.body.products,
        totalBill: req.body.totalBill,
        promocodeApplied: req.body.promocodeApplied,
        promocodeDiscount: req.body.promocodeDiscount,
        paymentDetails: req.body.paymentDetails
    }
  billCollection.insertOne(payload, (err) =>{
    if (err) {
      res.status(500).json({success: false,
        error: err});
    } else {
      res.status(200).json({res: {success: true}});
    }
  })

})
module.exports = router;