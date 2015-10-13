```javascript
var fixStrings = require('commonform-fix-strings')
```

Concatenates contiguous strings:

```javascript
var assert = require('assert')

assert.deepEqual(
  fixStrings({ content: [ 'A', 'B' ] }),
  { content: [ 'AB' ] })
```

Squashes contiguous spaces:

```javascript
assert.deepEqual(
  fixStrings({ content: [ 'A ', ' B' ] }),
  { content: [ 'A B' ] })
```

Removes leading whitespace:

```javascript
assert.deepEqual(
  fixStrings({ content: [ ' A' ] }),
  { content: [ 'A' ] })
```

Removes trailing whitespace:

```javascript
assert.deepEqual(
  fixStrings({ content: [ 'A ' ] }),
  { content: [ 'A' ] })
```

Removes both:

```javacript
assert.deepEqual(
  fixStrings({ content: [ ' A ' ] }),
  { content: [ 'A' ] })
```

From headings:

```javacript
assert.deepEqual(
  fixStrings({
    content: [
      { heading: ' A  B ',
        form: { content: [ 'C' ] } } ] }),
  { content: [
      { heading: 'A B',
        form: { content: [ 'C' ] } } ] })
```

Removes space leading a child form:

```javascript
assert.deepEqual(
  fixStrings({ content: [ 'A ', { form: { content: [ 'B' ] } } ] }),
  { content: [ 'A', { form: { content: [ 'B' ] } } ] })
```

Removes space following a child form:

```javascript
assert.deepEqual(
  fixStrings({ content: [ { form: { content: [ 'B' ] } }, ' A' ] }),
  { content: [ { form: { content: [ 'B' ] } }, 'A' ] })
```

Preserves `conspicuous` properties:

```javascript
assert.deepEqual(
  fixStrings({ conspicuous: 'yes', content: [ 'A' ] }),
  { conspicuous: 'yes', content: [ 'A' ] })
```

Valid forms pass right through:

```javascript
assert.deepEqual(
  fixStrings({
    content: [
      'A',
      { form: { content: [ 'B' ] } },
      'C' ] }),
  { content: [
      'A',
      { form: { content: [ 'B' ] } },
      'C' ] })
```
