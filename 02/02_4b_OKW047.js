/**
 * Created by makinomasashi on 16/10/18.
 */
let Readline = require('readline')
let Bn       = require('yours-bitcoin/lib/bn')
let Ecdsa    = require('yours-bitcoin/lib/ecdsa')
let PubKey   = require('yours-bitcoin/lib/pub-key')
let Sig      = require('yours-bitcoin/lib/sig')

let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

let index = 0
let dataArray = []
rl.on('line', function (line) {
  if( index != 0 && dataArray.length % 4 == 0 ) {
    index++;
  }

  let input = line.trim();

  if( dataArray[index] == undefined ) {
    dataArray[index] = []
  }
  dataArray[index].push(input)
});

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