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
  var mnemonic = BIP39.entropyToMnemonic(dataArray[0])
  console.log(mnemonic)
});