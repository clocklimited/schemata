const schemata = require('../schemata')
const assert = require('assert')

describe('#schema', () => {
  it('should throw if name is missing', () => {
    assert.throws(() => {
      schemata()
    }, /name is required/)
  })

  it('should not throw if properties are missing', () => {
    try {
      schemata({ name: 'Person' })
    } catch (e) {
      throw new Error('Empty properties should not error')
    }
  })

  it('should default to an empty schemata', () => {
    const empty = schemata({ name: 'Person' })
    assert.deepStrictEqual(empty.getProperties(), {})
  })

  it('should get schema name', () => {
    const schema = schemata({ name: 'Person', description: 'A real person' })
    assert.strictEqual(schema.getName(), 'Person')
  })

  it('should get schema description', () => {
    const schema = schemata({ name: 'Person', description: 'A real person' })
    assert.strictEqual(schema.getDescription(), 'A real person')
  })

  it('should throw an error if a defaultValue is neither a primitive value or a function', () => {
    const badSchemas = [
      { a: { defaultValue: [] } },
      { a: { defaultValue: {} } },
      { a: { defaultValue: new Date() } },
      { a: { defaultValue: 1 }, b: { defaultValue: [] } }
    ]

    const goodSchemas = [
      {
        a: {
          defaultValue() {
            return []
          }
        }
      },
      { a: { defaultValue: null } },
      { a: { defaultValue: undefined } },
      { a: { defaultValue: 'Hi' } },
      { a: { defaultValue: 20 } }
    ]

    badSchemas.forEach((properties) => {
      assert.throws(() => {
        schemata({ name: 'Bad', properties })
      })
    })

    goodSchemas.forEach((properties) => {
      assert.doesNotThrow(() => {
        schemata({ name: 'Good', properties })
      })
    })
  })

  describe('#extend', () => {
    it('should inherit name from newSchema', () => {
      const schema = schemata({ name: 'Person' })
      const newSchema = schemata({
        name: 'New Person'
      })
      const extendedSchema = schema.extend(newSchema)
      assert.strictEqual(extendedSchema.getName(), 'New Person')
      assert.strictEqual(schema.getName(), 'Person', 'Original schema modified')
      assert.strictEqual(
        newSchema.getName(),
        'New Person',
        'New schema modified'
      )
    })

    it('should inherit description from newSchema', () => {
      const schema = schemata({
        name: 'Person',
        description: 'A regular person'
      })
      const newSchema = schemata({
        name: 'New Person',
        description: 'A brand spanking new person'
      })
      const extendedSchema = schema.extend(newSchema)
      assert.strictEqual(
        extendedSchema.getDescription(),
        'A brand spanking new person'
      )
      assert.strictEqual(
        schema.getDescription(),
        'A regular person',
        'Original schema modified'
      )
      assert.strictEqual(
        newSchema.getDescription(),
        'A brand spanking new person',
        'New schema modified'
      )
    })

    it('should inherit properties from newSchema', () => {
      const schema = schemata({
        name: 'Person',
        properties: {
          name: {
            type: String
          }
        }
      })
      const newSchema = schemata({
        name: 'New Person',
        properties: {
          isHungry: {
            type: Boolean,
            defaultValue: true
          }
        }
      })
      const extendedSchema = schema.extend(newSchema)
      assert.deepStrictEqual(extendedSchema.getProperties(), {
        isHungry: {
          defaultValue: true,
          type: Boolean
        },
        name: {
          type: String
        }
      })
      assert.deepStrictEqual(
        Object.keys(schema.getProperties()),
        ['name'],
        'Original schema modified'
      )
      assert.deepStrictEqual(
        Object.keys(newSchema.getProperties()),
        ['isHungry'],
        'New schema modified'
      )
    })

    it('should inherit properties from newSchema with overrides', () => {
      const schema = schemata({
        name: 'Person',
        properties: {
          name: {
            type: String
          }
        }
      })
      const newSchema = schemata({
        name: 'New Person',
        properties: {
          name: {
            type: String,
            defaultValue: 'blue'
          },
          isHungry: {
            type: Boolean,
            defaultValue: true
          }
        }
      })
      const extendedSchema = schema.extend(newSchema)
      assert.deepStrictEqual(extendedSchema.getProperties(), {
        isHungry: {
          defaultValue: true,
          type: Boolean
        },
        name: {
          defaultValue: 'blue',
          type: String
        }
      })
    })

    it('should be chainable', () => {
      const schema = schemata({
        name: 'Person',
        properties: {
          name: {
            type: String
          }
        }
      })
      const newSchema = schemata({
        name: 'New Person',
        properties: {
          name: {
            type: String,
            defaultValue: 'blue'
          },
          isHungry: {
            type: Boolean,
            defaultValue: true
          }
        }
      })
      const extendedSchema = schema.extend(newSchema).extend(schema)
      assert.deepStrictEqual(extendedSchema.getProperties(), {
        isHungry: {
          defaultValue: true,
          type: Boolean
        },
        name: {
          type: String
        }
      })
    })
  })
})
