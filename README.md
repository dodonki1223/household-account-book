# サーバーレスで作成する自分だけの最強家計簿BOT

Googleフォーム、Googleスプレッドシート、LINE BOTで管理するサーバーレス家計簿です

![Diagram](./images/diagram.png)  

Icons make by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/)

# 概要

動作確認用に家計簿BOTを公開しているのでもしよかったら友達登録してみて動作を確認してみてください

| <a href="https://line.me/R/ti/p/%40396dkaje"><img height="36" border="0" alt="友だち追加" src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"></a> | <img height="150" border="0" alt="add_line_bot" src="images/add_line_bot.png"> |
|:---:|:---:|

## Googleフォーム

Googleフォームは家計簿にデータを登録するために使用します  
入力したデータはGoogleスプレッドシートへと格納されていきます

<img alt="google_form_sample" src="./images/overview/google_form/google_form_sample.png" width="500px">

## Googleスプレッドシート

Googleスプレッドシートではいくつかのシートがあります

### フォームの回答

`フォームの回答` シートではGoogleフォームから入力されたデータを格納します

![input_data_sample](./images/overview/google_spread_sheet/input_data_sample.png)

### 家計簿補正

`家計簿補正` シートは `フォームの回答` シートのデータを補正するためのシートです  
日の入力データを元にどの月に入力されたかを判断しています  
日付補正列が追加されていてそこで判断をしています

![input_data_correction_sample](./images/overview/google_spread_sheet/input_data_correction_sample.png)

### 今月

`今月` シートは `家計簿補正` シートを元に今月の支出を科目ごとまとめたシートになります

![this_month_sample](./images/overview/google_spread_sheet/this_month_sample.png)

### 先月

`先月` シートは `家計簿補正` シートを元に先月の支出を科目ごとまとめたシートになります  
`今月` シートとの違いは `今月料金予測` 、`先月費差異` の項目がない、グラフが無いになります。ほんとんど`今月` シートと同じです

![last_month_sample](./images/overview/google_spread_sheet/last_month_sample.png)

### 月集計

`月集計` シートは `家計簿補正` シートを元に月ごとの集計結果を算出しています

![monthly_aggregation_sample](./images/overview/google_spread_sheet/monthly_aggregation_sample.png)

### 設定

`設定` シートはLINE BOTで入力テンプレートを取得する際に使用するシートとなります  
詳しくはLINE BOTの方で説明します

![setting_sample](./images/overview/google_spread_sheet/setting_sample.png)

## LINE BOT

LINE BOT画面の下部のメニューを押すことによりいろいろな機能を使用することができます  
表示される内容についてはGoogleスプレッドシートの `今月` シートの内容を通知するようになっています

### 科目毎の結果

上の段の左の `科目毎の結果` をクリックすると科目選択のボタンメニュー上に表示されます  
科目のボタンをクリックするとその科目の今月の結果を確認することができます

<img alt="line_choose_subject1" src="./images/overview/line_bot/line_choose_subject1.png" width="500px">

画像では食費の結果を確認している所です

<img alt="line_choose_subject2" src="./images/overview/line_bot/line_choose_subject2.png" width="500px">

グラフの設定をしている場合はリンクが表示されクリックすると下記のように表示されます

![line_food_expenses_chart](./images/overview/line_bot/line_food_expenses_chart.png)

### 今月の支出状況

上の段の真ん中の `今月の支出状況` をクリックすると今月の使用状況が表示されます（ただし固定費項目は除く）

<img alt="line_this_month_status" src="./images/overview/line_bot/line_this_month_status.png" width="500px">

### 家計簿へ

上の段の右の `家計簿へ` をクリックすると `今月` シートへのリンクが表示されます

<img alt="line_household_account_book_link" src="./images/overview/line_bot/line_household_account_book_link.png" width="500px">

### 入力

下の段の左の `入力` をクリックすると入力用のテンプレートが表示されます  
このテンプレートの一覧はGoogleスプレッドシートの `設定` シートに設定されている `入力テンプレート` から表示されます

<img alt="lien_input1" src="./images/overview/line_bot/lien_input1.png" width="500px">

入力テンプレート例

![line_setting_sheet_input_template](./images/overview/line_bot/line_setting_sheet_input_template.png)

入力テンプレート名をクリックするとGoogleフォームへのURLが表示されます  

テンプレート名の `昼食` を選択した場合は入力者が `どどんき` 、日が `2019-11-23` 、科目が `食費` 、備考が `昼食` で入力された状態のGoogleフォームへのURLが表示されます

<img alt="line_input2" src="./images/overview/line_bot/line_input2.png" width="500px">

### 固定費入力

下の段の真ん中の `固定費入力` をクリックすると固定費入力用のテンプレートが表示されます  
このテンプレートの一覧はGoogleスプレッドシートの `設定` シートに設定されている `固定費入力テンプレート` から表示されます

<img alt="line_fixed_cost_input1" src="./images/overview/line_bot/line_fixed_cost_input1.png" width="500px">

入力テンプレート例

![line_setting_sheet_fixed_cost_input_template](./images/overview/line_bot/line_setting_sheet_fixed_cost_input_template.png)

入力テンプレート名をクリックするとGoogleフォームへのURLが表示されます 
基本的に `入力` メニューの機能と一緒で対象が固定費になっているだけです

### ヘルプ

下の段の右の `ヘルプ` をクリックするとこのLINE BOTの使い方が表示されます  
メニューを使わず話しかける時はヘルプに書かれている通りにするとLINE BOTが答えてくれます

<img alt="line_help" src="./images/overview/line_bot/line_help.png" width="500px">

# 環境構築

## Googleフォームを作成する

画像のような感じでGoogleフォームを作成します

<img alt="google_form" src="./images/environment/google_form/google_form.png" width="500px">

### 入力者のリストを設定

夫婦などで管理する場合に入力者を設定するとよいでしょう  
独り身の自分は自分の名前だけ設定しています

### 科目のリストを設定

科目は下記のようなリストで作ると良いでしょう  
特に決まりは無いので好きに作ってもらってよいです  
※変更する場合は一部プログラムを修正する必要があります

- 通常科目
  - 食費
  - 日用品
  - 医療費
  - 交際費
  - 洋服代
  - 娯楽費
  - 雑費
- 固定費
  - 住居費
  - 借金返済
  - 通信費
  - 保険料
  - 水道光熱費
  - 交通費
- 収入科目
  - 給与
  - 雑収入

<img alt="google_form_subject_list" src="./images/environment/google_form/google_form_subject_list.png" width="500px">

## Googleスプレッドシートを作成する

Googleスプレッドシート内に作成するシートは下記の通りです

1. フォームの回答
2. 家計簿補正
3. 今月
4. 先月
5. 月集計
6. 設定

### フォームの回答シートを作成

Googleフォームの回答結果を書き出すGoogleスプレッドシートを作成します  
Googleフォーム作成画面の回答内のGoogleスプレッドシートのアイコンをクリックすることで作成することができます

![google_form_to_spread_sheet_create](./images/environment/google_spread_sheet/google_form_to_spread_sheet_create.png)

作成すると自動的にGoogleスプレッドシートが表示されます  
Sheet名を `フォームの回答` に変更しておいてください  

![google_spread_sheet_initial](./images/environment/google_spread_sheet/initial.png)

この段階でGoogleスプレッドシートも自動で作成されます

### 家計簿補正シートを作成

新しくシートを作成しシート名は `家計簿補正` にしてください  
そのシートには下記のように値をセットしておいてください

|   |           A           |           B           |           C           |           D           |           E           |           F           |     G                                                            |
|:-:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:---------------------:|:----------------------------------------------------------------:|
| 1 | ='フォームの回答'!$A1 | ='フォームの回答'!$B1 | ='フォームの回答'!$C1 | ='フォームの回答'!$D1 | ='フォームの回答'!$E1 | ='フォームの回答'!$F1 | =IF(ROW()=1,"日付補正",IF(C1="","",DATE(YEAR(C1),MONTH(C1),1)))  |

下記のようになっていればOKです

![google_spread_sheet_correction](./images/environment/google_spread_sheet/correction.png)

### 家計簿のスクリプトをGoogleスプレッドシートに反映させる

下記のファイルをスクリプトエディタにて追加してください  
`_Config.gs` ファイルは `Config.gs` にリネームしてください

| ファイル名                                                                                                                 | 説明                                           |
|:---------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------|
| [Bot.gs](https://github.com/dodonki1223/household-account-book/blob/master/Bot.gs)                                         | LINEにメッセージを送る機能                     |
| [Chart.gs](https://github.com/dodonki1223/household-account-book/blob/master/Chart.gs)                                     | グラフ機能を提供する                           |
| [Message.gs](https://github.com/dodonki1223/household-account-book/blob/master/Message.gs)                                 | メッセージを作成する機能                       |
| [MonthlyAggregationSheet.gs](https://github.com/dodonki1223/household-account-book/blob/master/MonthlyAggregationSheet.gs) | 月集計シートからデータを取得する機能           |
| [Open.gs](https://github.com/dodonki1223/household-account-book/blob/master/Open.gs)                                       | 最新状態を家計簿補正シートに反映させる機能     |
| [SettingSheet.gs](https://github.com/dodonki1223/household-account-book/blob/master/SettingSheet.gs)                       | LINE BOT用の設定シート                         |
| [Sheet.gs](https://github.com/dodonki1223/household-account-book/blob/master/Sheet.gs)                                     | シート全体に共通する機能                       |
| [ThisMonthSheet.gs](https://github.com/dodonki1223/household-account-book/blob/master/ThisMonthSheet.gs)                   | 今月シートからデータを取得する機能             |
| [Tool.gs](https://github.com/dodonki1223/household-account-book/blob/master/Tool.gs)                                       | 家計簿で使用する汎用的なメソッドをまとめたもの |
| [_Config.gs](https://github.com/dodonki1223/household-account-book/blob/master/Config.gs)                                  | 家計簿の設定ファイル                           |

### GoogleフォームとGoogleスプレッドシートが連携されているか確認する

作成したGoogleフォームを使って回答してみます  
回答結果がフォームの回答シートに追加されていることを確認しましょう

![google_spread_sheet_answer](./images/environment/google_spread_sheet/answer.png)

家計簿補正シートに回答結果を反映させるため  
追加機能メニューの `フォームの回答データをコピー` をクリックしてください

![google_spread_sheet_answer_copy](./images/environment/google_spread_sheet/answer_copy.png)

`承認が必要` というウィンドウが出た時は 
- `続行` ボタンをクリック
- 対象のアカウントを選択
- このアプリは確認されていません画面で `詳細` をクリック `一番下のリンク` をクリック
- `許可` ボタンをクリック

無事、回答データがコピーされました

![google_spread_sheet_answer_copy_result](./images/environment/google_spread_sheet/answer_copy_result.png)

これで家計簿ファイルを開くたび、LINE BOTを実行するたびに家計簿補正シートが更新されるようになります  
なぜかAndroidでGoogleスプレッドシートを開くと`onOpen`関数が実行されないようです:thinking:

### 今月シートを作成

新しくシートを作成しシート名は `今月` にしてください  
作成するシートの中身は下記画像のような感じです

![google_spread_sheet_this_month_sample](./images/environment/google_spread_sheet/this_month_sample.png)

#### T、U列に値をセット

![google_spread_sheet_this_month_settings](./images/environment/google_spread_sheet/this_month_settings.png)

下記のように値をセットし上記画像のようになればOKです

<table>
  <tr>
    <td></td>
    <td align="center">T</td>
    <td align="center">U</td>
  </tr>
  <tr>
    <td>1</td>
    <td colspan="2" align="center">設定</td>
  </tr>
  <tr>
    <td>2</td>
    <td>年</td>
    <td>=YEAR(EDATE(TODAY(), U5))</td>
  </tr>
  <tr>
    <td>3</td>
    <td>月</td>
    <td>=MONTH(EDATE(TODAY(), U5))</td>
  </tr>
  <tr>
    <td>4</td>
    <td>日</td>
    <td>=IF(U3=MONTH(TODAY()),DAY(TODAY()),DAY(DATE(U2,U3+1,0)))</td>
  </tr>
  <tr>
    <td>5</td>
    <td>差</td>
    <td>0</td>
  </tr>
</table>

#### A列（日付列）に値をセット

A列には日付けを求める関数をセットします  
月によっては31日までないものもあるのでその対応で日付けを取得できなかったら空になるようになっています

```
=IF(DAY(DATE($S$2,$S$3,ROW()-1))=ROW()-1,DATE($S$2,$S$3,ROW()-1),"")
```

#### B列（曜日列）に値をセット

B列には日付けから曜日を求める関数をセットします  
例としては下記のような値です

```
=TEXT(A2,"dddd")
```

#### C〜I列（通常科目列）、K〜P列（固定費科目列）に値をセット

C〜I列、K〜P列には家計簿補正シートから日付けごと、科目ごとの集計を計算する関数をセットします  
例としては下記のような値です

```
=IF(`$A2`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A2`,'家計簿補正'`!$D$2:$D$30992`,`C$1`))
```

#### J列（通常科目の合計列）に値をセット

J列には通常科目の合計値を求める関数をセットします  
例としては下記のような値です

```
=IF($A2="","",SUM(C2:I2))
```

#### Q列（固定費科目の合計列）に値をセット

Q列には固定費科目の合計値を求める関数をセットします 
例としては下記のような値です

```
=IF($A2="","",SUM(K2:P2))
```

#### R列（総合計列）に値をセット

R列には通常科目の合計と固定費科目の合計値をセットしてください  
例としては下記のような値です

```
=J2+Q2
```

#### 合計行に値をセット

合計行には１ヶ月の合計値を求める関数をセットしてください  
例としては下記のような値です

```
=SUM(C1:C32)
```

#### １日平均行に値をセット

１日平均行には１日に使用している平均値を求める関数をセットしてください  
`$U$4` には月初から現在までの日数が求められています  
例としては下記のような値です

```
=SUM(C2:C32)/$U$4 
```

#### １週間平均行に値をセット

１週間平均行には１週間で使用している平均値を求める関数をセットしてください  
実際には `１日平均 x 7` をしているだけです
例としては下記のような値です

```
=C34 * 7
```

#### 今月料金予測行に値をセット

今月料金予測行には今月の合計値の予測値を求める関数をセットしてください  
実際には `１日平均 x 月数` をしているだけです
例としては下記のような値です

```
=C34*DAY(EOMONTH(TODAY(),0))
```

#### 先月費差異行に値をセット

先月費差異行には先月の合計値と今月料金予測の値を差し引きし先月に比べて今月がどうかを求める関数をセットしてください  
この状態だと `先月` シートはまだ作成していないので正しい値はでません  
例としては下記のような値です

```
=C36-'先月'!C33
```

#### 最終的な値

下記のような表と同じ値になっていればOKです

|     | A                                                                            | B                | C                                                                                                                             | …… | J                              | K                                                                                                                             | …… | Q                              | R                              |
|:---:|:----------------------------------------------------------------------------:|:----------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:----:|:------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:----:|:------------------------------:|:------------------------------:|
|  1  | 日付                                                                         | 曜日             | 食費                                                                                                                          | …… | 合計                           | 住居費                                                                                                                        | …… | 固定費合計                     | 総合計                         |
|  2  | =IF(DAY(DATE(`$S$2`,`$S$3`,ROW()-1))=ROW()-1,DATE(`$S$2`,`$S$3`,ROW()-1),"") | =TEXT(A2,"dddd") | =IF(`$A2`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A2`,'家計簿補正'`!$D$2:$D$30992`,`C$1`)) | …… | =IF(`$A2`="","",SUM(`C2:I2`))  | =IF(`$A2`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A2`,'家計簿補正'`!$D$2:$D$30992`,`K$1`)) | …… | =IF(`$A2`="","",SUM(`K2:P2`))  | =J2+Q2                         |
|  3  | =IF(DAY(DATE(`$S$2`,`$S$3`,ROW()-1))=ROW()-1,DATE(`$S$2`,`$S$3`,ROW()-1),"") | =TEXT(A3,"dddd") | =IF(`$A3`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A3`,'家計簿補正'`!$D$2:$D$30992`,`C$1`)) | …… | =IF(`$A3`="","",SUM(`C3:I3`))  | =IF(`$A3`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A3`,'家計簿補正'`!$D$2:$D$30992`,`K$1`)) | …… | =IF(`$A3`="","",SUM(`K3:P3`))  | =J3+Q3                         |
|  4  | =IF(DAY(DATE(`$S$2`,`$S$3`,ROW()-1))=ROW()-1,DATE(`$S$2`,`$S$3`,ROW()-1),"") | =TEXT(A4,"dddd") | =IF(`$A4`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A4`,'家計簿補正'`!$D$2:$D$30992`,`C$1`)) | …… | =IF(`$A4`="","",SUM(`C4:I4`))  | =IF(`$A4`="","",SUMIFS('家計簿補正'`!$E$2`:`$E$30992`,'家計簿補正'`!$C$2:$C$30992`,`$A4`,'家計簿補正'`!$D$2:$D$30992`,`K$1`)) | …… | =IF(`$A4`="","",SUM(`K4:P4`))  | =J4+Q4                         |
| ……|  ……                                                                        | ……             | ……                                                                                                                          | …… | ……                           | ……                                                                                                                          | …… | ……                           | ……                           |
| 33  |                                                                              | 合計             | =SUM(C1:C32)                                                                                                                  | …… | =SUM(J1:J32)                   | =SUM(K1:K32)                                                                                                                  | …… | =SUM(Q1:Q32)                   | =SUM(R1:R32)                   |
| 34  |                                                                              | １日平均         | =SUM(C2:C32)/$U$4                                                                                                             | …… | =SUM(J2:J32)/$U$4              | =SUM(K2:K32)/$U$4                                                                                                             | …… | =SUM(Q2:Q32)/$U$4              | =SUM(R2:R32)/$U$4              |
| 35  |                                                                              | １週間平均       | =C34 * 7                                                                                                                      | …… | =J34 * 7                       | =K34 * 7                                                                                                                      | …… | =Q34 * 7                       | =R34 * 7                       |
| 36  |                                                                              | 今月料金予測     | =C34 * DAY(EOMONTH(TODAY(),0))                                                                                                | …… | =J34 * DAY(EOMONTH(TODAY(),0)) | =K34 * DAY(EOMONTH(TODAY(),0))                                                                                                | …… | =Q34 * DAY(EOMONTH(TODAY(),0)) | =R34 * DAY(EOMONTH(TODAY(),0)) |
| 37  |                                                                              | 先月費差異       | =C36-'先月'!C33                                                                                                               | …… | =J36-'先月'!J33                | =K36-'先月'!K33                                                                                                               | …… | =Q36-'先月'!Q33                | =R36-'先月'!R33                |

#### グラフを追加する

下記のような感じで科目ごとのグラフを追加します  
全部設定する必要はなく、自分が欲しいものだけ追加すると良いでしょう

![/graphs](./images/environment/google_spread_sheet/graphs.png)

グラフを追加したらURLの公開設定を行います  
グラフの右上をクリックして `グラフを公開` を押しリンクで設定します

![graph_release](./images/environment/google_spread_sheet/graph_release.png)

### 先月シートを作成

`今月` シートをコピーしシート名を `先月` にしてください  
コピーし終わったら下記作業を行ってください

- `先月費差異` 行の削除（必要ないので削除）
- グラフの削除（必要ないので削除）
- U5の `差` の値に `-1` をセットしてください

これで `先月` シートの作成は完了です

### 月集計シートを作成

新しくシートを作成しシート名は `月集計` にしてください  
作成するシートの中身は下記画像のような感じです  

![monthly_aggregation_sample](./images/overview/google_spread_sheet/monthly_aggregation_sample.png)

下記のような表と同じ値になっていればOKです

|     | A          | B                 | C                 | D                 | F                                                                                                               | …… | S                                                                                                            | …… |
|:---:|:----------:|:-----------------:|:-----------------:|:-----------------:|:---------------------------------------------------------------------------------------------------------------:|:----:|:------------------------------------------------------------------------------------------------------------:|:----:|
|  1  |            | 月収入            | 月支出            | 月固定費支出      | 食費                                                                                                            | …… | 給与                                                                                                         | …… |
|  2  | 2019/11/01 | =SUM(`$S2:$T2`)   | =SUM(`$F2:$L2`)   | =SUM(`$M2:$R2`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A2`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A2`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  3  | 2019/12/01 | =SUM(`$S3:$T3`)   | =SUM(`$F3:$L3`)   | =SUM(`$M3:$R3`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A3`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A3`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  4  | 年合計     | =SUM(B2:B3)       | =SUM(C2:C3)       | =SUM(D2:D3)       | =SUM(F2:F3)                                                                                                     | …… | =SUM(S2:S3)                                                                                                  | …… |
|  5  | 2020/01/01 | =SUM(`$S5:$T5`)   | =SUM(`$F5:$L5`)   | =SUM(`$M5:$R5`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A5`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A5`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  6  | 2020/02/01 | =SUM(`$S6:$T6`)   | =SUM(`$F6:$L6`)   | =SUM(`$M6:$R6`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A6`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A6`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  7  | 2020/03/01 | =SUM(`$S7:$T7`)   | =SUM(`$F7:$L7`)   | =SUM(`$M7:$R7`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A7`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A7`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  8  | 2020/04/01 | =SUM(`$S8:$T8`)   | =SUM(`$F8:$L8`)   | =SUM(`$M8:$R8`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A8`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A8`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
|  9  | 2020/05/01 | =SUM(`$S9:$T9`)   | =SUM(`$F9:$L9`)   | =SUM(`$M9:$R9`)   | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A9`,'家計簿補正'`!$D$2:$D$30992`,`F$1`)  | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A9`,'家計簿補正'`!$D$2:$D$30992`,`S$1`)  | …… |
| 10  | 2020/06/01 | =SUM(`$S10:$T10`) | =SUM(`$F10:$L10`) | =SUM(`$M10:$R10`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A10`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A10`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 11  | 2020/07/01 | =SUM(`$S11:$T11`) | =SUM(`$F11:$L11`) | =SUM(`$M11:$R11`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A11`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A11`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 12  | 2020/08/01 | =SUM(`$S12:$T12`) | =SUM(`$F12:$L12`) | =SUM(`$M12:$R12`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A12`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A12`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 13  | 2020/09/01 | =SUM(`$S13:$T13`) | =SUM(`$F13:$L13`) | =SUM(`$M13:$R13`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A13`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A13`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 14  | 2020/10/01 | =SUM(`$S14:$T14`) | =SUM(`$F14:$L14`) | =SUM(`$M14:$R14`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A14`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A14`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 15  | 2020/11/01 | =SUM(`$S15:$T15`) | =SUM(`$F15:$L15`) | =SUM(`$M15:$R15`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A15`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A15`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 16  | 2020/12/01 | =SUM(`$S16:$T16`) | =SUM(`$F16:$L16`) | =SUM(`$M16:$R16`) | =-1*SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A16`,'家計簿補正'`!$D$2:$D$30992`,`F$1`) | …… | =SUMIFS('家計簿補正'`!$E$2:$E$30992`,'家計簿補正'`!$G$2:$G$30992`,`$A16`,'家計簿補正'`!$D$2:$D$30992`,`S$1`) | …… |
| 17  | 年合計     | =SUM(B5:B16)      | =SUM(C5:C16)      | =SUM(D5:D16)      | =SUM(F5:F16)                                                                                                    | …… | =SUM(S5:S16)                                                                                                 | …… |

### 設定シートを作成

新しくシートを作成しシート名は `設定` にしてください  
画像のような形で設定シートを作成していきます

![setting_sample](./images/overview/google_spread_sheet/setting_sample.png)

#### フォーム項目IDの設定を行う

下記のような感じの表を作成します

|     | A                  | B     |  C              |
|:---:|:-------------------|:-----:|:---------------:|
|  1  | フォーム項目ID設定 | 項目  | 項目ID          |
|  2  |                    | 日    | entry.xxxxxxxxx |
|  3  |                    | 科目  | entry.xxxxxxxxx |
|  4  |                    | 金額  | entry.xxxxxxxxx |
|  5  |                    | 備考  | entry.xxxxxxxxx |

家計簿回答用のGoogleフォーム画面にて下記ブックマークレットを実行し入力項目のIDを取得し設定シートに反映させます  

```javascript
javascript: (() => {
  const inputNameList = ['入力者', '日', '科目', '金額', '備考'];
  const ids = new Set();
  Array.prototype.forEach.call(document.querySelectorAll('input'), function (elem) {
  　if ( elem.name.indexOf('entry') != -1){
      if (elem.name.indexOf('_') != -1) {
          let place = elem.name.indexOf('_');
          ids.add(elem.name.substring(0, place));
      } else {
        ids.add(elem.name);
      }
    }
  });
  const idsArray = Array.from(ids);
  let message = '';
  inputNameList.forEach((name, index) => {
      message += name + '：' + idsArray[index] + '\n';
  });
  alert(message);
})();
```

実行結果

![setting_input_id](./images/environment/google_spread_sheet/setting_input_id.png)

先程、作成した表に表示されているIDをセットしてください  
下記のような画像の感じで設定してください

![input_id_table](./images/environment/google_spread_sheet/input_id_table.png)

#### 通常科目の入力テンプレートの設定を行う

下記のような感じの表を作成します

|     | E                | F   |  G              |  H     | I    | J     | K     | L     |
|:---:|:-----------------|:---:|:---------------:|:------:|:----:|:-----:|:-----:|:-----:|
|  1  | 入力テンプレート | ID  | テンプレート名  | 入力者 |  日  | 科目  | 金額  | 備考  |
|  2  |                  |  1  |                 |        |      |       |       |       |
|  3  |                  |  2  |                 |        |      |       |       |       |
|  4  |                  |  3  |                 |        |      |       |       |       |
|  5  |                  |  4  |                 |        |      |       |       |       |
|  6  |                  |  5  |                 |        |      |       |       |       |
|  7  |                  |  6  |                 |        |      |       |       |       |
|  8  |                  |  7  |                 |        |      |       |       |       |
|  9  |                  |  8  |                 |        |      |       |       |       |
| 10  |                  |  9  |                 |        |      |       |       |       |
| 11  |                  | 10  |                 |        |      |       |       |       |
| 12  |                  | 11  |                 |        |      |       |       |       |
| 13  |                  | 12  |                 |        |      |       |       |       |
| 14  |                  | 13  |                 |        |      |       |       |       |

下記のような画像の感じで設定してください

![variable_cost_template_table](./images/environment/google_spread_sheet/variable_cost_template_table.png)

#### 固定費科目の入力テンプレートの設定を行う

下記のような感じの表を作成します

|     | N                      | O   |  P              |  Q     | R    | S     | T     | U     |
|:---:|:-----------------------|:---:|:---------------:|:------:|:----:|:-----:|:-----:|:-----:|
|  1  | 固定費入力テンプレート | ID  | テンプレート名  | 入力者 |  日  | 科目  | 金額  | 備考  |
|  2  |                        |  1  |                 |        |      |       |       |       |
|  3  |                        |  2  |                 |        |      |       |       |       |
|  4  |                        |  3  |                 |        |      |       |       |       |
|  5  |                        |  4  |                 |        |      |       |       |       |
|  6  |                        |  5  |                 |        |      |       |       |       |
|  7  |                        |  6  |                 |        |      |       |       |       |
|  8  |                        |  7  |                 |        |      |       |       |       |
|  9  |                        |  8  |                 |        |      |       |       |       |
| 10  |                        |  9  |                 |        |      |       |       |       |
| 11  |                        | 10  |                 |        |      |       |       |       |
| 12  |                        | 11  |                 |        |      |       |       |       |
| 13  |                        | 12  |                 |        |      |       |       |       |
| 14  |                        | 13  |                 |        |      |       |       |       |

下記のような画像の感じで設定してください

![fixed_cost_template_table](./images/environment/google_spread_sheet/fixed_cost_template_table.png)

#### 日付けの指定について

日付の欄で今日の日付けを設定したい時は下記関数を使用して設定してください

```
=nowDate()
```

今月の特定日を設定したい時は下記関数を使用して設定してください  
下記の例だと今月の25日が設定されます

```
=nowDateForSpecifiedDay(25)
```

### Googleスプレッドシートをウェブアプリケーションとして公開する

スクリプトエディタからウェブアプリケーションとして公開します

<img alt="release_web_application_1" src="./images/environment/google_spread_sheet/release_web_application_1.png" width="600px">

<img alt="release_web_application_2" src="./images/environment/google_spread_sheet/release_web_application_2.png" width="600px">

`Current web app URL` はLINE BOTと連携で使用するURL（ `LINE BOTに設定するWebhook URL` ）なのでコピーしておいてください

<img alt="release_web_application_3" src="./images/environment/google_spread_sheet/release_web_application_3.png" width="600px">

## LINE BOTの作成

### 新規チャンネルの作成を行う

LINEのエンジニアの方が書かれている記事を参考にMessaging APIの作成を行って下さい

- [LINEのBot開発 超入門（前編） ゼロから応答ができるまで - Qiita](https://qiita.com/nkjm/items/38808bbc97d6927837cd)  

`LINEのアクセストークンが必要` なのでメモしておいて下さい  
`BOT`の作成は必要ないので作成しなくて大丈夫です。`BOT` 本体はGoogleスプレッドシートになります

`Webhook URL` に Googleスプレッドシートをウェブアプリケーションとして公開した時の `Current web app URL` のURLを設定し `検証` ボタンをクリックして成功することを確認しておいてください

<img alt="communication_check" src="./images/environment/linebot/communication_check.png" width="800px">

### Googleスプレッドシートに設定情報を追加する

Googleスプレッドシートのスクリプトエディタから `Config.gs` を開き設定情報を追加します  
下記コード内の `LineAccessToken` , `LinePushNotificationDestination` , `HouseholdAccountBookUrl` , `FormUrl` , `グラフのURL` の設定行います  

```javascript
// LineAccessToken                 ：LINE developersのメッセージ送受信設定に記載のアクセストークン
// LineReplyUrl                    ：LINE Messaging APIのURL（LINEからの応答用）
// LinePushUrl                     ：LINE Messaging APIのURL（LINEに対してPOSTする用）
// LinePushNotificationDestination : LineのUserID
// HouseholdAccountBookUrl         ：家計簿のURL
// FormUrl                         ：家計簿入力用のURL
var _Config = {
  LineAccessToken                 : 'Lineのアクセストークン',
  LineReplyUrl                    : 'https://api.line.me/v2/bot/message/reply',
  LinePushUrl                     : 'https://api.line.me/v2/bot/message/push',
  LinePushNotificationDestination : 'LineのUserID',
  HouseholdAccountBookUrl         : 'Googleスプレッドシートの今月の支出シートURL',
  FormUrl                         : 'GoogleフォームのURL'
};

// グラフの存在する項目のURLリスト
// Base64で取得する方法もあるがめんどいので今回は固定値で対応する
// https://developers.google.com/apps-script/reference/charts
var _ChartList = {
  食費  : '食費グラフURL',
  日用品: '日用品のURL',
  交際費: '交際費のURL',
  洋服代: '洋服代のURL',
  娯楽費: '娯楽費のURL',
  交通費: '交通費のURL',
  合計  : '合計のURL'
}
```

#### LineAccessToken

`LineAccessToken` にはチャンネルアクセストークンを設定してください

<img alt="channel_access_token" src="./images/environment/linebot/channel_access_token.png" width="800px">

#### LinePushNotificationDestination

`LinePushNotificationDestination` にはユーザーIDをセットしてください

<img alt="line_user_id" src="./images/environment/linebot/line_user_id.png" width="800px">

#### HouseholdAccountBookUrl

`HouseholdAccountBookUrl` には `今月` シートを開いてそのURLをセットしてください

#### FormUrl

`FormUrl` には 家計簿回答用のGoogleフォームを開いてそのURLをセットしてください

#### グラフのURL

`グラフのURL` にはグラフを公開を押した時に表示されるURLをセットしてください  
グラフが必要のない人はセットしなくてもよいです

<img alt="graph_url" src="./images/environment/linebot/graph_url.png" width="500px">

`再度、ウェブアプリケーションとして公開してください`

### LINE BOTの動作確認

LINEに作成したBOTを友だち登録して実際に動作するか試してみます  
作成したLINE BOTに `食費` と入力して話しかけてみてください  
下記のような感じでGoogleスプレッドシートの結果が返ってきたら成功です

<img alt="operation_check" src="./images/environment/linebot/operation_check.png" width="500px">

### LINE BOTにメニューを追加する

いちいち文字を打つのがめんどくさいのでメニューを登録しボタンを押すだけで家計簿の機能が使えるようにします  
公式サイトの下記ドキュメント参考に追加していきます

- [リッチメニューを使う](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/)

#### リッチメニューを登録する

curlコマンドを使用してリッチメニューをチャンネルに追加します  
この作業はリッチメニューを作成するだけでLINE BOTに紐付いているわけではありません

```shell
curl -X POST https://api.line.me/v2/bot/richmenu \
    -H 'Authorization: Bearer {チャンネルアクセストークン}' \
    -H 'Content-Type: application/json' \
    -d \
    '{
        "size": {
            "width": 2500,
            "height": 1686
        },
        "selected": true,
        "name": "ProductionMenu",
        "chatBarText": "メニュー",
        "areas": [
            {
                "bounds": {
                    "x": 0,
                    "y": 0,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "科目結果"
                }
            },
            {
                "bounds": {
                    "x": 834,
                    "y": 0,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "今月の支出状況"
                }
            },
            {
                "bounds": {
                    "x": 1668,
                    "y": 0,
                    "width": 832,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "家計簿"
                }
            },
            {
                "bounds": {
                    "x": 0,
                    "y": 843,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "入力"
                }
            },
            {
                "bounds": {
                    "x": 834,
                    "y": 843,
                    "width": 834,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "固定費入力"
                }
            },
            {
                "bounds": {
                    "x": 1668,
                    "y": 843,
                    "width": 832,
                    "height": 843
                },
                "action": {
                    "type": "message",
                    "text": "ヘルプ"
                }
            }
        ]
    }'
```

実行に成功するとリッチメニューのIDが表示されるのでコピーしておきます  

```shell
{"richMenuId":"richmenu-xxxxxxxxxxxxxxxxxxxxx"}
```

#### リッチメニューに画像をアップロードする

作成したリッチメニューに画像を紐付けを行います  

リッチメニューに紐付ける画像をダウンロードします

```shell
git clone https://github.com/dodonki1223/household-account-book.git
cd household-account-book/menu/
```

画像の登録を行います

```shell
curl -X POST https://api.line.me/v2/bot/richmenu/リッチメニューのID/content \
    -H 'Authorization: Bearer {チャンネルアクセストークン}' \
    -H 'Content-Type: image/png' \
    -T menu.png
```

#### LINE BOTにリッチメニューを紐付ける

LINE BOTに作成したリッチメニューの紐付けを行います

```shell
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/リッチメニューのID \
    -H "Authorization: Bearer {チャンネルアクセストークン}"
```

LINE BOTを確認しメニューが表示されていればOKです

### LINE BOTの動作確認２

LINE BOTにメニューが追加されていて、メニューを押して動作するようならLINE BOTの設定は完了です

<img alt="operation_check_2" src="./images/environment/linebot/operation_check_2.png" width="500px">

## 自動通知設定

Googleスプレッドシートのトリガーを使用して特定の時間に家計簿の結果を通知させることができます  
編集メニューの `現在のプロジェクトのトリガー` をクリックしてください

<img alt="to_trigger" src="./images/environment/notification/to_trigger.png" width="600px">

`現在のプロジェクトのトリガー` をクリックするとトリガー設定画面へ遷移します

![trigger_screen](./images/environment/notification/trigger_screen.png)

### 今月の支出状況を通知させる

メニューの `今月の支出状況` の機能を毎日、特定の時間に実行されるように設定します 
`トリガーを追加` ボタンをクリックし下記の画像のような設定し保存してください

![summary_post](./images/environment/notification/summary_post.png)

上記設定で毎日23時〜24時の間に今月の支出状況がLINE BOTに通知されるようになります

### 今月の最終結果を通知させる

`月集計` シートの今月の結果を月末に通知するよう設定します  
`トリガーを追加` ボタンをクリックし下記の画像のような設定し保存してください

![income_and_expenditure_for_this_month](./images/environment/notification/income_and_expenditure_for_this_month.png)

上記設定で毎月の最終日に23時〜24時の間に今月の支出状況がLINE BOTに通知されるようになります  
`doIncomeAndExpenditureForThisMonthPost` メソッド内で月末かどうか判断し月末の時だけLINE BOTにPostするような処理になっているため、毎日実行する設定にしています  

実行されると下記のような通知になります  

<img alt="line_bot_income_and_expenditure_for_this_month" src="./images/environment/notification/line_bot_income_and_expenditure_for_this_month.png" width="500px">
