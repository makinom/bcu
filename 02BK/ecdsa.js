// Demonstrating private keys, public keys, addresses, signing and verifying
'use strict'
let Privkey = require('fullnode/lib/privkey')
let Pubkey = require('fullnode/lib/pubkey')
let Keypair = require('fullnode/lib/keypair')
let Address = require('fullnode/lib/address')
let Hash = require('fullnode/lib/hash')
let ECDSA = require('fullnode/lib/ecdsa')
let should = require('chai').should()

// Generate a random new private key for signing
let privkey = Privkey().fromRandom()

// Get the corresponding public key
let pubkey = Pubkey().fromPrivkey(privkey)

// We will need the "keypair" to do ECDSA
let keypair = Keypair(privkey, pubkey)

// Also generate corresponding bitcoin address
let address = Address().fromPubkey(pubkey)

// Display all:
console.log('privkey: ' + privkey.toString())
console.log('pubkey: ' + pubkey.toString())
console.log('address: ' + address.toString())

// Some data that we want to sign/verify
var databuf = new Buffer('some example data for signing and verifying')

console.log('data: "' + databuf.toString() + '"')

// Always sign the hash, not the data itself
var hashbuf = Hash.sha256(databuf)

// Now... sign!
var sig = ECDSA.sign(hashbuf, keypair)

console.log('signature: ' + sig.toString())

// Verify, without using privkey, that this signature is valid
let verified = ECDSA.verify(hashbuf, sig, pubkey)
should.exist(verified)
verified.should.equal(true)
console.log('verified: ' + verified)
