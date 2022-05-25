function existsAndHasValue(value, key) {
  if (!value in key || key[value] == null || typeof (key[value]) == 'undefined' || key[value] == ' ' || key[value].length <= 0) {
    return false;
  }
  return true;
}

function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  do {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  while (result.length < length);

  return result;
}

module.exports = {
  existsAndHasValue,
  randomString
}