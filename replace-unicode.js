import replacements from './replacements.json' with { type: 'json' }

const replacementsPairs = replacements.map(function (element) {
  return [new RegExp(element[0], 'g'), element[1]]
})

export default function replaceUnicode (string) {
  return replacementsPairs.reduce(function (string, replacement) {
    return string.replace(replacement[0], replacement[1])
  }, string)
}
