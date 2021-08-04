import * as utils from "./utils";
import _ from "lodash";
let chartIdSeed = 0;
const path = "./template";
export default class Chart {
  constructor(options) {
    this.id = chartIdSeed++;
    this.options = null;
    this.loading = true;
    this.template = null;
    for (const name in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
    if (utils.isEmpty(this.template) && utils.isEmpty(this.options)) {
      throw new Error(
        "[Chart]]template and  options is is needed At least one!"
      );
    }
    if (!utils.isEmpty(this.template) && utils.isEmpty(this.options)) {
      const self = this;
      require([`${path}/${self.template}.js`], ({ default: template }) => {
        this.options = template;
        this.loading = false;
      });
    }
    if (!utils.isEmpty(this.template) && !utils.isEmpty(this.options)) {
      const self = this;
      require([`${path}/${self.template}.js`], ({ default: template }) => {
        this.options = _.merge(_.cloneDeep(template), this.options);
        this.loading = false;
      });
    }
  }
  getTemplate() {
    return this.template;
  }
  getOptions() {
    return this.options;
  }
  getId() {
    return this.id;
  }
}
