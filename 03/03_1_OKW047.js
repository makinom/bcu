/**
 * Created by m_makino on 16/10/14.
 */
const Readline    = require('readline')

//let input_data = Readline.createInterface({
//  'input': process.stdin,
//  'output': {}
//});

var buf = new Buffer(-5000);
console.log(buf.writeUInt16BE(2, 0))

//input_data.on('line', function (line) {
//  line = line.trim();
//
//});