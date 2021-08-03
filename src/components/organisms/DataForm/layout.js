class Layout {}
export function createStore(layout, initialState = {}) {
  if (!layout) {
    throw new Error("Layout is required.");
  }

  const store = new Layout();
  store.table = table;
  // fix https://github.com/ElemeFE/element/issues/14075
  // related pr https://github.com/ElemeFE/element/pull/14146
  store.toggleAllSelection = debounce(10, store._toggleAllSelection);
  Object.keys(initialState).forEach((key) => {
    store.states[key] = initialState[key];
  });
  return store;
}

export function mapStates(mapper) {
  const res = {};
  Object.keys(mapper).forEach((key) => {
    const value = mapper[key];
    let fn;
    if (typeof value === "string") {
      fn = function () {
        return this.store.states[value];
      };
    } else if (typeof value === "function") {
      fn = function () {
        return value.call(this, this.store.states);
      };
    } else {
      console.error("invalid value type");
    }
    if (fn) {
      res[key] = fn;
    }
  });
  return res;
}
