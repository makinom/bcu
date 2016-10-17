'use strict'
let Privkey = require('fullnode/lib/privkey')
let Pubkey = require('fullnode/lib/pubkey')
let Address = require('fullnode/lib/address')

let privkey = Privkey().fromRandom()
let pubkey = Pubkey().fromPrivkey(privkey)
let address = Address().fromPubkey(pubkey)
console.log(privkey.toString())
console.log(pubkey.toString())
console.log(address.toString())

