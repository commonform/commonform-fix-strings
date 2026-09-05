import equivalents from 'unicode-ascii-equivalents' with { type: 'json' }

process.stdout.write(
  JSON.stringify(
    equivalents
      .map(function (replacement) {
        return [ replacement.unicode, replacement.ascii ]
      })
  )
)
