const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    height: 'Number',
    hash: 'String',
    confirmation: 'Number',
    strippedsize: 'Number',
    size: 'Number',
    weight: 'Number',
    version: 'Number',
    versionhex: 'Number',
    merkleroot: 'String',
    time: 'Number',
    mediantime: 'Number',
    nonce: 'Number',
    bits: 'String',
    difficulty: 'Number',
    chainwork: 'Number',
    previousblockhash: 'String',
    nextblockhash: 'String'
});

module.exports = mongoose.model('blocks', BlockSchema);
