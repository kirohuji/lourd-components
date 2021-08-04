import Inline from "../components/molecules/Layout/inline";

export default {
  title: "Layout/Inline",
};

export const withLength25 = () => ({
  render() {
    return <Inline length={25} gutter={20} />;
  },
});
export const withLength25ByColumn = () => ({
  render() {
    return <Inline length={25} gutter={20} direction="column" />;
  },
});
export const withLength25ByWrap = () => ({
  render() {
    return <Inline length={25} gutter={20} wrap="wrap" />;
  },
});
