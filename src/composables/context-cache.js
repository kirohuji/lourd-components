import { memoize } from "lodash";

const runner = (api, arr) => {
  if (api) {
    return api.call(this, arr);
  } else {
    return [];
  }
};
export const dictionaries = (str) => memoize(runner, () => str);
