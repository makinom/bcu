/**
 * Created by makinomasashi on 16/11/06.
 */
var BIP39 = require('bip39');
var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var nemo = data.shift();
var pass = data.shift();
//console.log(nemo);
//console.log(pass);

var NodePbkdf2 = require('node-pbkdf2')
//var hasher = new NodePbkdf2({ iterations: 2048, saltLength: 512, derivedKeyLength: 30 });
//
//hasher('supersecret', function (err, encryptedPassword) {
//  // encryptedPassword is a string
//});


var a = BIP39.mnemonicToSeedHex(nemo, pass)
//var mnemonic = BIP39.entropyToMnemonic(dataArray[0])
console.log(a)