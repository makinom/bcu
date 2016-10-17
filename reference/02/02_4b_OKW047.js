let Readline = require('readline')
let Bn       = require('yours-bitcoin/lib/bn')
let Ecdsa    = require('yours-bitcoin/lib/ecdsa')
let PubKey   = require('yours-bitcoin/lib/pub-key')
let Sig      = require('yours-bitcoin/lib/sig')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 4行ずつ配列に入れて値を取得する
let index = 0
let dataArray = []
rl.on('line', function (line) {
  if( index != 0 && dataArray.length % 4 == 0 ) {
    index++;
  }

  // 入力文字列から改行を削除
  let input = line.trim();

  // 配列に追加
  if( dataArray[index] == undefined ) {
    dataArray[index] = []
  }
  dataArray[index].push(input)
});

// すべての行の読み込みが終わった後にメインの処理を実行
rl.on('close', function() {
  let isFirst = true
  dataArray.forEach(function(data, index, array){
    if( !isFirst ) {
      process.stdout.write('\n');
    } else {
      isFirst = false
    }

    try {
      // 公開鍵の作成
      let pubKey = PubKey.fromBuffer(Buffer(data[0], 'hex'))

      // メッセージのハッシュ
      let z = data[1]
      let hashBuf = Buffer(z, 'hex')

      // 署名データ(r,s)
      let r = Bn.fromBuffer(Buffer(data[2], 'hex'))
      let s = Bn.fromBuffer(Buffer(data[3], 'hex'))
      let sig = Sig.fromObject({r: r, s: s, compressed: pubKey.compressed})

      // 署名の検証
      let verify = Ecdsa.verify(hashBuf, sig, pubKey)
      if(verify) {
        process.stdout.write('OK');
      } else {
        process.stdout.write('NG');
      }

    } catch(e) {
      process.stdout.write('NG');
    }
  })
});