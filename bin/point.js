'use strict'
let BN = require('fullnode/lib/bn')
let Point = require('fullnode/lib/point')

let x = BN(5)
let point = Point.fromX(true, x)
console.log(point.getX().toString(), point.getY().toString())

let x2 = BN(6)
let point2 = Point.fromX(true, x2)
console.log(point2.getX().toString(), point2.getY().toString())

let point3 = point.add(point2)
console.log(point3.getX().toString(), point3.getY().toString())

let x4 = BN(6)
let point4 = point3.mul(x4)
console.log(point4.getX().toString(), point4.getY().toString())

let G = Point.getG()
let privkeybn = BN(6)
let pubkeypoint = G.mul(privkeybn)
console.log(pubkeypoint.getX().toString(), pubkeypoint.getY().toString())
