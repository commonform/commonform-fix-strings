module.exports = removeNonASCII

var NON_ASCII = /[^\x00-\x7F]/g // eslint-disable-line no-control-regex

function removeNonASCII (string) {
  return string.replace(NON_ASCII, '')
}
