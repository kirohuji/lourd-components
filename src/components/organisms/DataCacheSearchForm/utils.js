import _ from 'lodash';
function defaultTo(key, value, defaultValue) {
  if (arguments.length < 3) {
    return _.isNull(key) ? value : key;
  }
  return _.has(key, value) ? key[value] : defaultValue;
}
export { defaultTo }; 
