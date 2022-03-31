const express = require('express');
const router = express.Router();
const { Wallet } = require("../models/Wallet");
//=================================
//             Wallet
//=================================

// 지갑조회
// POST http://127.0.0.1:4000/api/wallet/
router.post('/', (req, res) => {
  Wallet.find({ userFrom: req.body.userFrom, coinname: req.body.coinName })
    .sort({ createdAt: -1 })
    .exec((err, coinNames) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, coinNames, coinBalances: coinNames.coinBalance });
    });
})

// 매수
// POST http://127.0.0.1:4000/api/wallet/buy
router.post('/buy', (req, res) => {
  try {
    if (!Wallet.find({ userFrom: req.body.userFrom, coinname: req.body.coinName })) {
      Wallet.updateOne({ coinname: { $exists: false } }, { $set: { coinname: req.body.buyAmount } })

    } else {
      Wallet.find({ userFrom: req.body.userFrom, coinname: req.body.coinName })
        .exec((err, coinNames) => {
          let coinCurrentBalance = coinNames.coinBalance
          const buyCoin = Wallet.updateOne({ userFrom: { $eq: req.params.user }, coinname: { $eq: req.body.coinName } }, {
            $set: {
              coinBalance: coinCurrentBalance + req.body.buyAmount
            }
          })
        })
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

// 매도
// POST http://127.0.0.1:4000/api/wallet/buy
router.post('/sell', (req, res) => {
  try {
    Wallet.find({ userFrom: req.body.userFrom, coinname: req.body.coinName })
      .exec((err, coinNames) => {
        let coinCurrentBalance = coinNames.coinBalance
        const buyCoin = Wallet.updateOne({ userFrom: { $eq: req.params.user }, coinname: { $eq: req.body.coinName } }, {
          $set: {
            coinBalance: coinCurrentBalance - req.body.buyAmount
          }
        })
      })
  } catch (err) {
    res.status(400).send(err)
  }
})
module.exports = router;