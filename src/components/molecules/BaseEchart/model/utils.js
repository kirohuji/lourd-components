/**
 * @name: isEmpty
 * @msg: 检查是否为空
 */
export const isEmpty = (obj) => {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
};
