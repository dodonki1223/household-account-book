// Chart.gsのテストを全て実行する
function TestChart() {
  TestIsExistsChart();
  TestGetChartUrl();
}

// グラフが存在するか？メソッドのテスト
function TestIsExistsChart() {
  Logger.log('グラフが存在するか？メソッドのテスト');

  Logger.log('食費が存在すること：' + isExistsChart('食費'));
  Logger.log('日用品が存在すること：' + isExistsChart('日用品'));
  Logger.log('交際費が存在すること：' + isExistsChart('交際費'));
  Logger.log('洋服代が存在すること：' + isExistsChart('洋服代'));
  Logger.log('娯楽費が存在すること：' + isExistsChart('娯楽費'));
  Logger.log('交通費が存在すること：' + isExistsChart('交通費'));
  Logger.log('合計が存在すること：' + isExistsChart('合計'));
  
  Logger.log('保険料が存在しないこと：' + isExistsChart('保険料'));
  Logger.log('住居費が存在しないこと：' + isExistsChart('住居費'));
  
  Logger.log('');
}

// グラフの公開URLを返すメソッドのテスト
function TestGetChartUrl() {
  Logger.log('グラフの公開URLを返すメソッドのテスト');

  Logger.log('食費がURLが取得できること：' + getChartUrl('食費'));
  Logger.log('日用品がURLが取得できること：' + getChartUrl('日用品'));
  Logger.log('交際費がURLが取得できること：' + getChartUrl('交際費'));
  Logger.log('洋服代がURLが取得できること：' + getChartUrl('洋服代'));
  Logger.log('娯楽費がURLが取得できること：' + getChartUrl('娯楽費'));
  Logger.log('交通費がURLが取得できること：' + getChartUrl('交通費'));
  Logger.log('合計がURLが取得できること：' + getChartUrl('合計'));
  
  Logger.log('保険料がURLが取得できないこと：' + getChartUrl('保険料'));
  Logger.log('住居費がURLが取得できないこと：' + getChartUrl('住居費'));
  
  Logger.log('');
}
