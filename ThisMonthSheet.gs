// 検索用の情報
var SearchInfo = {
  StartColumn    : 3,
  StartRow       : 2,
  ResultStartRow : 33,
  ResultEndRow   : 37,
};

// 科目名の範囲
var SubjectNameRange = {
  VariableCost: 'C1:J1',
  FixedCost   : 'K1:Q1'
};

// 科目名名の一覧
var SubjectList = {
  VariableCost: getSheet('今月').getRange(SubjectNameRange.VariableCost).getValues()[0],
  FixedCost   : getSheet('今月').getRange(SubjectNameRange.FixedCost).getValues()[0]
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
  var sheet = getSheet('今月');
  
  // 最終カラムを取得（最終カラムの値が０始まりのため-1する）
  var lastColumn = sheet.getLastColumn() - 1;

  // 検索対象のカラムの一覧を返す
  return sheet.getRange(1, SearchInfo.StartColumn, 1, lastColumn - 1).getValues()[0];
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
  return SearchInfo.StartColumn + targetColumnIndex;
}

/**
 * 対象の項目の当日の支出額を取得する
 * @param {Number} [subjectIndex] - 対象カラムインデックス
 * @return {Number} 当日の支出額
 */
function getTodayStatus(subjectIndex) {
  var sheet = getSheet('今月');
  
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
  
  return sheet.getRange(targetRowIndex + SearchInfo.StartRow, subjectIndex).getValues()[0][0];
}

/**
 * 対象の項目の合計、１日平均、１週間平均、今月料金予測、先月費差異の値を取得する
 * @param {Number} [subjectIndex] - 対象カラムインデックス
 * @return {Array} 「合計、１日平均、１週間平均、今月料金予測、先月費差異」の値
 */
function getNowStatusValues(subjectIndex) {
  var sheet = getSheet('今月');
  return sheet.getRange(SearchInfo.ResultStartRow, subjectIndex, SearchInfo.ResultEndRow).getValues();
  
}
