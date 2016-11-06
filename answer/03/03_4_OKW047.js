/**
 * Created by makinomasashi on 16/11/07.
 */
var crypto = require('crypto');
var hashes = require('fs').readFileSync('/dev/stdin').toString()
  .split('\n').map(function(txid) {
    return new Buffer(
      txid.match(/(.{2})/g).reverse().join(''), 'hex'); });
var hash = function(a, b) {
  var tmp = crypto.createHash('sha256').update(Buffer.concat([a, b])).digest();
  return crypto.createHash('sha256').update(tmp).digest();
}
var reduce = function(hashes) {
  if(hashes.length%2 == 1) {
    hashes.push(hashes[hashes.length-1]);
  }
  var ret = [];
  for(var i=0; i<hashes.length; i+=2) {
    ret.push(hash(hashes[i], hashes[i+1]));
  }
  return ret;
}
while(hashes.length > 1) {
  hashes = reduce(hashes);
}
console.log(hashes[0].toString('hex').match(/(.{2})/g).reverse().join(''));