'use strict'
let BN = require('fullnode/lib/bn')
let Privkey = require('fullnode/lib/privkey')
let Pubkey = require('fullnode/lib/pubkey')

let privkey = Privkey().fromBN(BN(5))
console.log(privkey.toString())
let pubkey = Pubkey().fromPrivkey(privkey)
console.log(pubkey.toString())

privkey = Privkey().fromRandom()
console.log(privkey.toString())
pubkey = Pubkey().fromPrivkey(privkey)
console.log(pubkey.toString())
