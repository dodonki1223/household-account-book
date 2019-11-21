/**
 * 全てのグラフを取得する
 * @return {Array} 全てのグラフデータ
 */
function getAllCharts() {
  var sheet = getSheet('今月');
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
