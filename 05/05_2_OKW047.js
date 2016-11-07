/**
 * Created by makinomasashi on 16/11/06.
 */
let mn = require('bitcore-mnemonic');
//var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var data = require('fs').readFileSync(process.stdin.fd).toString().split('\r\n');
var code = new mn(data[0]);
var xpriv = code.toHDPrivateKey(data[1]);
console.log(xpriv.toString());