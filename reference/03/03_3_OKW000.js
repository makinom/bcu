let Readline    = require('readline')
let BlockHeader = require('yours-bitcoin/lib/block-header')
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
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
  // ブロックヘッダを作成
  let blockHeader = BlockHeader.fromHex(input)
  
  // nonceを0からはじめて、先頭が0000になるまで計算
  let nonce = 0
  let blockHeaderHash = ''
  while(true) {
    
    blockHeader.nonce = nonce
    
    blockHeaderHash = Hash.sha256Sha256(blockHeader.toBuffer()).toString('hex')
    if (reverseEndian(blockHeaderHash).indexOf('0000') == 0) {
      break
    }
    nonce++
  }

  // nonceとハッシュを出力
  process.stdout.write(nonce.toString());
  process.stdout.write('\n');
  process.stdout.write(reverseEndian(blockHeaderHash));
});

/**
 * エンディアンを逆にする
 */
function reverseEndian( hex ) {
  // 桁数が2の倍数ではない場合、頭を0で埋める
  while( hex.length % 2 != 0 ) {
      hex = "0" + hex
  }

  let r = ""
  let a = hex.match(/[\s\S]{1,2}/g);
  a.reverse()
  
  for(var i = 0; i < a.length; i++) {
    r = r + a[i]
  }
  return r
}