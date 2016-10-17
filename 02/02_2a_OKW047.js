/**
 * Created by m_makino on 16/10/14.
 */

//入力文字列をBase58checkかける。

//ファイルモジュール
const Readline    = require('readline')

const bs58check = require('bs58check');

// 標準入力を受け取る
let input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) { // 1行ずつ取得
  line = line.trim();

  let buf = new Buffer(line, 'UTF-8');//まずバイナリ化する
  process.stdout.write(bs58check.encode(buf));
});