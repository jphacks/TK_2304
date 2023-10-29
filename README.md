# Camembert Chat (カマンベールチャット)

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2023/07/JPHACKS2023_ogp.png)](https://www.youtube.com/watch?v=yYRQEdfGjEg)

## 製品概要
### 背景 (製品開発のきっかけ、課題等）
私たちのチームは留学経験があります. 現地でたくさんの友達を作ろうとしましたが, アメリカ人とのやり取りはとても難しいものでした. どんどんと知らないスラングをたくさん連投されてしまい, 全く理解が追い付けませんでした. そんなとき, アメリカ人とのチャットを手助けしてくれるアプリを作りたく, 翻訳やサジェスチョン機能を持ったチャットを作りたいと考えるようになりました.

### 製品説明（具体的な製品の説明）
### 特長
#### 1. 特長1
翻訳と原文を一緒に表示してくれる. そのため, 理解が追い付かない場合は翻訳されたものを読み, 外国人とのチャットをスムーズにする手助けをしてくれます.
#### 2. 特長2
返信を書くのが億劫になってしまったり, いい返事が思いつかない場合, おすすめの返信を考えてくれます. この機能を使うことによって, 多言語の人とも円滑なやり取りをすることができます.

#### 3. 特長3
"fr"や"idk"などのスラングは今まで上手に翻訳することができませんでした. ここで, 私たちのプロダクトでは, これらのスラングに対し適切な翻訳をするようにしました.

### 解決出来ること
このプロダクトを利用することによって, 英語が母国語でない日本人が, 外国人とより自然でスムーズなコミュニケーションをとる手助けをしてくれ, コミュニティーに溶け込むハードルを大きく下げることが可能になります.

### 今後の展望
* 日本語以外の言語にも対応できるようにしたい
* スラング変更機能は, 変更できるスラングが少なかったり, 文中にあると上手に認識しなかったりするため, 対応スラング数を増やし, 文中にあるスラングにも適切に対応できるようにしたい.
* widthの狭い端末 (スマートフォンなど) ではレイアウトが崩れてしまいます. これらを解決できるようにしたい.

### 注力したこと（こだわり等）
* シンプルで, わかりやすいデザインのアプリを作りました.
* 自動おすすめシステムで, 今までにないより使いやすいチャットアプリを作りました.

## 開発技術
### 活用した技術
#### API・データ
* ChatGPT API
* Cloud Translation API

#### フレームワーク・ライブラリ・モジュール
* Firebase
* React

#### デバイス
* Webブラウザ
* npm version 10.1.0
* Python 3.10.12

### 独自技術
#### ハッカソンで開発した独自機能・技術
* [翻訳機能](./camembert-chat/src/components/SendMessage.js)
* [おすすめ返信提案機能](./camembert-chat/src/components/MessageSuggestion.js)

## 実行方法
### 環境
* OS: Ubuntu 22.04 or Windows 11 22H2 or Mac OS Monterey 12.6.7
* npm version 10.1.0
* Python 3.10.12
* git version 2.34.1

### 必要なAPI key
* [Chat GPT API key](https://openai.com/product)
* [Cloud Translation API key](https://cloud.google.com/translate)

### 手順
1. 以下のコマンドで, このレポジトリをクローンする.
```bash
git clone https://github.com/jphacks/TK_2304.git
```

2. API keyのファイルを用意する. 指示に従って先の手順で入手したAPI keyを記入する.
```bash
python apikey.py
```
or
```bash
python3 apikey.py
```

以下のようにAPI keyを入力してください.
```bash
Please input your ChatGPT API key: !!!INPUT YOUR API KEY!!!
Please input your Cloud Translation API key: !!!INPUT YOUR API KEY!!!
```

3. ディレクトリを`camembert-chat`に変更する.
```bash
cd camembert-chat
```

4. ライブラリをインストールする.
```bash
npm install
```

5. フロントエンドサーバーを立てる.
```bash
npm start
```
## デモ動画
[https://youtu.be/DvdBOnqdsJY](デモ動画へのリンク)
