function collect(state) {
  this.$children.forEach((child) => {
    if (child.$options.componentName && child.collector) {
      state[child.collector] = child;
    }
    collect.apply(child, [state]);
  });
}
export default {
  methods: {
    collect() {
      const state = {};
      collect.call(this, state);
      return state;
    },
  },
};
