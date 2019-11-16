/**
 * Postを実行する
 * @param {JSON} [e] - POSTされた情報
 * @return {JSON} Postが成功した情報をJSON形式で返す
 */
function doPost(e) {
  // LineBotからPostされたデータを取得
  // Webhookイベントオブジェクトの返す値について
  // →https://developers.line.biz/ja/reference/messaging-api/#webhook-event-objects 
  var replyToken  = JSON.parse(e.postData.contents).events[0].replyToken;   // WebHookで受信した応答用Token
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text; // ユーザーのメッセージを取得

  // Googleフォームで回答されたデータを参照用のシートにコピーする（最新の状態を反映させるため）
  copyForm();

  // 表示するメッセージを作成
  var message = convertUserMessageToLineMessage(userMessage);

  // LineにPostする
  UrlFetchApp.fetch(config.LinePostUrl, createRequest(replyToken, createMessages(message)));

  // 成功のステータスを返す
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

/**
 * ユーザーの入力用メッセージからそれに対応したメッセージを返す
 * @param {String} [userMessage] - ユーザーの入力用メッセージ
 * @return {String} メッセージ
 */
function convertUserMessageToLineMessage(userMessage) {
  if (userMessage === '家計簿') {
    return householdAccountBookUrl();
  } else if (userMessage === '入力') {
    return inputFormURL();
  } else if (isExistsSubject(userMessage)) {
    return paymentInfo(userMessage);
  } else if (userMessage === 'ヘルプ') {
    return helpMessage();
  } else {
    return notExistsMessage();
  }
}

/**
 * リクエスト情報（JSON）を作成する
 * @param {String} [replyToken] - WebHookで受信した応答用Token（LINE BOTより）
 * @param {CallBack} [callback] - calllback関数
 * @return {String} リクエスト情報（JSON）
 */
function createRequest(replyToken, callback) {
  return {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + config.LineAccessToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': callback,
    }),
  }
}
