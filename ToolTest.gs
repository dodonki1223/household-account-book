// 入力テンプレート用のURLのURLパラメータ作成メソッドのテスト
function TestBuildInputFormTemplateParam() {
  Logger.log('入力テンプレート用のURLのURLパラメータ作成メソッドのテスト');
  
  Logger.log('入力者：' + buildInputFormTemplateParam(InputFormIds.InputUser, 'hogehoge'));
  Logger.log('　日　：' + buildInputFormTemplateParam(InputFormIds.Day, nowDate()));
  Logger.log('科　目：' + buildInputFormTemplateParam(InputFormIds.SubjectName, '食費'));
  Logger.log('金　額：' + buildInputFormTemplateParam(InputFormIds.Amount, 9999));
  Logger.log('備　考：' + buildInputFormTemplateParam(InputFormIds.Note, 'fugafuga'));
  
  Logger.log('');
}

// 入力テンプレート用のURLの作成メソッドのテスト
function TestBuildInputFormTemplateUrl() {
  Logger.log('入力テンプレート用のURLの作成メソッドのテスト');
  
  Logger.log('昼食のURL：' + buildInputFormTemplateUrl(getTemplate('昼食', InputTemplates.VariableCost)));
  Logger.log('家賃のURL：' + buildInputFormTemplateUrl(getTemplate('家賃', InputTemplates.FixedCost)));
  
  Logger.log('');
}
