module.exports = replaceUnicode

var replacements = require('./replacements').map(function(element) {
  return [ new RegExp(element[0], 'g'), element[1] ] })

function replaceUnicode(string) {
  return replacements.reduce(
    function(string, replacement) {
      return string.replace(replacement[0], replacement[1]) },
    string) }
