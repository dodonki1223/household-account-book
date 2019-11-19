// SettingSheet.gsのテストを全て実行する
function TestSettingSheet() {
  TestInputFormIds();
  TestInputTemplates();
  TestGetTemplate();
}

// 入力フォームの固定IDを取得する変数のテスト
function TestInputFormIds() {
  Logger.log('入力フォームの固定IDを取得する変数のテスト');

  Logger.log('入力者：' + InputFormIds.InputUser)
  Logger.log('　日　：' + InputFormIds.Day)
  Logger.log('科　目：' + InputFormIds.SubjectName)
  Logger.log('金　額：' + InputFormIds.Amount)
  Logger.log('備　考：' + InputFormIds.Note)
  Logger.log('');
}

// 入力テンプレートの値取得メソッドのテスト
function TestInputTemplates() {
  Logger.log('入力テンプレートの値取得メソッドのテスト');

  Logger.log('テンプレート');
  InputTemplates.VariableCost.map(function(value, index){
    Logger.log('ID:' + (index+1) + ', Value:' + value);
  });
  
  Logger.log('固定費テンプレート');
  InputTemplates.FixedCost.map(function(value, index){
    Logger.log('ID:' + (index+1) + ', Value:' + value);
  });  
  Logger.log('');
}

// テンプレート値を取得するメソッドのテスト
function TestGetTemplate(){
  Logger.log('テンプレート値を取得するメソッドのテスト');

  // 「通常のもの」のテンプレートの値を取得
  Logger.log(getTemplate('昼食', InputTemplates.VariableCost));
  Logger.log(getTemplate('夕飯', InputTemplates.VariableCost));
  Logger.log(getTemplate('スーパー', InputTemplates.VariableCost));
  
  // 「固定費」のテンプレートの値を取得
  Logger.log(getTemplate('家賃', InputTemplates.FixedCost));
  
  Logger.log('');
}
