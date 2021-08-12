import { defaultTo } from "lodash";
export default class Store {
  constructor(options) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    if (this.searcher && !this.searcher.forms) {
      this.searcher.forms = options.schema
        .filter((o) => o.formUse)
        .map((o) => {
          return {
            ...o,
            use: o.formUse,
          };
        });
    }
    if (this.form && !this.form.forms) {
      this.form.forms = options.schema
        .filter((o) => o.formUse)
        .map((o) => {
          return {
            ...o,
            edit: defaultTo(o.edit, true),
            use: o.formUse,
          };
        });
    }
    if (this.table && !this.table.column) {
      this.table.column = options.schema;
    }
  }
}
