# PC Status Client

## **⚠️ このレポジトリは非推奨です ⚠️**
**このレポジトリは[kazukazu123123/pcsc-rs](https://github.com/kazukazu123123/pcsc-rs)に移動されました。**

PCの状態を取得し，[PC Status](https://pc-stats.eov2.com/)に送信，表示するツールです。

![image](https://cdn.discordapp.com/attachments/963367800821395466/1021358299603537930/unknown.png)

## 注意
**ツールの性質上，以下の内容が他者に誰でも見られる状態で送信されるため，少しでも不快感を感じる人であれば使用しないでください。**\
個人情報に繋がるような情報は**ホスト名を除き**送信される事はありませんが，必要に応じてPCのホスト名を変更するか，或いは `.env` 内に以下のKeyを追加してください。

```env
HOSTNAME=ホスト名として表示させたい文字列
```

⚠️ **Node.jsのバージョンはv16からv18までのみ対応しています。** ⚠️

**このプロジェクトはCorepack([pnpm](https://github.com/pnpm/pnpm))を使用しています。**

## 送信，表示内容
1. PCのホスト名 (e.g. `assault-e5dmts`)
    - ホスト名に個人情報などが含まれている場合は使用しない事を**強く**推奨します。
    - 64文字まで受け付けますが，32文字目以降は ... で隠されます。\
      マウスオーバーで全て表示されます。
2. OSのバージョン (e.g. `Windows 10 Home(Windows_NT win32 x64 10.0.19044)`)
3. CPU名，CPU使用率 (全体, コアごと) (e.g. `AMD Ryzen 5 3500 6-Core Processor`)
4. メモリ使用量
5. ストレージ占有量 (実行しているrootを参照)
6. GPU使用率 (NVIDIAのGPUのみ)
7. 起動時間
8. Nodeのバージョン
9. Load Average (Linuxのみ)

## 使い方
___Dockerコンテナに入れても使えます!!(Linuxのみ)___
1. Node.js v16以上, gitをインストール
2. リポジトリを任意のディレクトリにクローン
3. `.env` ファイルを作成
4. スパム防止のため，予め [開発者のTwitter](https://twitter.com/c30_eo) にパスワードを聞く
5. パスワードを入手したら `.env` を以下のように編集

```env
PASS=ここに予め聞いたパスワードを入力
```
### これをやる前に

以下のコマンドを実行してください
```console
corepack enable npm yarn pnpm
```

6. 以下のコマンドを実行

```cmd
REM Windowsの場合
pnpm i
pnpm add -g pm2 pm2-windows-startup
pm2 start "pnpm node ." --name pcsc
pm2 save
pm2-startup install
```

```bash
# Linuxの場合
pnpm i
pnpm add -g pm2
pm2 start "pnpm node ." --name pcsc
pm2 save
pm2 startup
# sudo env PATH=...みたいなコマンドが出てくるのでコピペしてターミナルで実行
pm2 save
```

7. おわり

## アップデート方法

```console
git pull
pnpm i # パッケージのアップデートなどがあった場合
pm2 restart pcsc
```
