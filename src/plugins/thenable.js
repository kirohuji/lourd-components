import _ from "lodash";
import Vue from "vue";
Vue.prototype.$cache = {};
window.cache = Vue.prototype.$cache;
import { dictionaries } from "../composables/context-cache";
export class Thenable {
  constructor({
    vm,
    runner,
    variables,
    callback,
    immediate,
    data,
    target,
    cache,
  }) {
    if (Array.isArray(runner)) {
      this.runner = runner[0];
      this.variables = runner[1];
      this.callback = runner[2];
    } else {
      this.runner = runner;
      this.variables = variables;
      this.callback = callback;
    }
    if (!this.callback) {
      this.callback = (data) => data;
    }
    this.cache = cache;
    this._watchers = [];
    this.vm = vm;
    this.immediate = immediate;
    this.listeners(variables);
    this.target = target;
    this.init(data);
    if (this.immediate) {
      this.run();
      this.immediate = true;
    } else {
      this.result.loading = false;
    }
    if (this.vm) {
      for (var key in this.variables) {
        this.defineReactiveSetter(key, key, true);
      }
    }
  }
  get loading() {
    return this.result.loading;
  }
  init(data) {
    this.result = Vue.observable({
      loading: true,
      error: false,
      data: data,
    });
  }
  listeners(variables) {
    if (typeof this.variables === "function") {
      this.variablesIsFunction = this.variables;
      this.variables = variables.call(this.vm);
    } else {
      this.variablesIsFunction = variables;
    }
  }
  destroy() {
    for (
      let _i = 0, _this$_watchers = this._watchers;
      _i < _this$_watchers.length;
      _i++
    ) {
      const unwatch = _this$_watchers[_i];
      unwatch();
    }
    for (const key in this.queries) {
      this.queries[key].destroy();
    }
  }
  defineReactiveSetter(key, func, deep) {
    const _this = this;
    this._watchers.push(
      this.vm.$watch(
        func,
        function (value) {
          _this.variables[func] = value;
          if (_this.immediate) {
            _this.run();
          }
        },
        {
          immediate: false,
          deep: deep,
        }
      )
    );
  }
  refresh(search) {
    this.run(search);
  }
  run(search = {}) {
    if (this.cache) {
      if (!window.cache[this.cache]) {
        window.cache[this.cache] = dictionaries(this.cache);
      } else {
        this.result.data = window.cache[this.cache]();
        this.result.loading = false;
        return;
      }
    }
    this.result.loading = true;
    let variables;
    if (typeof this.variablesIsFunction === "function") {
      variables = this.variablesIsFunction.call(this.vm);
      this.variables = variables;
    } else {
      variables = this.variables;
    }
    this.runner({
      ...variables,
      ...search,
    })
      .then((res) =>
        this.vm
          ? this.callback.call(this.vm, res.data)
          : this.callback(res.data)
      )
      .then((res) => {
        if (this.target) {
          if (typeof res === "object" && !Array.isArray(res)) {
            const t = _.get(this.vm, this.target);
            Object.keys(res).forEach((key) => {
              t[key] = res[key];
            });
            _.set(this.vm, this.target, t);
          } else {
            _.set(this.vm, this.target, res);
          }
        }
        if (this.cache) {
          window.cache[this.cache](() => res);
        }
        this.result.data = res;
        this.result.loading = false;
      })
      .catch((e) => {
        console.log(e);
        this.result.loading = false;
      });
  }
}
const ThenableProvider = {};
// 全局的Thenable
// class DollarThenable {
//   constructor(vm) {
//     this._watchers = []
//     this.vm = vm
//     this.queries = {}
//     this.loadingKey = undefined
//     this.error = undefined
//   }
//   query(options) {
//     console.log('查询')
//   }
//   loading() {
//     return this.vm.$data.$_thenable.loading !== 0
//   }
//   data() {
//     return this.vm.$data.$_thenable.data
//   }
//   defineReactiveSetter(key, func, deep) {
//     const _this = this

//     this._watchers.push(
//       this.vm.$watch(
//         func,
//         function(value) {
//           _this[key] = value
//         },
//         {
//           immediate: true,
//           deep: deep
//         }
//       )
//     )
//   }
//   destroy() {
//     for (let _i = 0, _this$_watchers = this._watchers; _i < _this$_watchers.length; _i++) {
//       const unwatch = _this$_watchers[_i]
//       unwatch()
//     }
//     for (const key in this.queries) {
//       this.queries[key].destroy()
//     }
//   }
// }
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }

  return target;
}
function destroy() {
  if (this.$_thenable) {
    this.$_thenable.destroy();
  }
}
function hasProperty(holder, key) {
  return (
    typeof holder !== "undefined" &&
    Object.prototype.hasOwnProperty.call(holder, key)
  );
}
function proxyData() {
  var _this = this;

  this.$_thenableInitData = {};
  var thenable = this.$options.thenable;

  if (thenable) {
    var _loop = function _loop(key) {
      // debugger
      if (key.charAt(0) !== "$") {
        var options = thenable[key]; // Property proxy
        if (
          !options.manual &&
          !hasProperty(_this.$options.props, key) &&
          !hasProperty(_this.$options.computed, key) &&
          !hasProperty(_this.$options.methods, key)
        ) {
          Object.defineProperty(_this, key, {
            get: function get() {
              return _this.$data.$thenableData.data[key];
            },
            // For component class constructor
            set: function set(value) {
              return (_this.$_thenableInitData[key] = value);
            },
            enumerable: true,
            configurable: true,
          });
        }
      }
    };

    // watchQuery
    for (var key in thenable) {
      _loop(_.get(key.target) || key);
    }
  }
}
function launch() {
  var _this = this;

  if (this._thenableLaunched) return;
  this._thenableLaunched = true; // Prepare properties

  var thenable = _.cloneDeep(this.$options.thenable);

  if (thenable) {
    this.$_thenablePromises = [];

    if (!thenable.$init) {
      thenable.$init = true; // Default options applied to `apollo` options
      thenable = this.$options.thenable = Object.assign({}, thenable);
    }
    Object.defineProperty(this, "$thenableData", {
      get: function get() {
        return _this.$data.$thenableData;
      },
      enumerable: true,
      configurable: true,
    });
    for (var key in thenable) {
      if (key.charAt(0) !== "$") {
        thenable[key] = new Thenable({
          vm: _this,
          ...this.$options.thenable[key].call(_this),
        });
        _this[key] = this.$options.thenable[key];
      }
    }
  }
}
function installMixin(Vue) {
  Vue.mixin(
    _objectSpread2(
      _objectSpread2(
        {},
        {
          data: function data() {
            return {
              $thenableData: {
                data: this.$_thenableInitData,
              },
            };
          },
          beforeCreate: function beforeCreate() {
            proxyData.call(this);
          },
        }
      ),
      {},
      {
        created: launch,
        destroyed: destroy,
      }
    )
  );
}
var keywords = ["$subscribe"];
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  var vueVersion = Vue.version.substr(0, Vue.version.indexOf("."));
  var merge = Vue.config.optionMergeStrategies.methods;

  Vue.config.optionMergeStrategies.thenable = function (toVal, fromVal) {
    if (!toVal) return fromVal;
    if (!fromVal) return toVal;
    var toData = Object.assign({}, _.omit(toVal, keywords), toVal.data);
    var fromData = Object.assign({}, _.omit(fromVal, keywords), fromVal.data);
    var map = {};

    for (var i = 0; i < keywords.length; i++) {
      var key = keywords[i];
      map[key] = merge(toVal[key], fromVal[key]);
    }

    return Object.assign(map, merge(toData, fromData));
  }; // Lazy creation
  // 全局设置了一个$thenable
  // if (!Object.prototype.hasOwnProperty.call(Vue, '$thenable')) {
  //   Object.defineProperty(Vue.prototype, '$thenable', {
  //     get: function get() {
  //       if (!this.$_thenable) {
  //         this.$_thenable = new DollarThenable(this)
  //       }

  //       return this.$_thenable
  //     }
  //   })
  // }
  installMixin(Vue, vueVersion);
}
ThenableProvider.install = install;
export default ThenableProvider;
