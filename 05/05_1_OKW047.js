/**
 * Created by makinomasashi on 16/11/06.
 */
var BIP39 = require('bip39');
var data = require('fs').readFileSync('/dev/stdin').toString().trim();
var mnemonic = BIP39.entropyToMnemonic(data);
console.log(mnemonic);