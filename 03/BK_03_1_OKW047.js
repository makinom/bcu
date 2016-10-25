/**
 * Created by m_makino on 16/10/14.
 */
var Readline    = require('readline')

var input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) {
  var input = line

  if (input < 0) {
    input = input * -1
  }

  var buf = new Buffer(2)
  buf.writeInt16BE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2));
  buf.writeInt16LE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2));

  /**************************/
  var input = line
  buf.writeInt16BE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2));
  buf.writeInt16LE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2));

});

var input = -5000

var bin = parseInt(input).toString(2)
if (input < 0) {
  bin = bin.substr(1)
}
//-1001110001000
//11001110001000

console.log(bin)
var buf1 = new Buffer(bin)
console.log(buf1)

/*
var buf2 = new Buffer(2)
buf2.fill(input)
console.log(buf2.readInt16BE(0))
*/

if (input < 0) {
  input = input * -1
}

var buf = new Buffer(2)
buf.writeInt16BE(input,0)
console.log(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2))
buf.writeInt16LE(input,0)
console.log(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2))

/**************************/
var input = -5000
var buf = new Buffer(2)
buf.writeInt16BE(input,0)
console.log(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2))
buf.writeInt16LE(input,0)
console.log(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2))