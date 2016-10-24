/**
 * Created by makinomasashi on 16/10/23.
 */
var Readline = require('readline')
var Hash     = require('yours-bitcoin/lib/hash')

// ɸ�����Ϥ�������
var rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1�Ԥ��������������ͤ��������
var index = 0
var dataArray = []
rl.on('line', function (line) {
  // ����ʸ���󤫤���Ԥ���
  var input = line.replace(/\r?\n/g,"")

  // ������ɲ�
  dataArray.push(input)
});

// ���٤ƤιԤ��ɤ߹��ߤ�����ä���˥ᥤ��ν�����¹�
rl.on('close', function() {
  // ��������ǿ���������ä����Ǹ���ͤ�ʣ��
  var a = arrayToEvenNumber(dataArray)

  // ��������Ǥ�LE���Ѵ�
  for( var i = 0; i < a.length; i++ ) {
    a[i] = reverseEndian(a[i])
  }

  // �ޡ�����ĥ꡼��׻�����
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

  // ��ȥ륨��ǥ�����ˤ��ƥޡ����롦�롼�Ȥ����
  process.stdout.write(reverseEndian(r[0].toString('hex')));
});

/**
 * ���󤬴���ξ��˰��ֺǸ�����Ǥ򥳥ԡ����ƶ����ˤ���
 */
function arrayToEvenNumber(array) {
  if( array.length % 2 != 0 ) {
    array.push(array[array.length -1])
  }
  return array
}

/**
 * ����ǥ������դˤ���
 */
function reverseEndian( hex ) {
  // �����2���ܿ��ǤϤʤ���硢Ƭ��0������
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