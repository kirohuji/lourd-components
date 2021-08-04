import _ from "lodash";
import { Meteor } from "meteor/meteor";
// import request from "@/utils/request";
import Vue from "vue";
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

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
  removeItem(id) {
    return new Promise((resolve, reject) => {
      Meteor.call("searcher.remove",id, (err, res) => {
        resolve(true);
      });
    });
    // return request({
    //   url: this.url.get("del"),
    //   method: "post",
    //   data: { cacheid: id, scope: this.config.scope },
    // });
  }
  // 请求
  list() {
    return new Promise((resolve, reject) => {
      Meteor.call("searcher.find", (err, res) => {
        resolve({
          data: res
        });
      });
    });
    // return request({
    //   url: this.url.get("list"),
    //   method: "post",
    //   params: {
    //     scope: this.config.scope,
    //   },
    // });
  }
  // 请求
  setItem(name, payload) {
    return new Promise((resolve, reject) => {
      Meteor.call(
        "searcher.insert",
        {
          alias: name,
          label: JSON.stringify(payload),
        },
        (err, res) => {
          resolve(true);
        }
      );
    });
    // return request({
    //   url: this.url.get("add"),
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     ...params,
    //     type: this.config.type,
    //   },
    // });
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
          .then((res) => {
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
export default function (name, scope) {
  return MeteorBackend.getInstance({
    name: `${name}`,
    scope: scope,
  });
}
