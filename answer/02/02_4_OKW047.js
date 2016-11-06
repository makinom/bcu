/**
 * Created by makinomasashi on 16/11/07.
 */
var BigInteger = require('bigi');
var ecurve = require('ecurve');
var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var priv = BigInteger.fromHex(data.shift());
var k    = BigInteger.fromHex(data.shift());
var hash = BigInteger.fromHex(data.shift());
var ecparams = ecurve.getCurveByName('secp256k1');
var K = ecparams.G.multiply(k);
var r = K.affineX.mod(ecparams.n)
var s = k.modInverse(ecparams.n).multiply(hash.add(r.multiply(priv))).mod(ecparams.n);
// For large s, negate it. (BIP 62)
if(s.compareTo(BigInteger.fromHex('7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0')) > 0) {
  s = ecparams.n.subtract(s);
}
console.log(r.toString(16));
console.log(s.toString(16));