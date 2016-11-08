/**
 * Created by makinomasashi on 16/11/06.
 */
//var Bip39 = require('bip39');
var Bip39 = require('yours-bitcoin/lib/bip-39');

//var data = require('fs').readFileSync('/dev/stdin').toString().trim();
var data = require('fs').readFileSync(process.stdin.fd).toString().trim();

//var mnemonic = Bip39.entropyToMnemonic(data);
//console.log(mnemonic);

// BIP39のオブジェクトを作成
var b39 = Bip39.fromEntropy(Buffer(data, 'hex'));
console.log(b39.toString());