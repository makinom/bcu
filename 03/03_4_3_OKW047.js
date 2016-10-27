/**
 * Created by m_makino on 16/10/26.
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
  var input = line

  // 配列に追加
  dataArray.push(input)
});

// すべての行の読み込みが終わった後にメインの処理を実行
rl.on('close', function() {
  process.stdout.write(merkle_root (dataArray) + '\r\n');
});

function merkle_root (transactions){

  //再帰的に処理
  var calchash = function(trans){
    var newtrans=[];
    //transactionの件数が2件以上で奇数の場合は最後の値を追加して偶数個にする
    var len=trans.length;
    if(len>1 && len %2){
      trans.push(trans[len-1]);
    }

    //2つづつHashを連結して、そのHashを取得
    for(var i=0;i<len;i+=2){
      newtrans.push(doublehash(swap(trans[i])+swap(trans[i+1])));
    }
    //配列要素が1になるまで再帰処理
    return newtrans.length>1?calchash(newtrans):newtrans[0];
  }
  return calchash(transactions);
}

var hex2bin=function(hex){
  var bytes = [];

  for(var i=0; i< hex.length-1; i+=2){
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return String.fromCharCode.apply(String, bytes);
}

var swap=function(val,bytes){
  if(val.length%2){
    val="0"+val;
  }
  if(bytes && ((val.length /2) < bytes)){
    while((val.length/2)<bytes){
      val="00"+val;
    }
  }
  var s=val.split("").reverse();
  var x="";
  for (var i = 0; i < s.length; i+=2) {
    x+=s[i+1]+s[i];
  }
  return x;
}

//2回ハッシュ処理
var doublehash=function(data){
//  return swap(Hash.sha256(Buffer(
//    hex2bin(Hash.sha256(Buffer(hex2bin(data), 'hex')))
//    , 'hex'
//  )));

  return swap(Hash.sha256Sha256(Buffer(hex2bin(data), 'hex')).toString('hex'))
}