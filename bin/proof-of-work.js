// Demonstrating the notion of proof-of-work.
// Given some data, iterate the nonce until we find a 'low enough' hash, which
// is one that starts with a 0.
var Hash = require('fullnode/lib/hash')

var data = new Buffer('fake data')
var nonce = 0

var powhash = new Buffer(32)
while (true) {
  var noncebuf = new Buffer(4)
  noncebuf.writeUInt32BE(nonce)
  var buf = Buffer.concat([noncebuf, data])
  powhash = Hash.sha256sha256(buf) // Double sha256, like bitcoin
  console.log('Nonce: ' + nonce + ', Hash: ' + powhash.toString('hex'))
  if (powhash[0] === 0) {
    break
  }
  nonce++
}
console.log('Found a hash that started with a 0 (which is 00 in byte hex).')
console.log('Computed ' + (nonce + 1) + ' nonces to find this hash')
