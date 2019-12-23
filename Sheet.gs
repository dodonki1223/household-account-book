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

// 対象日の対象科目の回答結果を表示する
// 1セルのみ選択でしか対応していません
// ※特にエラー処理もしてません
function displayFormDataList() {
  // 対象日、対象科目名を取得
  var ss    = SpreadsheetApp.getActiveSpreadsheet(),
      sheet = ss.getActiveSheet(),
      cell  = sheet.getActiveCell();
  var targetDay     = new Date(sheet.getRange('A' + cell.getRow()).getValue()),
      targetSubject = sheet.getRange(1, cell.getColumn()).getValue();

  // フォームの回答情報をすべて取得する
  var formSheet = getSheet('フォームの回答');
  var formSheetData = formSheet.getRange(2, 1, formSheet.getLastRow(), 6).getValues();

  // 対象の回答データ
  var targetFormData = formSheetData.filter(function(value){
    var formDate    = new Date(value[2]);
    var formSubject = value[3];
    return (buildDateString(formDate, '-') == buildDateString(targetDay, '-') && formSubject == targetSubject);
  });
  
  // 表示させるメッセージを作成
  var message = '★' + buildDateString(targetDay, '-') + 'の' + targetSubject + '★\\n\\n';
  targetFormData.forEach(function(value){
    message += value[5] + ':' + value[4] + '円\\n';
  });

  // メッセージBOXに結果を表示
  Browser.msgBox(message, Browser.Buttons.OK);
}