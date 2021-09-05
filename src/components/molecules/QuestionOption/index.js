import { Input } from "element-ui";
import QuestionDialog from "../QuestionDialog";
import "./style.scss";
export default {
  props: ["config"],
  data() {
    return {
      value: "",
      optionShow: false,
    };
  },
  render() {
    return (
      <div
        class="question-option"
        {...{
          on: {
            mouseover: () => (this.optionShow = true),
            mouseleave: () => (this.optionShow = false),
          },
        }}
      >
        <div class="question-option-header">
          {this.$scopedSlots.default && this.$scopedSlots.default()}
          {this.config && (
            <div>
              <Input
                value={this.value}
                size="mini"
                class="question-option-input"
              />

              <span
                class="question-option-config"
                style={{
                  cursor: "pointer",
                  visibility: this.optionShow ? "visible" : "hidden",
                }}
                onClick={() => this.$refs.dialog.open()}
              >
                配置事件
              </span>
            </div>
          )}
        </div>
        {this.config && (
          <div class="question-option-description">
            <p>
              后续问题不显示:
              <span class="value">2、3、4、5、6、7、8、9、10</span>
            </p>
            <p>
              增加显示问题:<span class="value">死亡时间</span>
            </p>
            <p>
              发送量表:
              <span class="value">2型糖尿病生活质量评定量表（DMQLS）</span>
            </p>
            <p>
              发送健康宣教:<span class="value">糖友护肝也需有道</span>
            </p>
          </div>
        )}
        <QuestionDialog ref="dialog" />
      </div>
    );
  },
};
