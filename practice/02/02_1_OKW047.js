/**
 * Created by m_makino on 16/11/08.
 */
var crypto = require('crypto');
var input = require('fs').readFileSync(process.stdin.fd);
var data = input.toString().trim();
//parseInt(input)
//input.toString().split('\n');



console.log(data);