let Readline = require('readline')
let Address  = require('yours-bitcoin/lib/address')
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
    
    // BIP32のオブジェクトを作成
    let bip32 = Bip32.fromString(data[0])
    
    // 派生パスを指定
    let path = data[1].replace(/’/g, "'")
    let derive = bip32.derive(path)
    
    // 拡張秘密鍵と拡張公開鍵を取得
    let xprv = derive.toString()
    let xpub = derive.toPublic().toString()
    
    // ビットコインアドレスのオブジェクトを生成
    let address = Address.fromPubKey(derive.pubKey)
    
    // 拡張秘密鍵と拡張公開鍵とビットコインアドレスを出力
    process.stdout.write(xprv);
    process.stdout.write("\n");
    process.stdout.write(xpub);
    process.stdout.write("\n");
    process.stdout.write(address.toString());
  })
});