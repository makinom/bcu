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
  var isMinus = false

  if (input < 0) {
    isMinus = true
    input = input * -1
  }

  // 入力値を2進数に変換
  var binNum = parseInt(input).toString(2)

  // 桁数が8の倍数ではない場合、頭を0で埋める
  while( binNum.length % 8 != 0 || binNum.length < 16 ) {
    binNum = "0" + binNum
  }

  // マイナスの場合、binNumの先頭1bitを1に反転する(符号付絶対値用)
  if( isMinus ) {
    binNum = "1" + binNum.substr(1)
  }

  var num  = parseInt(binNum,2)

  var buf = new Buffer(2)
  buf.writeUInt16BE(num,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2) + '\n');
  buf.writeUInt16LE(num,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2) + '\n');

  /**************************/
  var input = line
  buf.writeInt16BE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2) + '\n');
  buf.writeInt16LE(input,0)
  process.stdout.write(buf.toString("hex", 0, 1) + ' ' + buf.toString("hex", 1, 2));

});