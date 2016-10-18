// Demonstrating private keys, public keys, addresses, signing and verifying
'use strict'
let Privkey = require('fullnode/lib/privkey')
let Pubkey = require('fullnode/lib/pubkey')
let Keypair = require('fullnode/lib/keypair')
let Address = require('fullnode/lib/address')
let Hash = require('fullnode/lib/hash')
let ECDSA = require('fullnode/lib/ecdsa')
let should = require('chai').should()

//var var1 = new Buffer("af06e55f021b12ddd4865b77aa53de1ca29f6935cc1956325337153a12d4d6c0", 'hex');
var var1 = "af06e55f021b12ddd4865b77aa53de1ca29f6935cc1956325337153a12d4d6c0";
var var2 = new Buffer("b156503edf0848e2a2cc8d9fef8c5dc57de53ee61fc261444ca20d3b1e901042", 'hex');
var var3 = new Buffer("0109992a6fdf26080a16984ca64de792ae19305933ade928f4fd03174332c10c", 'hex');

//var privkey = var1;
let privkey = Privkey().fromBuffer(var1)

// Get the corresponding public key
let pubkey = Pubkey().fromPrivkey(privkey)
console.log(pubkey)
// We will need the "keypair" to do ECDSA
let keypair = Keypair(privkey, pubkey)

// Also generate corresponding bitcoin address
//let address = Address().fromPubkey(pubkey)

// Display all:
console.log('privkey: ' + privkey.toString())
console.log('pubkey: ' + pubkey.toString())
//console.log('address: ' + address.toString())
process.exit();
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
