/**
 * Created by makinomasashi on 16/11/06.
 */
let Bip39    = require('yours-bitcoin/lib/bip-39')
let Bip32    = require('yours-bitcoin/lib/bip-32')
//var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var data = require('fs').readFileSync(process.stdin.fd).toString().split('\n');
var nemo = data.shift();
var pass = data.shift();
var nemo_pass = [nemo, pass];
console.log(nemo_pass);
// BIP39のオブジェクトを作成
var bip39 = Bip39.fromString(nemo)

// ニーモニックとパスフレーズからシードを作成
bip39.mnemonic2Seed(nemo_pass)
var seed = bip39.seed;

// SeedからBIP32のオブジェクトを作成
var bip32 = Bip32.fromSeed(seed)

// マスタ鍵を出力
console.log(bip32.toString());