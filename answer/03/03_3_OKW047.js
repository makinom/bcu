/**
 * Created by makinomasashi on 16/11/07.
 */
var crypto = require('crypto');
var data = require('fs').readFileSync('/dev/stdin').toString();
var header = new Buffer(data, 'hex');
var hash = function(header) {
  var tmp = crypto.createHash('sha256').update(header).digest();
  return crypto.createHash('sha256').update(tmp).digest();
}
for(var nonce=0; ; nonce++) {
  header.writeUInt32LE(nonce, 76);
  var h = hash(header);
  if(h[31]==0 && h[30]==0) {
    console.log(nonce);
    console.log(h.toString('hex').match(/(.{2})/g).reverse().join(''));
    return;
  }
}