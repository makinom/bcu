// An example of how the simplest scheme for deterministic keys would work.
// This is for educational purposes and it's not recommended to use this in
// practice - you should use BIP 32 instead.
var Hash = require('fullnode/lib/hash')
var BN = require('fullnode/lib/bn')
var Privkey = require('fullnode/lib/privkey')
var Pubkey = require('fullnode/lib/pubkey')
var Address = require('fullnode/lib/address')

// First, find a random seed buffer:
var buf = new Buffer('69ee755ffa5a5f7a9692ca0495108c6a7502ef221607b1ead4158badd37314d1', 'hex')

console.log('master seed: ' + buf.toString('hex'))
console.log('')

// Now append numbers to get new seeds, which are hashed to derive private
// keys:
for (var i = 1; i <= 5; i++) {
  var bufi = new Buffer(4)
  bufi.writeUInt32BE(i)
  var buff = Buffer.concat([buf, bufi])
  console.log('seed for ' + i + ': ' + buff.toString('hex'))
  var hash = Hash.sha256(buff)
  console.log('key for ' + i + ': ' + hash.toString('hex'))
  var bn = BN().fromBuffer(hash)
  var privkey = Privkey().fromBN(bn)
  var pubkey = Pubkey().fromPrivkey(privkey)
  var address = Address().fromPubkey(pubkey)
  console.log('privkey ' + i + ': ' + privkey.toString())
  console.log('pubkey ' + i + ': ' + pubkey.toString())
  console.log('address ' + i + ': ' + address.toString())
  console.log('')
}
