# 自分的最強家計簿

Googleフォーム、Googleスプレッドシート、LINEで管理する自分的最強家計簿ソフトです

LINE BOTに科目ごと話しかけると現在の状態（本日支出額、１ヶ月合計、１日平均、１週間平均、今月予測）とグラフのURLを教えてくれます

![line_bot_sample](./images/line_bot.png)

![graph_sample](./images/graph.png)

## 環境構築

### Googleフォームを作成する

画像のような感じでGoogleフォームを作成します

![google_form_sample](./images/google_form.png)

科目は画像のようなリストで作ると良いでしょう

![google_form_subject_sample](./images/google_form_subject.png)


### Googleスプレッドシートを作成する

#### Googleフォームの回答結果を受け取るシートを作成する

Googleフォームの回答結果を書き出すGoogleスプレッドシートを作成します  
Googleフォーム作成画面の回答内のGoogleスプレッドシートのアイコンをクリックすることで作成することができます

![google_form_to_spread_sheet_create_sample](./images/google_form_to_spread_sheet_create.png)

作成すると自動的にGoogleスプレッドシートが表示されます  
Sheet名を `フォームの回答` に変更しておいてください

![google_spread_sheet_initial_sample](./images/google_spread_sheet_initial.png)

#### Googleフォームの回答結果を補正するシートを作成する

新しくシートを作成しシート名は `家計簿補正` にしてください  
そのシートには下記のように値をセットしておいてください

```
=IF(C2="","",DATE(YEAR(C2),MONTH(C2),1))
```

|   |           A           |           B           |           C           |           D           |           E           |           F           |     G     |
|:-:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:---------:|
| 1 | ='フォームの回答'!$A1 | ='フォームの回答'!$B1 | ='フォームの回答'!$C1 | ='フォームの回答'!$D1 | ='フォームの回答'!$E1 | ='フォームの回答'!$F1 | 日付補正  |
