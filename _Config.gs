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
