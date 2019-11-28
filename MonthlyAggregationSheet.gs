// 当月の集計データ
var AggregateValues = {
  Aggregate   : getSheet('月集計').getRange('B' + getThisMonthIndex() + ':E' + getThisMonthIndex()).getValues()[0],
  VariableCost: getSheet('月集計').getRange('F' + getThisMonthIndex() + ':L' + getThisMonthIndex()).getValues()[0],
  FixedCost   : getSheet('月集計').getRange('M' + getThisMonthIndex() + ':R' + getThisMonthIndex()).getValues()[0],
  Income      : getSheet('月集計').getRange('S' + getThisMonthIndex() + ':T' + getThisMonthIndex()).getValues()[0]
}

// 当月の集計科目リスト
var AggregateSubjectList = {
  Aggregate   : getSheet('月集計').getRange('B1:E1').getValues()[0],
  VariableCost: getSheet('月集計').getRange('F1:L1').getValues()[0],
  FixedCost   : getSheet('月集計').getRange('M1:R1').getValues()[0],
  Income      : getSheet('月集計').getRange('S1:T1').getValues()[0]
}

/**
 * 今月の行Indexを取得する
 * @return {Number} 今月の行Index
 */
function getThisMonthIndex() {
  var sheet = getSheet('月集計');
  var lastRow = sheet.getLastRow() - 1;
  var monthRows = sheet.getRange(1, 1, lastRow, 1).getValues();
  
  var beginningOfMonth = new Date();
  beginningOfMonth.setDate(1);
  
  // 対象行のインデックスを検索する
  var targetRowIndex = 0;
  monthRows.forEach(function(value, index) {
    if (specifiedDate(value) == specifiedDate(beginningOfMonth)) {
      targetRowIndex = index;
    }
  });

  return targetRowIndex + 1;
}
