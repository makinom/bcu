/**
 * Created by m_makino on 16/10/14.
 */
var bs58check = require('bs58check');
var data = require('fs').readFileSync('/dev/stdin');
console.log(bs58check.encode(data));