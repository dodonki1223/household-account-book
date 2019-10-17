// 検索用の情報
var searchInfo = {
  StartColumn : 3,
  StartRow    : 2
}

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

/**
 * 対象のカラム名存在するか？
 * @param {String} [subjectName] - カラム名
 * @return {Boolean} True:存在する、False：存在しない
 */
function isExistsSubject(subjectName) {
  var searchColumns = getSearchCloumns();

  // 対象のカラム名が存在するか
  for (var i = 0; i < searchColumns.length; i++) {
    if (searchColumns[i] == subjectName)
      return true;
  }

  return false;
}

/**
 * カラムの一覧を返す
 * @return {Array} 検索対象カラムの一覧
 */
function getSearchCloumns() {
  var sheet = getSheet('今月支出');
  
  // 最終カラムを取得（最終カラムの値が０始まりのため-1する）
  var lastColumn = sheet.getLastColumn() - 1;

  // 検索対象のカラムの一覧を返す
  return sheet.getRange(1, searchInfo.StartColumn, 1, lastColumn - 1).getValues()[0];
}

/**
 * 対象カラムのインデックスを取得する
 * @param {String} [subjectName] - カラム名
 * @return {Number} カラムのIndex
 */
function getTargetSubjectIndex(subjectName) {
  var searchColumns = getSearchCloumns();
  
  // 対象カラムのインデックスを検索する
  var targetColumnIndex = 0;
  searchColumns.forEach(function(value, index) {
    if (value == subjectName) {
      targetColumnIndex = index;
    }
  });
  
  // 検索に引っかからなかったらデフォルトのsearchStartColumnのIndexを返す
  return searchInfo.StartColumn + targetColumnIndex;
}

/**
 * 対象の項目の当日の支出額を取得する
 * @param {Number} [subjectIndex] - 対象カラムインデックス
 * @return {Number} 当日の支出額
 */
function getTodayStatus(subjectIndex) {
  var sheet = getSheet('今月支出');
  
  // 検索対象の日付け行の値を取得（最終行の値が０始まりのため-1する）
  var lastRow = sheet.getLastRow() - 1;
  var targetDayRows = sheet.getRange(2, 1, lastRow - 5).getValues();

  var today = new Date();
  
  // 対象行のインデックスを検索する
  var targetRowIndex = 0;
  targetDayRows.forEach(function(value, index) {
    var target = new Date(value);
    if (target.getDate() == today.getDate()) {
      targetRowIndex = index;
    }
  });
  
  return sheet.getRange(targetRowIndex + searchInfo.StartRow, subjectIndex).getValues()[0][0];
}

/**
 * 対象の項目の合計、１日平均、１週間平均、今月料金予測の値を取得する
 * @param {Number} [subjectIndex] - 対象カラムインデックス
 * @return {Array} 「合計、１日平均、１週間平均、今月料金予測」の値
 */
function getNowStatusValues(subjectIndex) {
  var sheet = getSheet('今月支出');
  return sheet.getRange(33, subjectIndex, 36).getValues();
  
}

// 対象のカラム名存在するか？のメソッドのテスト
function TestIsExistsSubject() {
  Logger.log('食費：' + isExistsSubject('食費'));
  Logger.log('日用品：' + isExistsSubject('日用品'));
  Logger.log('医療費：' + isExistsSubject('医療費'));
  Logger.log('水道光熱費：' + isExistsSubject('水道光熱費'));
  Logger.log('交通費：' + isExistsSubject('交通費'));
  Logger.log('通信費：' + isExistsSubject('通信費'));
  Logger.log('保険料：' + isExistsSubject('保険料'));
  Logger.log('住居費：' + isExistsSubject('住居費'));
  Logger.log('借金返済：' + isExistsSubject('借金返済'));
  Logger.log('洋服代：' + isExistsSubject('洋服代'));
  Logger.log('娯楽費：' + isExistsSubject('娯楽費'));
  Logger.log('特別出費：' + isExistsSubject('特別出費'));
  Logger.log('hoge：' + isExistsSubject('hoge'));
}

// 対象カラムのインデックスを取得するメソッドのテスト
function TestGetTargetSubjectIndex() {
  var sheet = getSheet('今月支出');
  
  Logger.log('食費であること：' + sheet.getRange(1, getTargetSubjectIndex('食費')).getValues()[0][0]);
  Logger.log('日用品であること：' + sheet.getRange(1, getTargetSubjectIndex('日用品')).getValues()[0][0]);
  Logger.log('医療費であること：' + sheet.getRange(1, getTargetSubjectIndex('医療費')).getValues()[0][0]);
  Logger.log('水道光熱費であること：' + sheet.getRange(1, getTargetSubjectIndex('水道光熱費')).getValues()[0][0]);
  Logger.log('交通費であること：' + sheet.getRange(1, getTargetSubjectIndex('交通費')).getValues()[0][0]);
  Logger.log('通信費であること：' + sheet.getRange(1, getTargetSubjectIndex('通信費')).getValues()[0][0]);
  Logger.log('保険料であること：' + sheet.getRange(1, getTargetSubjectIndex('保険料')).getValues()[0][0]);
  Logger.log('住居費であること：' + sheet.getRange(1, getTargetSubjectIndex('住居費')).getValues()[0][0]);
  Logger.log('借金返済であること：' + sheet.getRange(1, getTargetSubjectIndex('借金返済')).getValues()[0][0]);
  Logger.log('洋服代であること：' + sheet.getRange(1, getTargetSubjectIndex('洋服代')).getValues()[0][0]);
  Logger.log('娯楽費であること：' + sheet.getRange(1, getTargetSubjectIndex('娯楽費')).getValues()[0][0]);
  Logger.log('特別出費であること：' + sheet.getRange(1, getTargetSubjectIndex('特別出費')).getValues()[0][0]);
  Logger.log('食費であること：' + sheet.getRange(1, getTargetSubjectIndex('hogehogefugafua')).getValues()[0][0]);
}

// 対象の項目の当日の支出額を取得するメソッドのテスト
function TestGetTodayStatus() {
  var sheet = getSheet('今月支出');
  var today = new Date();

  Logger.log('今日の食費が取得できていること' + sheet.getRange(today.getDate() + 1, 3).getValues()[0][0] + ':' + getTodayStatus(3));
  Logger.log('今日の日用品が取得できていること' + sheet.getRange(today.getDate() + 1, 4).getValues()[0][0] + ':' + getTodayStatus(4));
  Logger.log('今日の医療費が取得できていること' + sheet.getRange(today.getDate() + 1, 5).getValues()[0][0] + ':' + getTodayStatus(5));
  Logger.log('今日の水道光熱費が取得できていること' + sheet.getRange(today.getDate() + 1, 6).getValues()[0][0] + ':' + getTodayStatus(6));
  Logger.log('今日の交通費が取得できていること' + sheet.getRange(today.getDate() + 1, 7).getValues()[0][0] + ':' + getTodayStatus(7));
  Logger.log('今日の通信費が取得できていること' + sheet.getRange(today.getDate() + 1, 8).getValues()[0][0] + ':' + getTodayStatus(8));
  Logger.log('今日の保険料が取得できていること' + sheet.getRange(today.getDate() + 1, 9).getValues()[0][0] + ':' + getTodayStatus(9));
  Logger.log('今日の住居費が取得できていること' + sheet.getRange(today.getDate() + 1, 10).getValues()[0][0] + ':' + getTodayStatus(10));
  Logger.log('今日の借金返済が取得できていること' + sheet.getRange(today.getDate() + 1,11).getValues()[0][0] + ':' + getTodayStatus(11));
  Logger.log('今日の洋服代が取得できていること' + sheet.getRange(today.getDate() + 1, 12).getValues()[0][0] + ':' + getTodayStatus(12));
  Logger.log('今日の娯楽費が取得できていること' + sheet.getRange(today.getDate() + 1, 13).getValues()[0][0] + ':' + getTodayStatus(13));
  Logger.log('今日の特別出費が取得できていること' + sheet.getRange(today.getDate() + 1, 14).getValues()[0][0] + ':' + getTodayStatus(14));
}

// 対象の項目の合計、１日平均、１週間平均、今月料金予測の値を取得するメソッドのテスト
function TestGetNowStatusValues() {
  var sheet = getSheet('今月支出');

  Logger.log('合計値が取得できること(' + sheet.getRange(33, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[0][0]);
  Logger.log('１日平均が取得できること(' + sheet.getRange(34, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[1][0]);
  Logger.log('１週間平均が取得できること(' + sheet.getRange(35, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[2][0]);
  Logger.log('今月料金予測が取得できること(' + sheet.getRange(36, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[3][0]);
}