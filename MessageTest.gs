// Message.gsのテストを全て実行する
function TestMessage() {
  TestPaymentInfo();
}

// 対象項目の今月の支出情報を取得するメソッドのテスト
function TestPaymentInfo() {
  Logger.log('対象項目の今月の支出情報を取得するメソッドのテスト');

  Logger.log(paymentInfo('食費'));
  Logger.log(paymentInfo('日用品'));
  Logger.log(paymentInfo('娯楽費'));
  Logger.log(paymentInfo('住居費'));
  
  Logger.log('');
}

function TestSummaryMessage() {
  Logger.log('今月の支出状況を出力するメソッドのテスト');

  Logger.log(summaryMessage());
  
  Logger.log('');
}
