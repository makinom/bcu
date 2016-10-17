# BCCC ��2�����

## ư��Ķ�

* Nodejs(6.8.0)

## ����1 �ϥå���׻�

```
node 02_1_OKW000.js < txt/02_1_input.txt > txt/02_1_output.txt
diff -u txt/02_1_output.txt txt/02_1_answer.txt
```

* `yours-bitcoin`��`lib/hash`�����
* ripemd160���Ѵ��Ͼ嵭�Υ饤�֥���¸�ߤ��ʤ�����`ripemd160`�����

## ����2 base58check

### ����2a

```
node 02_2a_OKW000.js < txt/02_2a_input.txt > txt/02_2a_output.txt
diff -u txt/02_2a_output.txt txt/02_2a_answer.txt
```

* `yours-bitcoin`��`lib/base-58-check`�����

### ����2b

```
node 02_2b_OKW000.js < txt/02_2b_input.txt > txt/02_2b_output.txt
diff -u txt/02_2b_output.txt txt/02_2b_answer.txt
```

* `yours-bitcoin`��`lib/hash`,`lib/base-58`,`lib/base-58-check`�����

## ����3 �ʱ߶����Ź�θ��ڥ�

```
node 02_3_OKW000.js < txt/02_3_input.txt > txt/02_3_output.txt
diff -u txt/02_3_output.txt txt/02_3_answer.txt
```

* `ecurve`,`bigi`�����
* y���ͤ��������ɤ����Τ���뤿���`BigInteger`���Ѵ����ƥ����å�

## ����4 ECDSA

### ����4a

```
node 02_4a_OKW000.js < txt/02_4a_input.txt > txt/02_4a_output.txt
diff -u txt/02_4a_output.txt txt/02_4a_answer.txt
```

* ��̾�������Ѥ�`createNoBIP62Sign`�δؿ������������
`yours-bitcoin`��`ecdsa`�Υ��֥������Ȥ��������`ecdsa.sign()`���뤳�Ȥǽ�̾�ϤǤ��롣
������`yours-bitcoin`�ǽ�̾�������ɬ��[BIP62](https://github.com/yoursnetwork/yours-bitcoin/blob/master/lib/ecdsa.js#L352-L356)���б���������`s`���ͤ���������롣
�������ν�����Ǥ�BIP62��Ŭ�����ʤ�����`s`�����Ϥ���Ƥ��뤿�ᡢ���Ӵؿ����Ѱդ�����

* �ڻ��͡�[BIP62�Υڡ���](https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki)
`Status: Withdrawn`�ʤΤǼ�겼�����Ƥ���Τ��������ʡ�

### ����4b

```
node 02_4b_OKW000.js < txt/02_4b_input.txt > txt/02_4b_output.txt
diff -u txt/02_4b_output.txt txt/02_4b_answer.txt
```

* `r`��`s`�Υǡ�����`Big Number`���Ѵ�����
