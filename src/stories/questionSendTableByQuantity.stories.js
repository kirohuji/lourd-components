import QuestionSendTableByQuantity from "../components/template/Questionnaire/components/QuestionSendTableByQuantity";
import { api } from "@/utils/http";
import { QuestionService } from "./service";
import Thenable from "@/components/atoms/Thenable";
const service = new QuestionService();
service.makeUserService({ api });

export default {
  title: "Design System/Template/Questionnaire/QuestionSendTableByQuantity",
};
export const withBasic = () => ({
  render() {
    return <QuestionSendTableByQuantity />;
  },
});
export const withThenable = () => ({
  data() {
    return {
      table: {},
    };
  },
  render() {
    return (
      <Thenable
        {...{
          props: {
            runner: [
              service.findForGauge.bind(service),
              {},
              (data) => {
                return data;
              },
            ],
          },
          scopedSlots: {
            default: ({ result: { loading, data } }) => (
              <div>
                {loading ? (
                  <div>加载中</div>
                ) : (
                  <QuestionSendTableByQuantity data={data.list} />
                )}
              </div>
            ),
          },
        }}
      />
    );
  },
});
