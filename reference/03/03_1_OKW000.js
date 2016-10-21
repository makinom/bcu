let Readline  = require('readline')
let Hash      = require('yours-bitcoin/lib/hash')

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
  
  // マイナスの値かどうかチェック
    let isMinus = false
    if( input < 0 ) {
        isMinus = true
    }

    // 入力値がマイナスの場合正の数に変換
    if(isMinus){
        input = input * -1
    }

    // 入力値を2進数に変換
    binNum = parseInt(input).toString(2)

    // 桁数が8の倍数ではない場合、頭を0で埋める
    while( binNum.length % 8 != 0 || binNum.length < 16 ) {
        binNum = "0" + binNum
    }

    // マイナスの場合、binNumの先頭1bitを1に反転する(符号付絶対値用)
    let binAbs = binNum
    if( isMinus ) {
        binAbs = "1" + binAbs.substr(1)
    }
    
    // 補数を生成
    let binComplementNum = createComplement(binNum, isMinus)
    
    // それぞれ10進数に変換
    let num  = parseInt(binAbs,2)
    let cNum = parseInt(binComplementNum,2)
    
    // 2バイト、ビッグエンディアン、符号絶対値を取得
    let result1 = getOutputStr(num)
    
    // 2バイト、リトルエンディアン、符号絶対値を取得
    let result2 = getOutputStr(num, true)
    
    // 2バイト、ビッグエンディアン、2の補数表記
    let result3 = getOutputStr(cNum)
    
    // 2バイト、リトルエンディアン、2の補数表記
    let result4 = getOutputStr(cNum, true)
    
    process.stdout.write(result1);
    process.stdout.write('\n');
    process.stdout.write(result2);
    process.stdout.write('\n');
    process.stdout.write(result3);
    process.stdout.write('\n');
    process.stdout.write(result4);
});

function getOutputStr( num, little = false ) {
  let r = ""
  let h = parseInt(num).toString(16)

  // 桁数が2の倍数ではない場合、頭を0で埋める
  while( h.length % 2 != 0 || h.length < 4 ) {
      h = "0" + h
  }
  
  let a = h.match(/[\s\S]{1,2}/g);
  
  if( little ) {
    a.reverse()
  }
  
  for(var i = 0; i < a.length; i++) {
    r = r + a[i]
    if( ( i + 1 ) != a.length ) {
      r = r + " "
    }
  }
  return r
}

function createComplement( binNum, isMinus ) {
  let r = ""
  let s = binNum.split("")
  
  if( !isMinus ) {
    return binNum
  }
  
  s.forEach(function(data, index, array){
    if( data == 1 ) {
      r = r + "0"
    } else {
      r = r + "1"
    }
  })
  
  return (parseInt(r,2) + 1 ).toString(2)
}
