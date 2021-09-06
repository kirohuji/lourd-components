import { Tabs, TabPane } from "element-ui";
import QuestionHideTable from "../QuestionHideTable";
import QuestionShowTable from "../QuestionShowTable";
import QuestionSendTableByQuantity from "../QuestionSendTableByQuantity";
import QuestionSendTableByMission from "../QuestionSendTableByMission";
export default {
  data() {
    return {
      active: "first",
      tabs: [
        {
          label: "后续问题不显示",
          name: "first",
          scopedSlots: () => <QuestionHideTable />,
        },
        {
          label: "增加显示问题",
          name: "second",
          scopedSlots: () => <QuestionShowTable />,
        },
        {
          label: "发送量表",
          name: "third",
          scopedSlots: () => <QuestionSendTableByQuantity />,
        },
        {
          label: "发送健康宣教",
          name: "fourth",
          scopedSlots: () => <QuestionSendTableByMission />,
        },
      ],
    };
  },
  render() {
    return (
      <Tabs vModel={this.active}>
        {this.tabs.map((item) => (
          <TabPane
            {...{
              props: item,
            }}
          >
            {item.scopedSlots ? item.scopedSlots : item.label}
          </TabPane>
        ))}
      </Tabs>
    );
  },
};
