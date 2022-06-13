const schemata = require('../schemata')
const SchemataArray = require('../lib/array')
const castProperty = require('../lib/property-caster')
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
