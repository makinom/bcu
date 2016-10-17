'use strict'
let BIP32 = require('fullnode/lib/bip32')
let bip32 = BIP32().fromRandom()
console.log(bip32.toString())
console.log(bip32.toPublic().toString())
console.log(bip32.derive('m/3/6/2').toString())
console.log(bip32.derive('m/3/6/2').toPublic().toString())
