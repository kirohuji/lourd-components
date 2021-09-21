import { has } from "lodash";
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
        .filter((o) => !!o["searcher"])
        .map((o) => {
          return {
            ...o,
            ...o["searcher"],
          };
        });
    }
    if (this.forms && !this.forms.forms) {
      this.forms.forms = options.schema
        .filter((o) => !!o["forms"])
        .map((o) => {
          return {
            ...o,
            ...o["forms"],
            edit: has(o["forms"], "edit") ? !o["forms"].edit : false,
            add: has(o["forms"], "add") ? !o["forms"].add : false,
          };
        });
    }
    if (this.table && !this.table.column) {
      this.table.column = options.schema;
    }
    this.breadcrumb = [
      {
        label: "根节点",
      },
    ];
  }
}
