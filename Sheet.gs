/**
 * シート名からシートを取得する
 * @param {String} [sheetName] - シート名
 * @return {Sheet} Googleスプレッドシートのシートオブジェクト
 */
function getSheet(SheetName) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet(),
      sheet = ss.getSheetByName(SheetName);

  return sheet;
}
