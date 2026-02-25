import schemata from '../src/schemata'
import SchemataArray from '../src/lib/array'
import castProperty from '../src/lib/property-caster'
import assert from 'assert'

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
