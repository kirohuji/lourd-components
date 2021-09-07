export class QuestionService {
  constructor(options) {
    for (const name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
  }
  makeUserService({ api }) {
    this.module = "c_admin/questionnaire/followup";
    this.api = api;
    return this;
  }
  // 量表问卷列表
  findForGauge(target) {
    return this.api.post(`${this.module}/getGaugeList`, target);
  }
  // 问题列表
  findForQuestion(target) {
    return this.api.post(`${this.module}/getQuestionList`, target);
  }
  // 宣教列表
  findForInformation(target) {
    return this.api.post(`${this.module}/getInformationList`, target);
  }
}
