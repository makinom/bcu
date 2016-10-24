/**
 * Created by makinomasashi on 16/10/23.
 */
var Readline = require('readline')
var Hash     = require('yours-bitcoin/lib/hash')

// 標準入力を受け取る
var rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ配列に入れて値を取得する
var index = 0
var dataArray = []
rl.on('line', function (line) {
  // 入力文字列から改行を削除
  var input = line.replace(/\r?\n/g,"")

  // 配列に追加
  dataArray.push(input)
});

// すべての行の読み込みが終わった後にメインの処理を実行
rl.on('close', function() {
  // 配列の要素数が奇数だった場合最後の値を複製
  var a = arrayToEvenNumber(dataArray)

  // 配列の要素をLEに変換
  for( var i = 0; i < a.length; i++ ) {
    a[i] = reverseEndian(a[i])
  }

  // マークルツリーを計算する
  var hash1 = ''
  var hash2 = ''
  var r     = []
  while( a.length > 0 ) {
    hash1 = a[0]
    hash2 = a[1]
    r.push(Hash.sha256Sha256(Buffer(hash1 + hash2, 'hex')).toString('hex'))
    a.splice(0, 2)
    if( a.length == 0 && r.length > 1 ) {
      a = arrayToEvenNumber(r)
      r = []
    }
  }

  // リトルエンディアンにしてマークル・ルートを出力
  process.stdout.write(reverseEndian(r[0].toString('hex')));
});

/**
 * 配列が奇数の場合に一番最後の要素をコピーして偶数にする
 */
function arrayToEvenNumber(array) {
  if( array.length % 2 != 0 ) {
    array.push(array[array.length -1])
  }
  return array
}

/**
 * エンディアンを逆にする
 */
function reverseEndian( hex ) {
  // 桁数が2の倍数ではない場合、頭を0で埋める
  while( hex.length % 2 != 0 ) {
    hex = "0" + hex
  }

  var r = ""
  var a = hex.match(/[\s\S]{1,2}/g);
  a.reverse()

  for(var i = 0; i < a.length; i++) {
    r = r + a[i]
  }
  return r
}