let Readline = require('readline')
let Bip39    = require('yours-bitcoin/lib/bip-39')
let Bip32    = require('yours-bitcoin/lib/bip-32')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 2行ずつ配列に入れて値を取得する
let index = 0
let dataArray = []
rl.on('line', function (line) {
  if( index != 0 && dataArray.length % 4 == 0 ) {
    index++;
  }
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
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
    
    // BIP39のオブジェクトを作成
    let bip39 = Bip39.fromString(data[0])
    
    // ニーモニックとパスフレーズからシードを作成
    bip39.mnemonic2Seed(data[1])
    let seed = bip39.seed;
    
    // SeedからBIP32のオブジェクトを作成
    let bip32 = Bip32.fromSeed(seed)
    
    // マスタ鍵を出力
    process.stdout.write(bip32.toString());
  })
});