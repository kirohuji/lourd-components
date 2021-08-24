import { has, unionBy, sortBy } from "lodash";
export default class Store {
  constructor(options) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    if (this.searcher && options.schema) {
      this.searcher.forms = sortBy(
        unionBy(
          this.searcher.forms,
          options.schema
            .filter((o) => !!o["searcher"])
            .map((o) => {
              return {
                ...o,
                ...o["searcher"],
              };
            }),
          "prop"
        ),
        ["order"]
      );
    }
    if (this.forms && options.schema) {
      this.forms.forms = sortBy(
        unionBy(
          this.forms.forms,
          options.schema
            .filter((o) => !!o["forms"])
            .map((o) => {
              return {
                ...o,
                ...o["forms"],
                edit: has(o["forms"], "edit") ? !o["forms"].edit : false,
                add: has(o["forms"], "add") ? !o["forms"].add : false,
              };
            }),
          "prop"
        ),
        ["order"]
      );
    }
    if (this.table && !this.table.column) {
      this.table.column = options.schema;
    }
  }
}
