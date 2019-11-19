// 入力フォームの固定IDを取得する変数のテスト
function TestInputFormIds() {
  Logger.log('入力者：' + InputFormIds.InputUser)
  Logger.log('　日　：' + InputFormIds.Day)
  Logger.log('科　目：' + InputFormIds.SubjectName)
  Logger.log('金　額：' + InputFormIds.Amount)
  Logger.log('備　考：' + InputFormIds.Note)
}

// 入力テンプレートの値取得メソッドのテスト
function TestInputTemplates() {
  Logger.log('テンプレート');
  InputTemplates.VariableCost.map(function(value, index){
    Logger.log('ID:' + (index+1) + ', Value:' + value);
  });
  
  Logger.log('固定費テンプレート');
  InputTemplates.FixedCost.map(function(value, index){
    Logger.log('ID:' + (index+1) + ', Value:' + value);
  });  
}
