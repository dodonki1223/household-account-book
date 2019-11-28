// ThisMonthSheet.gsのテストを全て実行する
function TestThisMonthSheet() {
  TestSubjectList();
  TestIsExistsSubject();
  TestGetTargetSubjectIndex();
  TestGetTodayStatus();
  TestGetNowStatusValues();
}

// 科目名の一覧の変数のテスト
function TestSubjectList() {
  Logger.log('科目名の一覧の変数のテスト');
  
  Logger.log('通常科目一覧：' + SubjectList.VariableCost);
  Logger.log('固定費科目一覧：' + SubjectList.FixedCost);
  
  Logger.log('');
}

// 対象のカラム名存在するか？のメソッドのテスト
function TestIsExistsSubject() {
  Logger.log('対象のカラム名存在するか？のメソッドのテスト');

  // 通常科目
  Logger.log('食費：' + isExistsSubject('食費'));
  Logger.log('日用品：' + isExistsSubject('日用品'));
  Logger.log('医療費：' + isExistsSubject('医療費'));
  Logger.log('交際費：' + isExistsSubject('交際費'));
  Logger.log('洋服代：' + isExistsSubject('洋服代'));
  Logger.log('娯楽費：' + isExistsSubject('娯楽費'));
  Logger.log('雑費：' + isExistsSubject('雑費'));
  Logger.log('合計：' + isExistsSubject('合計'));
  
  // 固定費科目
  Logger.log('住居費：' + isExistsSubject('住居費'));
  Logger.log('借金返済：' + isExistsSubject('借金返済'));
  Logger.log('通信費：' + isExistsSubject('通信費'));
  Logger.log('保険料：' + isExistsSubject('保険料'));
  Logger.log('水道光熱費：' + isExistsSubject('水道光熱費'));
  Logger.log('交通費：' + isExistsSubject('交通費'));
  Logger.log('固定費合計：' + isExistsSubject('固定費合計'));

  // 存在しない科目
  Logger.log('hoge：' + isExistsSubject('hoge'));
  
  Logger.log('');
}

// 対象カラムのインデックスを取得するメソッドのテスト
function TestGetTargetSubjectIndex() {
  Logger.log('対象カラムのインデックスを取得するメソッドのテスト');

  var sheet = getSheet('今月');
  
  // 通常科目
  Logger.log('食費であること：' + sheet.getRange(1, getTargetSubjectIndex('食費')).getValues()[0][0]);
  Logger.log('日用品であること：' + sheet.getRange(1, getTargetSubjectIndex('日用品')).getValues()[0][0]);
  Logger.log('医療費であること：' + sheet.getRange(1, getTargetSubjectIndex('医療費')).getValues()[0][0]);
  Logger.log('交際費であること：' + sheet.getRange(1, getTargetSubjectIndex('交際費')).getValues()[0][0]);
  Logger.log('洋服代であること：' + sheet.getRange(1, getTargetSubjectIndex('洋服代')).getValues()[0][0]);  
  Logger.log('娯楽費であること：' + sheet.getRange(1, getTargetSubjectIndex('娯楽費')).getValues()[0][0]);
  Logger.log('雑費であること：' + sheet.getRange(1, getTargetSubjectIndex('雑費')).getValues()[0][0]);
  Logger.log('合計であること：' + sheet.getRange(1, getTargetSubjectIndex('合計')).getValues()[0][0]);

  // 固定費科目
  Logger.log('住居費であること：' + sheet.getRange(1, getTargetSubjectIndex('住居費')).getValues()[0][0]);
  Logger.log('借金返済であること：' + sheet.getRange(1, getTargetSubjectIndex('借金返済')).getValues()[0][0]);
  Logger.log('通信費であること：' + sheet.getRange(1, getTargetSubjectIndex('通信費')).getValues()[0][0]);
  Logger.log('保険料であること：' + sheet.getRange(1, getTargetSubjectIndex('保険料')).getValues()[0][0]);
  Logger.log('水道光熱費であること：' + sheet.getRange(1, getTargetSubjectIndex('水道光熱費')).getValues()[0][0]);
  Logger.log('交通費であること：' + sheet.getRange(1, getTargetSubjectIndex('交通費')).getValues()[0][0]);
  Logger.log('固定費合計であること：' + sheet.getRange(1, getTargetSubjectIndex('固定費合計')).getValues()[0][0]);

  // 存在しない科目
  Logger.log('食費であること：' + sheet.getRange(1, getTargetSubjectIndex('hogehogefugafua')).getValues()[0][0]);
  
  Logger.log('');
}

// 対象の項目の当日の支出額を取得するメソッドのテスト
function TestGetTodayStatus() {
  Logger.log('対象の項目の当日の支出額を取得するメソッドのテスト');

  var sheet = getSheet('今月');
  var today = new Date();

  // 通常科目
  Logger.log('今日の食費が取得できていること' + sheet.getRange(today.getDate() + 1, 3).getValues()[0][0] + ':' + getTodayStatus(3));
  Logger.log('今日の日用品が取得できていること' + sheet.getRange(today.getDate() + 1, 4).getValues()[0][0] + ':' + getTodayStatus(4));
  Logger.log('今日の医療費が取得できていること' + sheet.getRange(today.getDate() + 1, 5).getValues()[0][0] + ':' + getTodayStatus(5));
  Logger.log('今日の交際費が取得できていること' + sheet.getRange(today.getDate() + 1, 6).getValues()[0][0] + ':' + getTodayStatus(6));
  Logger.log('今日の洋服代が取得できていること' + sheet.getRange(today.getDate() + 1, 7).getValues()[0][0] + ':' + getTodayStatus(7));
  Logger.log('今日の娯楽費が取得できていること' + sheet.getRange(today.getDate() + 1, 8).getValues()[0][0] + ':' + getTodayStatus(8));
  Logger.log('今日の雑費が取得できていること' + sheet.getRange(today.getDate() + 1, 9).getValues()[0][0] + ':' + getTodayStatus(9));  
  Logger.log('今日の合計が取得できていること' + sheet.getRange(today.getDate() + 1, 10).getValues()[0][0] + ':' + getTodayStatus(10));  

  // 固定費科目
  Logger.log('今日の住居費が取得できていること' + sheet.getRange(today.getDate() + 1, 11).getValues()[0][0] + ':' + getTodayStatus(11));
  Logger.log('今日の借金返済が取得できていること' + sheet.getRange(today.getDate() + 1,12).getValues()[0][0] + ':' + getTodayStatus(12));
  Logger.log('今日の通信費が取得できていること' + sheet.getRange(today.getDate() + 1, 13).getValues()[0][0] + ':' + getTodayStatus(13));
  Logger.log('今日の保険料が取得できていること' + sheet.getRange(today.getDate() + 1, 14).getValues()[0][0] + ':' + getTodayStatus(14));
  Logger.log('今日の水道光熱費が取得できていること' + sheet.getRange(today.getDate() + 1, 15).getValues()[0][0] + ':' + getTodayStatus(15));
  Logger.log('今日の交通費が取得できていること' + sheet.getRange(today.getDate() + 1, 16).getValues()[0][0] + ':' + getTodayStatus(16));
  Logger.log('今日の合計（固定費）が取得できていること' + sheet.getRange(today.getDate() + 1, 17).getValues()[0][0] + ':' + getTodayStatus(17));  
  
  Logger.log('');
}

// 対象の項目の合計、１日平均、１週間平均、今月料金予測、先月費差異の値を取得するメソッドのテスト
function TestGetNowStatusValues() {
  Logger.log('対象の項目の合計、１日平均、１週間平均、今月料金予測、先月費差異の値を取得するメソッドのテスト');

  var sheet = getSheet('今月');

  Logger.log('合計値が取得できること(' + sheet.getRange(33, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[0][0]);
  Logger.log('１日平均が取得できること(' + sheet.getRange(34, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[1][0]);
  Logger.log('１週間平均が取得できること(' + sheet.getRange(35, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[2][0]);
  Logger.log('今月料金予測が取得できること(' + sheet.getRange(36, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[3][0]);
  Logger.log('先月費差異が取得できること(' + sheet.getRange(37, 3).getValues()[0][0] + ')：' + getNowStatusValues(3)[4][0]);
  
  Logger.log('');
}
