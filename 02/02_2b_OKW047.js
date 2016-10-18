/**
 * Created by m_makino on 16/10/14.
 */
const Readline    = require('readline')

const bs58check = require('bs58check')

let input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
})

input_data.on('line', function (line) {
  line = line.trim()
  try {
    var dec = bs58check.decode(line)
    var buf = new Buffer(dec, 'UTF-8')
    var enc = bs58check.encode(buf)
    if (line == enc) {
      process.stdout.write('OK\n' + dec)
    } else {
      process.stdout.write('NG')
    }
  } catch(e) {
    process.stdout.write('NG')
  }

})