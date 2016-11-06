/**
 * Created by makinomasashi on 16/11/07.
 */
var crypto = require('crypto');
var data = require('fs').readFileSync('/dev/stdin').toString();
var tmp = crypto.createHash('sha256').update(new Buffer(data, 'hex')).digest();
var hash = crypto.createHash('sha256').update(tmp).digest('hex');
console.log(hash.match(/(.{2})/g).reverse().join(''));