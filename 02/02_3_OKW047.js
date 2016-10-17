/**
 * Created by makinomasashi on 16/10/15.
 */
var Readline    = require('readline');
var crypto = require('crypto');
var BigInteger = require('bigi');
var ecurve = require('ecurve');

var input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) {
  line = line.trim();

  var privateKey = new Buffer(line, 'hex');
  var ecparams = ecurve.getCurveByName('secp256k1');
  var curvePt = ecparams.G.multiply(BigInteger.fromBuffer(privateKey));
  //var x = curvePt.affineX.toBuffer(32);
  //var y = curvePt.affineY.toBuffer(32);

  //var publicKey = Buffer.concat([new Buffer([0x04]), x, y])
  var publicKey = curvePt.getEncoded(false);
  var compPublicKey = curvePt.getEncoded(true);

  process.stdout.write(publicKey.toString('hex') + '\n' + compPublicKey.toString('hex'));
});
