// 対象項目の今月の支出情報を取得するメソッドのテスト
function TestPaymentInfo() {
  Logger.log(paymentInfo('食費'));
  Logger.log(paymentInfo('日用品'));
  Logger.log(paymentInfo('娯楽費'));
  Logger.log(paymentInfo('住居費'));
}
