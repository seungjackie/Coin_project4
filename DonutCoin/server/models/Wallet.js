const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  유저아이디
  코인 거래내역
  
*/

const walletSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

},{ timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = { Wallet }