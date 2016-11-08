let Readline    = require('readline')
let Base58Check = require('yours-bitcoin/lib/base-58-check')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ処理
let isFirst = true
rl.on('line', function (line) {
  if( !isFirst ) {
    process.stdout.write('\n');
  } else {
    isFirst = false
  }
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
  // 入力文字列のBufferを取得
  let buf = Buffer(input)
  
  // Base58Checkエンコードした文字列を出力
  let base58check = Base58Check.encode(buf)
  process.stdout.write(base58check);
});
