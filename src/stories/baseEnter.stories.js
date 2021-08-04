import BaseEnter from "../components/molecules/BaseEnter";

export default {
  title: "molecules/BaseEnter",
};

export const withJSX = () => ({
  data: () => ({
    value: 1,
  }),
  render() {
    return (
      <BaseEnter
        use="select"
        size="mini"
        children={{
          use: "option",
          options: [
            { label: 1, value: 1 },
            { label: 2, value: 2 },
          ],
        }}
        vModel={this.value}
      />
    );
  },
});
