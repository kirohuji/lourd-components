import InlineNumber from "../components/molecules/Layout/inline-number";

export default {
  title: "Layout/InlineNumber",
};

export const withLength25By2 = () => ({
  render() {
    return <InlineNumber col={2} length={20} gutter={10} />;
  },
});
export const withLength25By0 = () => ({
  render() {
    return <InlineNumber col={0} length={25} gutter={10} />;
  },
});
