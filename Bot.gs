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

  // FormURLが含まれていた場合はクリックリプライメッセージなので何もせずに処理を終了する
  if (userMessage.indexOf(Config.FormUrl) != -1) return;

  // Googleフォームで回答されたデータを参照用のシートにコピーする（最新の状態を反映させるため）
  copyForm();

  // LineにPostする
  var message = convertUserMessageToLineMessage(userMessage);
  UrlFetchApp.fetch(Config.LineReplyUrl, createReplyRequest(replyToken, message));

  // 成功のステータスを返す
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 今日の結果のsummaryをLINE BOTにPostする
 * @return {JSON} Postが成功した情報をJSON形式で返す
 */
function doSummaryPost() {
  // Googleフォームで回答されたデータを参照用のシートにコピーする（最新の状態を反映させるため）
  copyForm();

  // LineにPostする
  var message = buildMessages(summaryMessage());
  UrlFetchApp.fetch(Config.LinePushUrl, createPushRequest(message));

  // 成功のステータスを返す
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

/**
 * ユーザーの入力用メッセージからそれに対応したメッセージを返す
 * @param {String} [userMessage] - ユーザーの入力用メッセージ
 * @return {Object} LineにPostするようのメッセージObject
 */
function convertUserMessageToLineMessage(userMessage) {
  if (userMessage === '家計簿') {
    return buildMessages(householdAccountBookUrl());
  } else if (userMessage === '科目結果') {
    var quickReplyItems = buildQuickReplyItemsForArray(SubjectList.VariableCost);
    return buildQuickReplyMessages('科目を選んでね😍', quickReplyItems);
  } else if (userMessage === '今日の結果') {
    return buildMessages(summaryMessage());
  } else if (userMessage === '入力') {
    var quickReplyItems = buildQuickReplyItemsForTemplates(InputTemplateKeys.VariableCost, InputTemplates.VariableCost);
    return buildQuickReplyMessages('入力テンプレートを選んでね😍', quickReplyItems);
  } else if (userMessage === '入力固定費') {
    var quickReplyItems = buildQuickReplyItemsForTemplates(InputTemplateKeys.FixedCost, InputTemplates.FixedCost);
    return buildQuickReplyMessages('入力テンプレートを選んでね😍', quickReplyItems);
  } else if (isExistsSubject(userMessage)) {
    return buildMessages(paymentInfo(userMessage));
  } else if (userMessage === 'ヘルプ') {
    return buildMessages(helpMessage());
  } else {
    return buildMessages(notExistsMessage());
  }
}

/**
 * リクエストのヘッダーを作成
 * @return {Object} リクエスト情報のヘッダー
 */
function header() {
  return {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + Config.LineAccessToken,
      }
}

/**
 * 応答用のリクエスト情報（JSON）を作成する
 * @param {String} [replyToken] - WebHookで受信した応答用Token（LINE BOTより）
 * @param {Array} [Array] - message情報
 * @return {Object} リクエスト情報（JSON）
 */
function createReplyRequest(replyToken, message) {
  return {
    'headers': header(),
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': message,
    }),
  }
}

/**
 * プッシュ用のリクエスト情報（JSON）を作成する
 * @param {Array} [Array] - message情報
 * @return {Object} リクエスト情報（JSON）
 */
function createPushRequest(message) {
  return {
    'headers': header(),
    'method': 'post',
    'payload': JSON.stringify({
      'to': Config.LinePushNotificationDestination,
      'messages': message
    }),
  }
}
