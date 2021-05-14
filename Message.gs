/**
 * 対象項目の今月の支出情報を取得する
 * @param {String} [subjectName] - カラム名
 * @return {Array} 今月の支出情報
 */
function paymentInfo(subjectName) {
  var index = getTargetSubjectIndex(subjectName);

  var isBelowForLastMonth = getNowStatusValues(index)[4][0] <= 0
  var belowMessage = isBelowForLastMonth ? 'いい調子だ！😍' : 'ふーむ🤔\n先月よりも使い込んでいるな😭\n気合を入れろ！'
  var paymentInfo = '⭐今月の' + subjectName + '⭐ ' + '\n\n' +
                    '本日支出額：' + numberToJPYFormat(getTodayStatus(index)) + '\n' +
                    '１ヶ月合計：' + numberToJPYFormat(getNowStatusValues(index)[0][0]) + '\n' +
                    '１日の平均：' + numberToJPYFormat(getNowStatusValues(index)[1][0]) + '\n' +
                    '１週間平均：' + numberToJPYFormat(getNowStatusValues(index)[2][0]) + '\n' +
                    '今月の予測：' + numberToJPYFormat(getNowStatusValues(index)[3][0]) + '\n' +
                    '先月費差異：' + numberToJPYFormat(getNowStatusValues(index)[4][0]) + '\n' +
                    '今月の残額：' + numberToJPYFormat(getNowStatusValues(index)[5][0]) + '\n\n' +
                    belowMessage;

  // 本当は画像送信メッセージを使用したいがグラフの公開URLがCanvasで描かれているため使用出来ず……Orz
  var message = isExistsChart(subjectName) ? [paymentInfo ,'グラフを出しとくね🙄\n' + ChartList[subjectName]] : [paymentInfo];
  return message;
}

/**
 * 今月の家計簿のシートのURLを返す
 * @return {String} 今月の家計簿のシートのURL
 */
function householdAccountBookUrl() {
  return '今月の家計簿のURLです！' + '\n\n' + Config.HouseholdAccountBookUrl;
}

/**
 * 入力された内容に回答出来ない時のメッセージ
 * @return {String} 入力された内容に回答出来ない時のメッセージ
 */
function notExistsMessage() {
  return 'そのメッセージに回答する答えが存在しないよ😭';
}

/**
 * LINE BOTの使い方のヘルプメッセージを返す
 * @return {String} ヘルプメッセージ
 */
function helpMessage() {
  return '⭐BOTに話しかけよう⭐' + '\n\n' +
         '　　家計簿：今月の家計簿のURL' + '\n' +
         '　科目結果：科目毎の結果表示' + '\n' +
         '　　科目名：対象科目の結果表示' + '\n' +
         '今日の結果：今日の結果を表示' + '\n' +
         '　　　入力：入力用URL' + '\n' +
         '入力固定費：固定費の入力用URL' + '\n' +
         '　　ヘルプ：リファレンスを表示';
}

/**
 * 今日の結果通知用のメッセージを返す
 * @return {String} 今日の結果通知用のメッセージ
 */
function summaryMessage() {
  var addedSpaceSubjects = addedSpaceArray(SubjectList.VariableCost)
  var message = '今月の支出状況を通知するよー🌝\n\n'; 
  addedSpaceSubjects.forEach(function (subject) {
    var index = getTargetSubjectIndex(subject.replace('　', ''));
    var sumValue = numberToJPYFormat(getNowStatusValues(index)[0][0]);
    message += subject + '：' + sumValue + '\n'
  });

  var balanceValue = getSheet('今月').getRange('J38').getValues()[0];
  var subjectList = SubjectList.VariableCost;
  subjectList.push('残額');
  var subjects = addedSpaceArray(SubjectList.VariableCost);
  var balanceSubject = subjects[subjects.length - 1];
  message = message + balanceSubject + '：' + numberToJPYFormat(balanceValue);

  return message;
}

/**
 * 今月の最終結果通知用のメッセージを返す
 * @return {Array} 今月の最終結果通知用のメッセージを返す
 */
function incomeAndExpenditureForThisMonthMessage() {
  var aggregateMessage = '今月の最終結果を通知するよー🌝\n\n';
  var aggregateSubjectList = addedSpaceArray(AggregateSubjectList.Aggregate);

  aggregateSubjectList.forEach(function (subject, index) {
    aggregateMessage += subject + '：' + numberToJPYFormat(AggregateValues.Aggregate[index]) + '\n'
  });
  
  var messages = [];
  messages.push(aggregateMessage.slice(0, -1));

  var detailMessage = '詳細でガンス😇\n\n';
  var detailSubjectList = AggregateSubjectList.VariableCost;
  detailSubjectList = detailSubjectList.concat(AggregateSubjectList.FixedCost);
  detailSubjectList = detailSubjectList.concat(AggregateSubjectList.Income);
  detailSubjectList = addedSpaceArray(detailSubjectList);
  
  var detailValues = AggregateValues.VariableCost;
  detailValues = detailValues.concat(AggregateValues.FixedCost);
  detailValues = detailValues.concat(AggregateValues.Income);

  detailSubjectList.forEach(function (subject, index) {
    detailMessage += subject + '：' + numberToJPYFormat(detailValues[index]) + '\n'
  });
  messages.push(detailMessage.slice(0, -1));

  return messages;
}

/**
 * LineにPostするメッセージ情報
 * @param {String} [message] - メッセージ
 * @return {Array} メッセージの情報
 */
function buildMessage(message) {
  return [{
      'type': 'text',
      'text': message
      }];
}

/**
 * LineにPostするメッセージ情報(複数バージョン)
 * @param {Array} [messages] - メッセージ
 * @return {Array} メッセージの情報
 */
function buildMessages(messages) {
  return messages.map(function(message){
    return {
      'type': 'text',
      'text': message
    }
  });
}

/**
 * LineにPostするクイックリプライメッセージ情報
 * @param {String} [message] - メッセージ
 * @param {Array} [quickReply] - クイックリプライ用のメッセージ
 * @return {Array} クイックリプライメッセージの情報
 */
function buildQuickReplyMessages(message, quickReply) {
  return [{
      'type': 'text',
      'text': message,
      'quickReply': {
        'items': quickReply
      }
  }]
}

/**
 * クイックリプライメッセージのitemオブジェクト作成（配列用）
 * @param {Array} [values] - 配列の値
 * @return {Array} クイックリプライメッセージのitem
 */
function buildQuickReplyItemsForArray(values) {
  return values.map(function(value){
    return {
      'type': 'action',
      'action': {
        'type': 'message',
        'label': value,
        'text': value
      }
    };
  });
}

/**
 * クイックリプライメッセージのitemオブジェクト作成（入力テンプレート用）
 * @param {Array} [keys] - テンプレートのキーリスト
 * @param {Array} [templateValues] - テンプレートの値
 * @return {Array} クイックリプライメッセージのitem
 */
function buildQuickReplyItemsForTemplates(keys, templateValues) {
  return keys.map(function(key){
    return {
      'type': 'action',
      'action': {
        'type': 'message',
        'label': key,
        'text': buildInputFormTemplateUrl(getTemplate(key, templateValues))
      }
    };
  });
}
