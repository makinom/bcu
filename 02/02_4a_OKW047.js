/**
 * Created by makinomasashi on 16/10/15.
 */
var Readline    = require('readline');
var BigInteger = require('bigi');
var ecurve = require('ecurve');
let Pubkey = require('fullnode/lib/pubkey');
let Keypair = require('fullnode/lib/keypair');
let Address = require('fullnode/lib/address');
let Hash = require('fullnode/lib/hash');
let ECDSA = require('fullnode/lib/ecdsa');

var input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

var i = 0;
line1 = '';
line2 = '';
input_data.on('line', function (line) {
  line = line.trim();
  i++;

  if (i == 1) {
    line1 = line;
  }
  if (i == 2) {
    line2 = line;

    var privkey = new Buffer(line1, 'hex');
    var ecparams = ecurve.getCurveByName('secp256k1');
    var curvePt = ecparams.G.multiply(BigInteger.fromBuffer(privkey));
    //var x = curvePt.affineX.toBuffer(32);
    //var y = curvePt.affineY.toBuffer(32);

    var pubkey = Pubkey().fromPrivkey(privkey);
    //var pubkey = curvePt.getEncoded(true);
    var keypair = Keypair(privkey, pubkey);
    //var address = Address().fromPubkey(pubkey);
    process.stdout.write(privkey.toString('hex') + '\n');
    process.stdout.write(pubkey.toString('hex') + '\n');

    var databuf = new Buffer(line2);
    var hashbuf = Hash.sha256(databuf);
    var sig = ECDSA.sign(hashbuf, keypair)
    process.stdout.write(sig.toString('hex') + '\n');
  }

});
