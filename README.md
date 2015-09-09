```javascript
var fixStrings = require('commonform-fix-strings')
var assert = require('assert')

assert.deepEqual(
  fixStrings({ content: [ 'A', 'B' ] }),
  { content: [ 'AB' ] })

assert.deepEqual(
  fixStrings({ content: [ 'A ', ' B' ] }),
  { content: [ 'A B' ] })

assert.deepEqual(
  fixStrings({ content: [ ' A' ] }),
  { content: [ 'A' ] })

assert.deepEqual(
  fixStrings({ content: [ 'A ' ] }),
  { content: [ 'A' ] })

assert.deepEqual(
  fixStrings({ content: [ ' A ' ] }),
  { content: [ 'A' ] })
```
