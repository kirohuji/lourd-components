import Stack from "../../../utils/Stack";
import { drop } from "lodash";
import DataForm from "../DataForm";
import "./style.scss";
class Question {
  constructor(title, answers) {
    this.type = this.parseType(title);
    this.title = title;
    this.label = title;
    this.value = "";
    this.index = this.setIndex(title);
    this.row = this.index;
    this.question = true;
    this.answers = this.addAnswers(answers);
  }
  parseType(type) {
    let title = type.match(/【.*】/)[0];
    return title;
  }
  setIndex(title) {
    let index = title.match(/[0-9]*、/)[0];
    return Number(index.substring(0, index.length - 1));
  }
  addAnswers(list) {
    let answer = drop(list);
    switch (this.type) {
      case "【单选题】":
        this.use = "radio-group";
        this.children = {
          use: "radio",
          options: answer.map((item) => {
            return {
              label: item,
              value: item,
            };
          }),
        };
        return answer;
      case "【多选题】":
        this.use = "checkbox-group";
        this.children = {
          use: "checkbox",
          options: answer.map((item) => {
            return {
              label: item,
              value: item,
            };
          }),
        };
        return answer;
      case "【评分题】":
        return answer;
      case "【问答题】":
        return answer;
      case "【填空题】":
        return answer;
    }
  }
}
class QuestionList {
  constructor() {
    this.pattern = /[0-9]*、.*/g;
    this.questions = new Map();
  }
  parse(questionsText) {
    this.temp = new Stack();
    const textList = questionsText.split("\n");
    textList.forEach((e) => {
      if (this.pattern.test(e)) {
        if (this.temp.isEmpty()) {
          this.temp.push(e);
        } else {
          let question = this.temp.clear().reverse();
          if (question[0]) {
            this.questions.set(
              question[0],
              new Question(question[0], question)
            );
          }
          this.temp.push(e);
        }
      } else {
        this.temp.push(e);
      }
    });
    if (!this.temp.isEmpty()) {
      let question = this.temp.clear().reverse();
      this.questions.set(question[0], new Question(question[0], question));
    }
  }
}
export default {
  props: ["value", "config"],
  data() {
    return {
      questionList: null,
      questions: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.generate(val);
        }
      },
      immediate: true,
    },
  },
  methods: {
    generate(questionsText) {
      this.questionList = new QuestionList();
      this.questionList.parse(questionsText);
      console.log(this.questionList.questions);
    },
  },
  render() {
    return (
      <div class="question">
        {this.questionList && (
          <DataForm
            {...{
              props: {
                forms: Array.from(this.questionList.questions).map(
                  (item) => item[1]
                ),
                class: "quesitonForm",
                question: this.config,
                data: {},
                layout: {
                  use: "inline",
                  gutter: 20,
                  direction: "column",
                },
              },
            }}
          />
        )}
      </div>
    );
  },
};
