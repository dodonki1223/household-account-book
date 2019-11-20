// 入力フォームの固定ID
var InputFormIds = {
  InputUser  : getSheet('設定').getRange('C3').getValues()[0],
  Day        : getSheet('設定').getRange('C4').getValues()[0],
  SubjectName: getSheet('設定').getRange('C5').getValues()[0],
  Amount     : getSheet('設定').getRange('C6').getValues()[0],
  Note       : getSheet('設定').getRange('C7').getValues()[0],
  
};

// 入力用テンプレートの値
var InputTemplates = {
  VariableCost: getInputTemplates('G3:L15'), // 通常のもの
  FixedCost   : getInputTemplates('P3:U15'), // 固定費
}

// 入力用テンプレートのKeyリスト
var InputTemplateKeys = {
  VariableCost: getKeyList(InputTemplates.VariableCost),
  FixedCost   : getKeyList(InputTemplates.FixedCost)
}

/**
 * 入力テンプレートを取得
 * @param {String} [range] - 入力テンプレートRange
 * @return {Array} 入力テンプレートの値
 */
function getInputTemplates(range) {
  var sheet = getSheet('設定');
  var values = sheet.getRange(range).getValues().filter(function(value) {
    // テンプレート名が空のものを排除する
    return value[0] != '';
  });
  return values;
}

/**
 * テンプレート値を取得
 * @param {String} [keyName] - テンプレートキー名
 * @param {Array} [templateValues] - 入力テンプレートの値
 * @return {Array} テンプレートキー名の値
 */
function getTemplate(keyName, templateValues) {
  for (i = 0; i < templateValues.length; i++) {
    if(templateValues[i][0] == keyName) return templateValues[i];
  }
}

/**
 * テンプレートのKey名リストを取得
 * @param {Array} [templateValues] - 入力テンプレートの値
 * @return {Array} テンプレートキー名リスト
 */
function getKeyList(templateValues) {
  return templateValues.map(function(value){
    return value[0];
  });
}
