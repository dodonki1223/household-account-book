/**
 * 対象項目の今月の支出情報を取得する
 * @param {String} [subjectName] - カラム名
 * @return {String} 今月の支出情報
 */
function paymentInfo(subjectName) {
  var index = getTargetSubjectIndex(subjectName);

  var isBelowForLastMonth = getNowStatusValues(index)[4][0] < 0
  var belowMessage = isBelowForLastMonth ? 'いい調子だ！\n先月より安いぞ😍' : 'ふーむ🤔\n先月よりも使い込んでいるな😭\n気合を入れろ！'

  // 本当は画像送信メッセージを使用したいがグラフの公開URLがCanvasで描かれているため使用出来ず……Orz
  var chartMessage = isExistsChart(subjectName) ? '\n' + 'グラフを出しとくね🙄' + '\n\n' +ChartList[subjectName] : '';

  var paymentInfo = '⭐今月の' + subjectName + '⭐ ' + '\n\n' +
                    '本日支出額：' + numberToJPYFormat(getTodayStatus(index)) + '\n' +
                    '１ヶ月合計：' + numberToJPYFormat(getNowStatusValues(index)[0][0]) + '\n' +
                    '１日の平均：' + numberToJPYFormat(getNowStatusValues(index)[1][0]) + '\n' +
                    '１週間平均：' + numberToJPYFormat(getNowStatusValues(index)[2][0]) + '\n' +
                    '今月の予測：' + numberToJPYFormat(getNowStatusValues(index)[3][0]) + '\n' +
                    '先月費差異：' + numberToJPYFormat(getNowStatusValues(index)[4][0]) + '\n\n' +
                    belowMessage + 
                    chartMessage;

  return paymentInfo;
}

/**
 * 家計簿の入力フォームのURLを返す
 * @return {String} 家計簿の入力フォームのURL
 */
function inputFormURL() {
  return '家計簿入力フォームです！' + '\n\n' + Config.FormUrl;
}

/**
 * 今月の家計簿のシートのURLを返す
 * @return {String} 今月の家計簿のシートのURL
 */
function householdAccountBookUrl() {
  return '今月の家計簿のURLです！' + '\n\n' + Config.HouseholdAccountBookUrl;
}

/**
 * 入力された内容に回答出来ない時のメッセージ
 * @return {String} 入力された内容に回答出来ない時のメッセージ
 */
function notExistsMessage() {
  return 'そのメッセージに回答する答えが存在しないよ（泣）';
}

/**
 * LINE BOTの使い方のヘルプメッセージを返す
 * @return {String} ヘルプメッセージ
 */
function helpMessage() {
  return '家計簿：今月の家計簿のURLを表示' + '\n' +
         '入　力：家計簿入力用URLを表示' + '\n' +
         '科目名：今月の状況を表示(食費etc)' + '\n' +
         'ヘルプ：リファレンスを表示';
}

/**
 * 今日の結果通知用のメッセージを返す
 * @return {String} 今日の結果通知用のメッセージ
 */
function summaryMessage() {
  var targetSubjects = ['食費', '日用品', '医療費', '交際費', '洋服代', '娯楽費', '雑費', '合計'];

  var message = '今日の結果を通知するよー🌝\n\n';
  targetSubjects.forEach(function (subject) {
    var index = getTargetSubjectIndex(subject);
    var sumValue = numberToJPYFormat(getNowStatusValues(index)[0][0]);
    message += subject + '：' + sumValue + '\n'
  });
  
  return message.slice(0, -1);
}

/**
 * Postするメッセージを作成する
 * @param {String} [message] - メッセージ
 * @return {Array} メッセージの情報
 */
function buildMessages(message) {
  return [{
      'type': 'text',
      'text': message,
  }]
}

// 対象項目の今月の支出情報を取得するメソッドのテスト
function TestPaymentInfo() {
  Logger.log(paymentInfo('食費'));
  Logger.log(paymentInfo('日用品'));
  Logger.log(paymentInfo('娯楽費'));
  Logger.log(paymentInfo('住居費'));
}
