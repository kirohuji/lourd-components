import _ from "lodash";
import Vue from "vue";
/**
 *
 * @param {*} name 仓库名
 */
function Store(name) {
  Vue.set(this, "isLoading", false);
  this.name = name;
  if (this.isAsync()) {
    this.refresh();
  } else {
    const store = this.datasource().getItem(this.name);
    this.records = (store && store.split(",")) || [];
  }
}

_.extend(Store.prototype, {
  jsonData: function (data) {
    return data && JSON.parse(data);
  },
  find: function (model) {
    return this.jsonData(this.datasource().getItem(this.name + "-" + model.id));
  },
});
class MeteorBackend {
  // eslint-disable-next-line no-undef
  static _instance = new Map();
  constructor(config) {
    this.config = config;
    if (config.override) {
      for (const name in config.override) {
        // eslint-disable-next-line no-prototype-builtins
        if (config.override.hasOwnProperty(name)) {
          this[name] = config.override[name];
        }
      }
    }
    this.init();
  }
  static getInstance(config) {
    window.Backend = this._instance;
    const name = `${config.name}-searcher`;
    if (!this._instance.get(name)) {
      this._instance.set(name, new MeteorBackend(config));
    }
    return this._instance.get(name).store;
  }
  init() {
    this.url = new Map(this.config.urls);
    this.extend();
    this.store = new Store(`${this.config.name}-searcher`);
  }
  // 获取索引
  getItem(model) {
    let cacheid;
    if (typeof model === "string") {
      const strings = model.split("-");
      cacheid = strings[strings.length - 1];
    } else {
      cacheid = model.cacheid || model.name;
    }
    return _.find(
      this.store.records,
      (o) => o.cacheid == Number(cacheid) || o.name == cacheid
    );
  }
  // 请求
  removeItem() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  // 请求
  list() {
    return new Promise((resolve) => {
      resolve({
        data: [],
      });
    });
  }
  // 请求
  setItem() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
  select(name, payload) {
    localStorage.setItem(name, JSON.stringify(payload));
  }
  current(name) {
    return localStorage.getItem(name);
  }
  clearSelected(name) {
    localStorage.removeItem(name);
  }
  extend() {
    const _self = this;
    _.extend(Store.prototype, {
      isAsync() {
        return true;
      },
      datasource() {
        return _self;
      },
      findAll: function () {
        return this.records;
      },
      destroy: function (model) {
        return this.datasource().removeItem(model.cacheid);
      },
      refresh: function () {
        Vue.set(this, "isLoading", false);
        return this.datasource()
          .list()
          .then((res) => {
            console.log('refresh',res)
            Vue.set(
              this,
              "records",
              res.data.map((m) => {
                return {
                  cacheid: m.alias,
                  id: m._id,
                  name: m.alias,
                  data: this.jsonData(m.label),
                };
              })
            );
          })
          .finally(() => {
            Vue.set(this, "isLoading", true);
          });
      },
      create: function (model) {
        Vue.set(this, "isLoading", false);
        return this.datasource()
          .setItem(model.name, model.data)
          .then(() => {
            this.select(model);
            return this.refresh();
          })
          .finally(() => {
            Vue.set(this, "isLoading", true);
          });
      },
      select: function (model) {
        this.datasource().select(this.name + "-selected", model);
        return model;
      },
      current: function () {
        return this.jsonData(
          this.datasource().current(this.name + "-selected")
        );
      },
      fetchCurrent: function (name) {
        this.select(
          this.jsonData(localStorage.getItem(`${name}-searcher-selected`))
        );
      },
      clearSelected() {
        this.datasource().clearSelected(this.name + "-selected");
      },
    });
  }
}
export default function (name, scope, override = {}) {
  return MeteorBackend.getInstance({
    name: `${name}`,
    scope: scope,
    override: override,
  });
}
