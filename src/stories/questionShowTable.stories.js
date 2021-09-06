import QuestionShowTable from "../components/template/Questionnaire/components/QuestionShowTable";
import { api } from "@/utils/http";
import Thenable from "@/components/atoms/Thenable";
import { QuestionService } from "./service";

const service = new QuestionService();
service.makeUserService({ api });

export default {
  title: "Design System/Template/Questionnaire/QuestionShowTable",
};
export const withBasic = () => ({
  data() {
    return {
      table: {},
    };
  },
  mounted() {
    service.findForQuestion().then(({ data }) => {
      this.table = data;
    });
  },
  render() {
    return <QuestionShowTable data={this.table.list} />;
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
              service.findForQuestion.bind(service),
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
                  <QuestionShowTable data={data.list} />
                )}
              </div>
            ),
          },
        }}
      />
    );
  },
});
