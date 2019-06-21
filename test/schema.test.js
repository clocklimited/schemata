const schemata = require('../schemata')

describe('#schema', () => {
  test('should throw if name is missing', () => {
    expect(() => {
      schemata()
    }).toThrowError(/name is required/)
  })

  test('should not throw if properties are missing', () => {
    try {
      schemata({ name: 'Person' })
    } catch (e) {
      throw new Error('Empty properties should not error')
    }
  })

  test('should default to an empty schemata', () => {
    const empty = schemata({ name: 'Person' })
    expect(empty.getProperties()).toEqual({})
  })

  test('should get schema name', () => {
    const schema = schemata({ name: 'Person', description: 'A real person' })
    expect(schema.getName()).toEqual('Person')
  })

  test('should get schema description', () => {
    const schema = schemata({ name: 'Person', description: 'A real person' })
    expect(schema.getDescription()).toEqual('A real person')
  })

  test('should throw an error if a defaultValue is neither a primitive value or a function', () => {
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

    badSchemas.forEach(properties => {
      expect(() => {
        schemata({ name: 'Bad', properties })
      }).toThrowError()
    })

    goodSchemas.forEach(properties => {
      expect(() => {
        schemata({ name: 'Good', properties })
      }).not.toThrowError()
    })
  })
})
