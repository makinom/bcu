let Readline    = require('readline')
let Base58      = require('yours-bitcoin/lib/base-58')
let Hash        = require('yours-bitcoin/lib/hash')

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
  
  try {
    // 入力文字列から改行を削除
    let input = line.replace(/\r?\n/g,"")
    
    // 入力文字列のBufferを取得
    let buf = Buffer(input)
    
    // Base58Checkエンコードされた文字列をBase58デコード
    let decode = Base58.decode(input)
    
    // チェックサムを取得
    let checksum1 = decode.slice(-4).toString('hex')
    
    // デコード前の文字列を取得
    let data = decode.slice(0, -4)
    
    // デコード前の文字列からチェックサムを生成
    let checksum2 = Hash.sha256Sha256(Buffer(data)).slice(0, 4).toString('hex')
    
    // チェックサムを比較
    if( checksum1 == checksum2 ) {
      process.stdout.write('OK\n');
      process.stdout.write(data);
    } else {
      process.stdout.write('NG');
    }
  
  } catch(e) {
    process.stdout.write('NG');
  }
});
