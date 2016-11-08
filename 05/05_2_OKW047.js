/**
 * Created by makinomasashi on 16/11/06.
 */
var Bip39    = require('yours-bitcoin/lib/bip-39');
var Bip32    = require('yours-bitcoin/lib/bip-32');
//var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var dataArray = require('fs').readFileSync(process.stdin.fd).toString().split('\n');
var nemo = dataArray.shift();
var pass = dataArray.shift();

// BIP39のオブジェクトを作成
var b39 = Bip39.fromString(nemo);

// ニーモニックとパスフレーズからシードを作成
b39.mnemonic2Seed(pass);
var seed = b39.seed;

// SeedからBIP32のオブジェクトを作成
var b32 = Bip32.fromSeed(seed);

// マスタ鍵を出力
console.log(b32.toString());