let Readline   = require('readline')
let BigInteger = require('bigi')
let Ecurve     = require('ecurve')

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
  
  // プライベートキーをBufferに変換
  let privateKey = new Buffer(input, 'hex')
  
  // 楕円曲線にsecp256k1を指定
  let ecparams = Ecurve.getCurveByName('secp256k1')
  
  // 秘密鍵から曲線上の点(x,y)を取得
  let curvePt = ecparams.G.multiply(BigInteger.fromBuffer(privateKey))
  let x = curvePt.affineX.toBuffer(32)
  let y = curvePt.affineY.toBuffer(32)
  
  // 非圧縮形式の公開鍵を取得
  let publicKeyNoCompress = Buffer.concat([new Buffer([0x04]), x, y])

  // 圧縮公開鍵を取得
  let publicKeyCompress = null
  if( BigInteger.fromBuffer(y).isEven() ) { // yの値が偶数かどうか？
      publicKeyCompress = Buffer.concat([new Buffer([0x02]), x])
  } else {
      publicKeyCompress = Buffer.concat([new Buffer([0x03]), x])
  }

  // 各公開鍵を出力
  process.stdout.write(publicKeyNoCompress.toString('hex'));
  process.stdout.write('\n');
  process.stdout.write(publicKeyCompress.toString('hex'));
});
