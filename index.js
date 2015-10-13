module.exports = commonformFixStrings

var child = require('commonform-predicate').child

var mutators = [
  function combineContiguousStrings(form) {
    form.content = form.content.reduce(
      function(result, element, index) {
        if (typeof element === 'string' && index > 0) {
          var lastIndex = result.length - 1
          var lastElement = result[lastIndex]
          if (typeof lastElement === 'string') {
            result[lastIndex] = lastElement + element
            return result }
          else { return result.concat(element) } }
        else { return result.concat(element) } },
      [ ]) },

  function combineContiguousSpaces(form) {
    form.content = form.content.map(function(element) {
      return (
        typeof element === 'string' ?
          element.replace(/\s+/g, ' ') :
          element ) })
    form.content
      .filter(function(element) {
        return ( child(element) && ( 'heading' in element ) ) })
      .forEach(function(child) {
        child.heading = child.heading.replace(/\s+/g, ' ') }) },

  function removeLeadingSpace(form) {
    var firstElement = form.content[0]
    if (typeof firstElement === 'string') {
      form.content[0] = firstElement.replace(/^\s+/, '') }
    form.content
      .filter(function(element) {
        return ( child(element) && ( 'heading' in element ) ) })
      .forEach(function(child) {
        child.heading = child.heading.replace(/^\s+/, '') }) },

  function removeTrailingSpace(form) {
    var lastIndex = form.content.length - 1
    var lastElement = form.content[lastIndex]
    if (typeof lastElement === 'string') {
      form.content[lastIndex] = lastElement.replace(/\s+$/, '') }
    form.content
      .filter(function(element) {
        return ( child(element) && ( 'heading' in element ) ) })
      .forEach(function(child) {
        child.heading = child.heading.replace(/\s+$/, '') }) },

  function removeSpaceAroundChildren(form) {
    form.content = form.content.reduce(
      function(content, element) {
        if (content.length < 1) {
          content.push(element)
          return content }
        else {
          var lastIndex = content.length - 1
          var last = content[lastIndex]
          if (typeof element === 'string' && last.hasOwnProperty('form')) {
            content.push(element.replace(/^\s+/, ''))
            return content }
          else if (element.hasOwnProperty('form') && typeof last === 'string') {
            content[lastIndex] = last.replace(/\s+$/, '')
            content.push(element)
            return content }
          else {
            content.push(element)
            return content } } },
      [ ]) } ]

function commonformFixStrings(form) {
  mutators.forEach(function(mutator) { mutator(form) })
  return form }
