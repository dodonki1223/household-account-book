/**
 * 対象項目の今月の支出情報を取得する
 * @param {String} [subjectName] - カラム名
 * @return {String} 今月の支出情報
 */
function paymentInfo(subjectName) {
  var index = getTargetSubjectIndex(subjectName);
  var paymentInfo = '★今月の' + subjectName + '★' + '\n\n' +
                    '本日支出額：' + numberToJPYFormat(getTodayStatus(index)) + '\n' +
                    '１ヶ月合計：' + numberToJPYFormat(getNowStatusValues(index)[0][0]) + '\n' +
                    '１日の平均：' + numberToJPYFormat(getNowStatusValues(index)[1][0]) + '\n' +
                    '１週間平均：' + numberToJPYFormat(getNowStatusValues(index)[2][0]) + '\n' +
                    '今月の予測：' + numberToJPYFormat(getNowStatusValues(index)[3][0]) + '\n' +
                    '先月費差異：' + numberToJPYFormat(getNowStatusValues(index)[4][0]);
                    
  // 本当は画像送信メッセージを使用したいがグラフの公開URLがCanvasで描かれているため使用出来ず……Orz
  return isExistsChart(subjectName) ? paymentInfo + '\n\n' + ChartList[subjectName] : paymentInfo;
}

/**
 * 家計簿の入力フォームのURLを返す
 * @return {String} 家計簿の入力フォームのURL
 */
function inputFormURL() {
  return '家計簿入力フォームです！' + '\n\n' + config.FormUrl;
}

/**
 * 今月の家計簿のシートのURLを返す
 * @return {String} 今月の家計簿のシートのURL
 */
function householdAccountBookUrl() {
  return '今月の家計簿のURLです！' + '\n\n' + config.HouseholdAccountBookUrl;
}

/**
 * 入力された内容に回答出来ない時のメッセージ
 * @return {String} 入力された内容に回答出来ない時のメッセージ
 */
function notExistsMessage() {
  return 'そのメッセージに回答する答えが存在しないよ（泣）';
}

function helpMessage() {
  return '家計簿：今月の家計簿のURLを表示' + '\n' +
         '入　力：家計簿入力用URLを表示' + '\n' +
         '科目名：今月の状況を表示(食費etc)' + '\n' +
         'ヘルプ：リファレンスを表示';
}

/**
 * 数値を日本円の表示フォーマットに変換する
 * 少数点以下は切り捨て、３桁区切りでカンマを追加する
 * 例：5666.345 → 5,666円
 * @param {Number} [value] - 数値
 * @return {String} 小数点以下は切捨てて３桁区切りで返す
 */
function numberToJPYFormat(value) {
  return String(Math.floor(value)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + '円';
}

/**
 * Postするメッセージを作成する
 * @param {Sheet} [sheet] - シートObject
 * @param {Array} [rows] - 対象のデータ行配列
 * @return {String} メッセージの情報
 */
function createMessages(message) {
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