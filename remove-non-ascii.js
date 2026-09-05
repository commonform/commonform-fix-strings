const NON_ASCII = /[^\x00-\x7F]/g // eslint-disable-line no-control-regex
export default function removeNonASCII (string) {
  return string.replace(NON_ASCII, '')
}
