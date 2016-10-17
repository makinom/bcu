// An example of how to use BIP 39 - mnemonic for BIP 32 hierarchical
// deterministic keys
var Random = require('fullnode/lib/random')
var BIP39 = require('fullnode/lib/bip39')
var BIP32 = require('fullnode/lib/bip32')

var entropy = Random.getRandomBuffer(128 / 8)
console.log('entropy: ' + entropy.toString('hex'))
var mnemonic = BIP39().fromEntropy(entropy).toString()
console.log('mnemonic: ' + mnemonic)
var seed = BIP39().fromString(mnemonic).toSeed()
console.log('seed: ' + seed.toString('hex'))
var xprv = BIP32().fromSeed(seed)
console.log('master xprv: ' + xprv.toString())
