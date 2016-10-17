'use strict'
let assert = require('assert')
let BN = require('fullnode/lib/bn')
let Hash = require('fullnode/lib/hash')

let bn = BN(5)
let data = new Buffer(500)
data.fill(0)
let hashbuf = Hash.sha256(data)
let bn2 = BN().fromBuffer(hashbuf)
assert(bn2.gt(bn))
console.log(`${bn2.toString()} > ${bn.toString()}`)
console.log(`${bn2.toBuffer().toString('hex')} > ${bn.toBuffer().toString('hex')}`)
console.log(bn2.gt(bn))
