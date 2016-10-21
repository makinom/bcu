let Readline = require('readline')
let Tx       = require('yours-bitcoin/lib/tx')
let Br       = require('yours-bitcoin/lib/br')

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
  
  // トランザクションのデータを作成
  let tx = Tx.fromHex(input)
  
  // トランザクションIDを取得
  let txid = tx.id()
  
  // トランザクションIDを出力
  process.stdout.write(txid.toString('hex'));
});
