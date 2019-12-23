// Googleスプレッドシートの表示時イベント
function onOpen() {
  // 独自メニューを追加
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu('追加機能', [
      {name: 'フォームの回答データをコピー', functionName: 'copyForm'},
      {name: '回答結果', functionName: 'displayFormDataList'},
    ]);

   // フォームのコピー処理を実行
   copyForm();
}

// Googleフォームで回答されたデータを参照用のシートにコピーする
// 回答されるとデータの挿入がされるため、最新の回答データが参照先シートで表示されなくなるため
// 回答データを参照先シートにコピーする処理
// 參考URL：https://support.google.com/a/forum/AAAAON3-SIYVaOXz3DzAFQ/?hl=ja&gpf=%23!msg%2Fapps-ja%2FVaOXz3DzAFQ%2FXxk93tZwh3EJ&msgid=Xxk93tZwh3EJ
function copyForm() {
  // Googleフォームで回答された回答データのRangeを取得
  var googleFormSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('フォームの回答');
  var googleFormLastRow = googleFormSheet.getLastRow();
  var targetRange = 'A2:F' + googleFormLastRow;
  var googleFormRange = googleFormSheet.getRange(targetRange);
  
  Logger.log('GoogleForm回答データの最終行：' + googleFormLastRow);
  
  // Googleフォームの参照先シートへコピーする先のRangeを取得
  var referenceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('家計簿補正');
  var referenceLastRow = referenceSheet.getLastRow();
  var referenceRange = referenceSheet.getRange(targetRange);

  Logger.log('参照先シートの最終行：' + referenceLastRow);

  // Googleフォームの回答データが更新されてなかったら処理を終了
  if (googleFormLastRow == referenceLastRow) return;
  
  // Googleフォームの参照先シートへ回答データをコピーする
  Logger.log('コピー処理が実行されたよ');
  googleFormRange.copyTo(referenceRange, { contentsOnly: true });
  
  // 日付補正の列を最終行までコピーする
  var correctionCopyRange = referenceSheet.getRange('G' + (referenceLastRow + 1) + ':G' + googleFormLastRow);
  var correctionRange = referenceSheet.getRange('G' + referenceLastRow);
  correctionRange.copyTo(correctionCopyRange);
}
