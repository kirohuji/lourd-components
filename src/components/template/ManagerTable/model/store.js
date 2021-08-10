export default class Store {
  constructor(options) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    if (!this.searcher.forms) {
      this.searcher.forms = options.schema
        .filter((o) => o.formUse)
        .map((o) => {
          return {
            ...o,
            use: o.formUse,
          };
        });
    }
    if (!this.table.column) {
      this.table.column = options.schema;
    }
  }
}
