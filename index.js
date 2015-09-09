module.exports = commonformFixStrings

function isString(argument) {
  return typeof argument === 'string' }

function combineContiguousSpaces(string) {
  return string.replace(/\s+/g, ' ') }

function combineContiguousStrings(form) {
  return {
    content: form.content.reduce(
      function(result, element, index) {
        if (isString(element) && index > 0) {
          var lastIndex = ( result.length - 1 )
          var lastElement = result[lastIndex]
          if (isString(lastElement)) {
            result[lastIndex] = combineContiguousSpaces(lastElement + element)
            return result }
          else {
            return result.concat(element) } }
        else {
          return result.concat(element) } },
      [ ]) } }

function removeLeadingSpace(form) {
  var firstElement = form.content[0]
  if (isString(firstElement)) {
    form.content[0] = firstElement.replace(/^\s+/, '') }
  return form }

function removeTrailingSpace(form) {
  var lastIndex = form.content.length - 1
  var lastElement = form.content[lastIndex]
  if (isString(lastElement)) {
    form.content[lastIndex] = lastElement.replace(/\s+$/, '') }
  return form }

var mutators = [
  combineContiguousStrings,
  removeLeadingSpace,
  removeTrailingSpace ]

function commonformFixStrings(form) {
  return mutators.reduce(
    function(result, mutator) {
      return mutator(result) },
    form) }
