const schemata = require('../src/schemata')
const SchemataArray = require('../src/lib/array')
const castProperty = require('../src/lib/property-caster')
const assert = require('assert')

describe('schemata', () => {
  it('should export .Array', () => {
    assert.strictEqual(typeof schemata.Array, 'function')
    assert.deepStrictEqual(schemata.Array, SchemataArray)
  })

  it('should export .castProperty', () => {
    assert.strictEqual(typeof schemata.castProperty, 'function')
    assert.deepStrictEqual(schemata.castProperty, castProperty)
  })
})
