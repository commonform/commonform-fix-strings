# commonform-fix-strings

correct typical string-related Common Form validation problems

```javascript
var fixStrings = require('commonform-fix-strings')
```

Concatenates contiguous strings:

```javascript
var assert = require('assert')

assert.deepStrictEqual(
  fixStrings({ content: ['A', 'B'] }),
  { content: ['AB'] }
)
```

Squashes contiguous spaces:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: ['A ', ' B'] }),
  { content: ['A B'] }
)
```

Squashes contiguous blanks:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: [{ blank: '' }, { blank: '' }] }),
  { content: [{ blank: '' }] }
)
```

Removes leading whitespace:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: [' A'] }),
  { content: ['A'] }
)

assert.deepStrictEqual(
  fixStrings({ content: [' ', { definition: 'A' }] }),
  { content: [{ definition: 'A' }] }
)
```

Removes trailing whitespace:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: ['A '] }),
  { content: ['A'] }
)

assert.deepStrictEqual(
  fixStrings({ content: [{ definition: 'A' }, ' '] }),
  { content: [{ definition: 'A' }] }
)
```

Removes both:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: [' A '] }),
  { content: ['A'] }
)
```

From headings:

```javascript
assert.deepStrictEqual(
  fixStrings({
    content: [
      {
        heading: ' A  B ',
        form: { content: ['C'] }
      }
    ]
  }),
  {
    content: [
      {
        heading: 'A B',
        form: { content: ['C'] }
      }
    ]
  }
)
```

Remove empty headings:

```javascript
assert.deepStrictEqual(
  fixStrings({
    content: [
      {
        heading: '  ',
        form: { content: ['C'] }
      }
    ]
  }),
  { content: [{ form: { content: ['C'] } }] }
)
```

Replaces common non-ASCII characters with ASCII equivalents:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: ['String “with quotes”.'] }),
  { content: ['String "with quotes".'] }
)

assert.deepStrictEqual(
  fixStrings({ content: ['Has — em dash'] }),
  { content: ['Has --- em dash'] }
)
```

Removes other non-ASCII characters:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: ['See §10'] }),
  { content: ['See 10'] }
)
```

Removes space leading a child form:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: ['A ', { form: { content: ['B'] } }] }),
  { content: ['A', { form: { content: ['B'] } }] }
)
```

Removes space following a child form:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: [{ form: { content: ['B'] } }, ' A'] }),
  { content: [{ form: { content: ['B'] } }, 'A'] }
)
```

Preserves `conspicuous` properties:

```javascript
assert.deepStrictEqual(
  fixStrings({ conspicuous: 'yes', content: ['A'] }),
  { conspicuous: 'yes', content: ['A'] }
)
```

Cleans up terms and headings:

```javascript
assert.deepStrictEqual(
  fixStrings({ content: [{ use: 'A   B' }] }),
  { content: [{ use: 'A B' }] }
)

assert.deepStrictEqual(
  fixStrings({ content: [{ reference: 'A   B' }] }),
  { content: [{ reference: 'A B' }] }
)

assert.deepStrictEqual(
  fixStrings({ content: [{ heading: 'A   B', form: { content: ['test'] } }] }),
  { content: [{ heading: 'A B', form: { content: ['test'] } }] }
)
```

Valid forms pass right through:

```javascript
assert.deepStrictEqual(
  fixStrings({
    content: [
      'A',
      { form: { content: ['B'] } },
      'C'
    ]
  }),
  {
    content: [
      'A',
      { form: { content: ['B'] } },
      'C'
    ]
  }
)
```
