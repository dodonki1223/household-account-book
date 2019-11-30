/**
 * ２桁の数値文字列を返す
 * 1〜9の数値には前に0を付加する
 * @param {Number} [number] - 数値
 * @return {String} 2桁の数値を返す
 */
function padZero(number) {
  if (number < 10) return "0" + number;
  return '' + number;
}

/**
 * 日付け文字列を作成し返す
 * @param {Date} [date] - 日付けオブジェクト
 * @param {String} [delimiter] - 日付けの間の区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)形式の日付文字列
 */
function buildDateString(date, delimiter) {
  var delimiterString = (delimiter == undefined) ? '-' : delimiter;
  return "" + date.getFullYear() + delimiterString + padZero(date.getMonth() + 1) + delimiterString + padZero(date.getDate());
}

/**
 * 今日日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {String} [delimiter] - 区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function nowDate(delimiter) {
  const now = new Date();

  return buildDateString(now, delimiter);
}

/**
 * 指定日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {String} [delimiter] - 日付けの間の区切り文字
 * @return {String} (YYYY区切り文字MM区切り文字DD)形式の日付文字列
 */
function specifiedDate(date, delimiter) {
  const now = new Date(date);

  return buildDateString(now, delimiter);
}

/**
 * 今月の指定日付けの文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @param {Number} [number] - 数値
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function nowDateForSpecifiedDay(number, delimiter) {
  const now = new Date();
  now.setDate(number);

  return buildDateString(now, delimiter);
}

/**
 * 月初の日付文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function beginningOfMonthDate(delimiter) {
  const date = new Date();
  date.setDate(1);
  
  return buildDateString(date, delimiter);
}

/**
 * 月末の日付文字列を(YYYY区切り文字MM区切り文字DD)の形式で返す
 * @return {String} (YYYY区切り文字MM区切り文字DD)の形式の日付け文字列
 */
function endOfMonthDate(delimiter) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  
  return buildDateString(date, delimiter);
}

/**
 * 月末か？
 * @return {Boolean} 
 */
function isEndOfMonth() {
  var date = new Date();
  date.setDate(date.getDate() +1);

  // 現在日付＋１の日付が１日の場合は月末と判断する
  return date.getDate() === 1;
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
 * 入力テンプレート用のURLのURLパラメータ作成
 * @param {String} [id] - 入力項目のID
 * @param {String} [value] - セットする値
 * @return {String} 「entry.999996=value」のような形式
 */
function buildInputFormTemplateParam(id, value) {
  // return id + '=' + encodeURI(value);
  // 本当は上の方が良いがLineのAPIの文字数制限に引っかかるのでエンコードは行わないようにする（2000文字制限）
  return id + '=' + value;
}

/**
 * 入力テンプレート用のURLを作成
 * @param {Array} [values] - 入力項目のID
 * @return {String} 初期入力された状態の入力フォームのURL
 */
function buildInputFormTemplateUrl(values) {
  return Config.FormUrl + 
         '&' + buildInputFormTemplateParam(InputFormIds.InputUser, values[1]) + 
         '&' + buildInputFormTemplateParam(InputFormIds.Day, values[2]) + 
         '&' + buildInputFormTemplateParam(InputFormIds.SubjectName, values[3]) + 
         '&' + buildInputFormTemplateParam(InputFormIds.Amount, values[4]) + 
         '&' + buildInputFormTemplateParam(InputFormIds.Note, values[5]);
}

/**
 * 配列内の文字でもっとも長い文字列の長さを取得
 * @param {Array} [array] - 配列
 * @return {Number} もっとも長い文字列の長さ
 */
function getMaxLengthFromArray(array) {
  var maxLength = 0;
  array.forEach(function(value){
    if (maxLength < value.length) maxLength = value.length;
  });
  
  return maxLength;
}

/**
 * 配列内の文字を一律一番長いものに合わせる
 * @param {Array} [array] - 配列
 * @return {Array} 文字の長さを合わせた配列
 */
function addedSpaceArray(array) {
  var maxLength = getMaxLengthFromArray(array);
  var addedSpaceArray = array.map(function(value){
    while(value.length < maxLength){
      value = "　" + value;
    };
    return value;
  });

  return addedSpaceArray;
}