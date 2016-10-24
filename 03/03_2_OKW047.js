/**
 * Created by m_makino on 16/10/14.
 */
var Readline    = require('readline')
var Tx = require('yours-bitcoin/lib/tx')

var input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) {
  var tx = Tx.fromHex(line)
  process.stdout.write(tx.id().toString('hex'));
});