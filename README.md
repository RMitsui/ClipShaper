# ClipShaper

クリップボードにコピーされた文章から改行・ハイフネーションを除去するデスクトップアプリです．

改行・ハイフネーションを除去する[Shaper](https://dream-exp.net/shaper/)というWebアプリをデスクトップで使いたいなと思い開発しました．

デスクトップ版DeepLが入っていれば，論文等からCtrl+c→Ctrl+g→Ctrl+c*2でスムーズに翻訳できます．

はじめてのElectron．

## 実行ファイルの生成

`npm ci`

`electron-builder --win --x64`(win)

`electron-builder --win --x64`(mac)

## 使い方
起動するとWindowsではタスクトレイ，Macではメニューバーにアイコンが現れます．

Ctrl/cmd+gを押すと，現在クリップボードにコピーされている文章を整形してウィンドウに表示します．

整形された文章は全選択状態になっているので，DeepLが入っていればそのままCtrl/cmd+c*2を叩けば翻訳されます．

タスクトレイ/メニューバーのアイコンをクリックすると，ショートカットキーの有効/無効を切り替えられます(アイコンは現状変わりません)．
