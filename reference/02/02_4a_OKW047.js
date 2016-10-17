let Readline = require('readline')
let Bn       = require('yours-bitcoin/lib/bn')
let Ecdsa    = require('yours-bitcoin/lib/ecdsa')
let KeyPair  = require('yours-bitcoin/lib/key-pair')
let Point    = require('yours-bitcoin/lib/point')
let PrivKey  = require('yours-bitcoin/lib/priv-key')
let Sig      = require('yours-bitcoin/lib/sig')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 3行ずつ配列に入れて値を取得する
let index = 0
let dataArray = []
rl.on('line', function (line) {
  if( index != 0 && dataArray.length % 3 == 0 ) {
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

    // 秘密鍵の作成
    let privateKey = PrivKey.fromObject({bn: Bn.fromBuffer(Buffer(data[0], 'hex')), compressed: true })

    // kの値をBig Numberに変換
    let k = Bn.fromBuffer(Buffer(data[1], 'hex'))

    // KeyPairの作成
    let keypair = KeyPair.fromPrivKey(privateKey)

    // messageの値をBufferに変換
    let message = Buffer(data[2], 'hex')

    // 楕円曲線の生成
    let ecdsa = new Ecdsa().fromObject({hashBuf: message, keyPair: keypair, k: k})

    /*
     // 署名の作成
     ecdsa.sign()

     // rとsの値を出力
     process.stdout.write(ecdsa.sig.r.toBuffer().toString('hex'));
     process.stdout.write('\n')
     process.stdout.write(ecdsa.sig.s.toBuffer().toString('hex'));
     */

    // BIP62を適応しないで署名を作成
    signNoBIP62 = createNoBIP62Sign(k, message, keypair)

    // rとsの値を出力
    process.stdout.write(signNoBIP62.r.toBuffer().toString('hex'));
    process.stdout.write('\n')
    process.stdout.write(signNoBIP62.s.toBuffer().toString('hex'));
  })
});

/**
 * BIP62を適応しないで署名を作成する
 * cf: https://github.com/yoursnetwork/yours-bitcoin/blob/master/lib/ecdsa.js#L320-L359
 */
function createNoBIP62Sign( k, hashBuf, keyPair ){
  let d = keyPair.privKey.bn
  let N = Point.getN()
  let G = Point.getG()
  let e = new Bn().fromBuffer(hashBuf)

  let Q, r, s
  do {
    Q = G.mul(k)
    r = Q.getX().mod(N)
    s = k.invm(N).mul(e.add(d.mul(r))).mod(N)
  } while (r.cmp(0) <= 0 || s.cmp(0) <= 0)

  return Sig.fromObject({r: r, s: s, compressed: keyPair.pubKey.compressed})
}