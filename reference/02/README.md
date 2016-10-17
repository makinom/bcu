# BCCC 第2回課題

## 動作環境

* Nodejs(6.8.0)

## 課題1 ハッシュ計算

```
node 02_1_OKW000.js < txt/02_1_input.txt > txt/02_1_output.txt
diff -u txt/02_1_output.txt txt/02_1_answer.txt
```

* `yours-bitcoin`の`lib/hash`を使用
* ripemd160の変換は上記のライブラリに存在しないため`ripemd160`を使用

## 課題2 base58check

### 課題2a

```
node 02_2a_OKW000.js < txt/02_2a_input.txt > txt/02_2a_output.txt
diff -u txt/02_2a_output.txt txt/02_2a_answer.txt
```

* `yours-bitcoin`の`lib/base-58-check`を使用

### 課題2b

```
node 02_2b_OKW000.js < txt/02_2b_input.txt > txt/02_2b_output.txt
diff -u txt/02_2b_output.txt txt/02_2b_answer.txt
```

* `yours-bitcoin`の`lib/hash`,`lib/base-58`,`lib/base-58-check`を使用

## 課題3 楕円曲線暗号の鍵ペア

```
node 02_3_OKW000.js < txt/02_3_input.txt > txt/02_3_output.txt
diff -u txt/02_3_output.txt txt/02_3_answer.txt
```

* `ecurve`,`bigi`を使用
* yの値が偶数かどうか確かめるために`BigInteger`に変換してチェック

## 課題4 ECDSA

### 課題4a

```
node 02_4a_OKW000.js < txt/02_4a_input.txt > txt/02_4a_output.txt
diff -u txt/02_4a_output.txt txt/02_4a_answer.txt
```

* 署名の生成用に`createNoBIP62Sign`の関数を作成した。
`yours-bitcoin`の`ecdsa`のオブジェクトを作成し、`ecdsa.sign()`することで署名はできる。
ただし`yours-bitcoin`で署名する場合は必ず[BIP62](https://github.com/yoursnetwork/yours-bitcoin/blob/master/lib/ecdsa.js#L352-L356)に対応した形に`s`の値が整形される。
今回課題の出力例ではBIP62を適応しない場合の`s`が出力されているため、別途関数を用意した。

* 【参考】[BIP62のページ](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki)
`Status: Withdrawn`なので取り下げられているのか・・・な？

### 課題4b

```
node 02_4b_OKW000.js < txt/02_4b_input.txt > txt/02_4b_output.txt
diff -u txt/02_4b_output.txt txt/02_4b_answer.txt
```

* `r`と`s`のデータは`Big Number`に変換する
