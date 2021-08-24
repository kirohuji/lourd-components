import { memoize } from "lodash";

const runner = (api, arr) => {
  return api.call(this, arr);
};
export const dictionaries = (str) => memoize(runner, () => str);
