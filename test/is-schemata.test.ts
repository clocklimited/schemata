import schemata from '../src/schemata'
import isSchemata from '../src/lib/is-schemata'
import assert from 'assert'

describe('#isSchemata()', () => {
  it('should return true if it is a schemata object', () => {
    const person = schemata({ name: 'Person' })
    assert.strictEqual(isSchemata(person), true)
  })

  it('should return false if it is not a schemata object', () => {
    assert.strictEqual(isSchemata({ hello() {} }), false)
  })

  it('should return false if it is not an object', () => {
    assert.strictEqual(isSchemata('hello'), false)
  })
})
