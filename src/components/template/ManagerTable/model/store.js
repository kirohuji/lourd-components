export default class Store {
  constructor(options) {
    for (let option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
  }
}
