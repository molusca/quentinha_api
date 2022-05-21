function existsAndHasValue(value, key) {
  if (!value in key || key[value] == null || typeof (key[value]) == 'undefined' || key[value] == ' ' || key[value].length <= 0) {
    return false;
  }
  return true;
}

module.exports = {
  existsAndHasValue
}