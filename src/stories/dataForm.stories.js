import DataForm from "../components/organisms/DataForm";
import Inline from "../components/molecules/Layout/inline";
export default {
  title: "DataForm",
};
const forms = [
  {
    label: "名称",
    prop: "name",
    use: "label",
  },
  {
    label: "标题",
    prop: "title",
    use: "select",
    size: "mini",
    children: {
      use: "option",
      options: [
        { label: "标题一", value: 1 },
        { label: "标题二", value: 2 },
      ],
    },
  },
];

export const withAttrs = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms,
            data: {
              name: "zyd",
              title: 1,
            },
            layout: {
              use: "inline",
              gutter: 20,
              direction: "column",
            },
          },
        }}
      />
    );
  },
});
export const withScopedSlots = () => ({
  render() {
    return (
      <DataForm
        {...{
          props: {
            forms,
            data: {
              name: "zyd",
              title: 1,
            },
          },
          scopedSlots: {
            default: ({ uses }) => {
              return (
                <Inline
                  length={uses.length}
                  gutter={20}
                  direction="column"
                  uses={uses}
                />
              );
            },
          },
        }}
      />
    );
  },
});
export const withTemplate = () => ({
  components: { DataForm, Inline },
  data() {
    return {
      forms: forms,
      data: {
        name: "zyd",
        title: 1,
      },
    };
  },
  template: `
    <DataForm :forms="forms" :data="data">
      <template v-slot:default="{uses}">
        <Inline
          :length="uses.length"
          :gutter="20"
          direction="column"
          :uses="uses"
        />
      </template>
    </DataForm>
  `,
});
