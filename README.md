```javascript
var fixStrings = require('commonform-fix-strings')
```

Concatenates contiguous strings:

```javascript
var assert = require('assert')

assert.deepEqual(
  fixStrings({content: ['A', 'B']}),
  {content: ['AB']}
)
```

Squashes contiguous spaces:

```javascript
assert.deepEqual(
  fixStrings({content: ['A ', ' B']}),
  {content: ['A B']}
)
```

Squashes contiguous blanks:

```javascript
assert.deepEqual(
  fixStrings({content: [{blank: ''}, {blank: ''}]}),
  {content: [{blank: ''}]}
)
```

Removes leading whitespace:

```javascript
assert.deepEqual(
  fixStrings({content: [' A']}),
  {content: ['A']}
)

assert.deepEqual(
  fixStrings({content: [' ', {definition: 'A'}]}),
  {content: [{definition: 'A'}]}
)
```

Removes trailing whitespace:

```javascript
assert.deepEqual(
  fixStrings({content: ['A ']}),
  {content: ['A']}
)

assert.deepEqual(
  fixStrings({content: [{definition: 'A'}, ' ']}),
  {content: [{definition: 'A'}]}
)
```

Removes both:

```javascript
assert.deepEqual(
  fixStrings({content: [' A ']}),
  {content: ['A']}
)
```

From headings:

```javascript
assert.deepEqual(
  fixStrings({
    content: [
      {
        heading: ' A  B ',
        form: {content: ['C']}
      }
    ]
  }),
  {
    content: [
      {
        heading: 'A B',
        form: {content: ['C']}
      }
    ]
  }
)
```

Remove empty headings:

```javascript
assert.deepEqual(
  fixStrings({
    content: [
      {
        heading: '  ',
        form: {content: ['C']}
      }
    ]
  }),
  {content: [{form: {content: ['C']}}]}
)
```

Replaces common non-ASCII characters with ASCII equivalents:

```javascript
assert.deepEqual(
  fixStrings({content: ['String “with quotes”.']}),
  {content: ['String "with quotes".']}
)

assert.deepEqual(
  fixStrings({content: ['Has — em dash']}),
  {content: ['Has --- em dash']}
)
```

Removes other non-ASCII characters:

```javascript
assert.deepEqual(
  fixStrings({content: ['See §10']}),
  {content: ['See 10']}
)
```

Removes space leading a child form:

```javascript
assert.deepEqual(
  fixStrings({content: ['A ', {form: {content: ['B']}}]}),
  {content: ['A', {form: {content: ['B']}}]}
)
```

Removes space following a child form:

```javascript
assert.deepEqual(
  fixStrings({content: [{form: {content: ['B']}}, ' A']}),
  {content: [{form: {content: ['B']}}, 'A']}
)
```

Preserves `conspicuous` properties:

```javascript
assert.deepEqual(
  fixStrings({conspicuous: 'yes', content: ['A']}),
  {conspicuous: 'yes', content: ['A']}
)
```

Cleans up terms and headings:

```javascript
assert.deepEqual(
  fixStrings({content: [{use: 'A   B'}]}),
  {content: [{use: 'A B'}]}
)

assert.deepEqual(
  fixStrings({content: [{reference: 'A   B'}]}),
  {content: [{reference: 'A B'}]}
)

assert.deepEqual(
  fixStrings({content: [{heading: 'A   B', form: {content: ['test']}}]}),
  {content: [{heading: 'A B', form: {content: ['test']}}]}
)
```

Valid forms pass right through:

```javascript
assert.deepEqual(
  fixStrings({
    content: [
      'A',
      {form: {content: ['B']}},
      'C'
    ]
  }),
  {
    content: [
      'A',
      {form: {content: ['B']}},
      'C'
    ]
  }
)
```
