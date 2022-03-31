const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
//=================================
//             Auth
//=================================

// 인증 
// http://127.0.0.1:4000/api/user/auth
router.get('/', auth, (req, res) => {
  res.status(200).json({
    isAuth: true,
    userData: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      github: req.user.github,
      gender: req.user.gender,
      field: req.user.field,
      userDescription: req.user.userDescription,
      date: req.user.date,
      walletaddress: req.user.walletaddress,
      money : req.user.money,
      coin : req.user.coin,
    }
  })
})

module.exports = router;