let Readline = require('readline')
let Bip39    = require('yours-bitcoin/lib/bip-39')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ処理
let isFirst = true
rl.on('line', function (line) {
  if( !isFirst ) {
    process.stdout.write('\n')
  } else {
    isFirst = false
  }
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
  // BIP39のオブジェクトを作成
  let bip39 = Bip39.fromEntropy(Buffer(input, 'hex'))
    
  process.stdout.write(bip39.toString());
});