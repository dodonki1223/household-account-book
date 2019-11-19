// 入力フォームの固定ID
var InputFormIds = {
  InputUser  : getSheet('入力フォーム設定').getRange('C3').getValues()[0],
  Day        : getSheet('入力フォーム設定').getRange('C4').getValues()[0],
  SubjectName: getSheet('入力フォーム設定').getRange('C5').getValues()[0],
  Amount     : getSheet('入力フォーム設定').getRange('C6').getValues()[0],
  Note       : getSheet('入力フォーム設定').getRange('C7').getValues()[0],
  
};

// 入力用テンプレートの値
var InputTemplates = {
  VariableCost: getInputTemplates('G3:L15'), // 通常のもの
  FixedCost   : getInputTemplates('P3:U15'), // 固定費
}

/**
 * 入力テンプレートを取得
 * @param {String} [range] - 入力テンプレートRange
 * @return {Array} 入力テンプレートの値
 */
function getInputTemplates(range) {
  var sheet = getSheet('入力フォーム設定');
  var values = sheet.getRange(range).getValues().filter(function(value) {
    // テンプレート名が空のものを排除する
    return value[0] != '';
  });
  return values;
}
