/**
 * Created by m_makino on 16/10/14.
 */
var crypto = require('crypto');
var data = require('fs').readFileSync('/dev/stdin');
var hash = (algo, d, format) => crypto.createHash(algo).update(d||data).digest(format||'hex');

console.log('SHA1:' + hash('sha1'));
console.log('SHA256:' + hash('sha256'));
console.log('SHA512:' + hash('sha512'));
console.log('SHA256D:' + hash('sha256', hash('sha256', data, 'buffer')));
console.log('RIPEMD160:' + hash('ripemd160'));
console.log('RIPEMD160SHA256:' + hash('ripemd160', hash('sha256', data, 'buffer')));