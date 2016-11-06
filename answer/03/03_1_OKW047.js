/**
 * Created by makinomasashi on 16/11/07.
 */
var num = Number.parseInt(require('fs').readFileSync('/dev/stdin'));
var abs = (num<0 ? -num : num);
Number.prototype.format = function() {
  return ('00' + this.toString(16)).substr(-2);
}
var print = function(a, b) {
  console.log(a.format() + ' ' + b.format());
}
// Sign magnitude.
var sm0 = (num<0 ? 1<<7 : 0) | (abs >> 8);
var sm1 = abs & 0xff;
print(sm0, sm1);
print(sm1, sm0);
// 2's complement.
var n = (num<0 ? 0x10000+num : num)
var tc0 = (n >> 8);
var tc1 = (n & 0xff);
print(tc0, tc1);
print(tc1, tc0);