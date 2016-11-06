/**
 * Created by makinomasashi on 16/11/06.
 */
var Readline    = require('readline')
var BIP39 = require('bip39')
//var Mnemonic = require('bitcore-mnemonic');

var rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

var dataArray = []

rl.on('line', function (line) {
  var input = line
  dataArray.push(input)
});

rl.on('close', function() {
  var NodePbkdf2 = require('node-pbkdf2')
    , hasher = new NodePbkdf2({ iterations: 2048, saltLength: 512, derivedKeyLength: 30 });

  hasher('supersecret', function (err, encryptedPassword) {
    // encryptedPassword is a string
  });


  var a = BIP39.mnemonicToSeedHex(dataArray[0], dataArray[1])
  //var mnemonic = BIP39.entropyToMnemonic(dataArray[0])
  console.log(a)
});