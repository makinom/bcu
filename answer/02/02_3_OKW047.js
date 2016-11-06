/**
 * Created by makinomasashi on 16/11/07.
 */
var BigInteger = require('bigi');
var ecurve = require('ecurve');
var data = require('fs').readFileSync('/dev/stdin').toString().trim();
var ecparams = ecurve.getCurveByName('secp256k1');
var point = ecparams.G.multiply(BigInteger.fromHex(data));
console.log(point.getEncoded(false).toString('hex'));
console.log(point.getEncoded(true).toString('hex'));