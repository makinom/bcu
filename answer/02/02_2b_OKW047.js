/**
 * Created by m_makino on 16/10/14.
 */
var bs58check = require('bs58check');
var data = require('fs').readFileSync('/dev/stdin').toString().trim();
try {
  console.log('OK\n' + bs58check.decode(data));
} catch(e) {
  console.log('NG');
}