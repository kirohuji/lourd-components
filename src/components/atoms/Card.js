export default {
  render() {
    return (
      <div
        style={{
          background: "#fff",
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    );
  },
};
