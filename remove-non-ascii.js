module.exports = removeNonASCII

var NON_ASCII = /[^\x00-\x7F]/g

function removeNonASCII(string) {
  return string.replace(NON_ASCII, '') }
