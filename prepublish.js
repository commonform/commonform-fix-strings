process.stdout.write(
  JSON.stringify(
    require('unicode-ascii-equivalents')
      .map(function(replacement) {
        return [ replacement.unicode, replacement.ascii ] })))
