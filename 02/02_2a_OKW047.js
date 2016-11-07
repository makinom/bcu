/**
 * Created by m_makino on 16/10/14.
 */
const Readline    = require('readline')

const bs58check = require('bs58check');

let input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) {
  line = line.trim();

  let buf = new Buffer(line, 'UTF-8');
  process.stdout.write(bs58check.encode(buf));
});