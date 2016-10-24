/**
 * Created by makinomasashi on 16/10/22.
 */
var Readline    = require('readline')
var BlockHeader = require('yours-bitcoin/lib/block-header')
var Hash        = require('yours-bitcoin/lib/hash')

var input = "0100000000000000000000000000000000000000000000000000000000000000000000003BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A29AB5F49FFFF001D00000000"
var blockHeader = BlockHeader.fromHex(input)

var nonce = 0
var blockHeaderHash = ''
var buf = new Buffer(2)
while(true) {

  blockHeader.nonce = nonce
//  blockHeaderHash = Hash.sha256Sha256(blockHeader.toBuffer()).toString('hex')
//  blockHeaderHash = Hash.sha256Sha256(blockHeader.toBuffer()).toString('hex')
  //console.log(blockHeaderHash)

//  buf.writeInt16LE(blockHeaderHash,0)
//  console.log(blockHeader.merkleRootBuf.readInt16LE(0))
  if (nonce == 8603) {
    console.log(blockHeader)
    break
  }
  nonce++
}

/*
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

rl.on('line', function (line) {

})
*/