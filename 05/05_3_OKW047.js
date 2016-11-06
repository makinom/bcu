/**
 * Created by makinomasashi on 16/11/07.
 */
var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var mPrvKey = data.shift();
var path = data.shift();
var crypto = require('crypto');
var hash = crypto.HmacSHA256(mPrvKey, path);
console.log(hash);
//var prvKey
//var pubKey
//var address
//console.log(bs58check.encode(prvKey));
//console.log(bs58check.encode(pubKey));
//console.log(bs58check.encode(address));