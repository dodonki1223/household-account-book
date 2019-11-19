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
 * 今日日付けの文字列を(YYYY-MM-DD)の形式で返す
 * @return {String} (YYYY-MM-DD)の形式の日付け文字列
 */
function nowDate() {
  const now = new Date();
  
  Logger.log("" + now.getFullYear() + "-" + padZero(now.getMonth() + 1) + "-" + padZero(now.getDate()))
  return "" + now.getFullYear() + "-" + padZero(now.getMonth() + 1) + "-" + padZero(now.getDate());
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
  return id + '=' + encodeURI(value);
}
