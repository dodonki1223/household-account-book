/**
 * 全てのグラフを取得する
 * @return {Array} 全てのグラフデータ
 */
function getAllCharts() {
  var sheet = getSheet('今月支出');
  return sheet.getCharts();
}

/**
 * グラフが存在するか？
 * @param {String} [subjectName] - 項目名
 * @return {Boolean} True：存在する、False：存在しない
 */
function isExistsChart(subjectName) {
  var charts = getAllCharts();
  
  // グラフが存在するか
  for (var i in charts) {
    var chart = charts[i];
    var title = chart.getOptions().get('title');
    if (title === subjectName)
      return true;
  }
  return false;
}

/**
 * グラフの公開URLを返す
 * @param {String} [subjectName] - 項目名
 * @return {String} グラフの公開URL
 */
function getChartUrl(subjectName) {
  var charts = getAllCharts();
  
  // 対象のChartの公開URLを返す
  for (var i in charts) {
    var chart = charts[i];
    var title = chart.getOptions().get('title');
    if (title === subjectName)
      return ChartList[subjectName];
  }
  return '';
}

// グラフが存在するか？メソッドのテスト
function TestIsExistsChart() {
  Logger.log('食費が存在すること：' + isExistsChart('食費'));
  Logger.log('日用品が存在すること：' + isExistsChart('日用品'));
  Logger.log('交際費が存在すること：' + isExistsChart('交際費'));
  Logger.log('洋服代が存在すること：' + isExistsChart('洋服代'));
  Logger.log('娯楽費が存在すること：' + isExistsChart('娯楽費'));
  Logger.log('交通費が存在すること：' + isExistsChart('交通費'));
  Logger.log('合計が存在すること：' + isExistsChart('合計'));
  
  Logger.log('保険料が存在しないこと：' + isExistsChart('保険料'));
  Logger.log('住居費が存在しないこと：' + isExistsChart('住居費'));
}

// グラフの公開URLを返すメソッドのテスト
function TestGetChartUrl() {
  Logger.log('食費がURLが取得できること：' + getChartUrl('食費'));
  Logger.log('日用品がURLが取得できること：' + getChartUrl('日用品'));
  Logger.log('交際費がURLが取得できること：' + getChartUrl('交際費'));
  Logger.log('洋服代がURLが取得できること：' + getChartUrl('洋服代'));
  Logger.log('娯楽費がURLが取得できること：' + getChartUrl('娯楽費'));
  Logger.log('交通費がURLが取得できること：' + getChartUrl('交通費'));
  Logger.log('合計がURLが取得できること：' + getChartUrl('合計'));
  
  Logger.log('保険料がURLが取得できないこと：' + getChartUrl('保険料'));
  Logger.log('住居費がURLが取得できないこと：' + getChartUrl('住居費'));
}
