import schemata from '../src/schemata'

const createContactSchema = () => {
  return schemata({
    name: 'Contact',
    properties: {
      name: {
        tag: ['update'],
        name: 'Full Name'
      },
      age: {
        type: Number,
        defaultValue: 0
      },
      active: {
        type: Boolean,
        defaultValue: true
      },
      phoneNumber: {
        tag: 'update'
      },
      dateOfBirth: {
        type: Date
      }
    }
  })
}

const createCommentSchema = () => {
  return schemata({
    name: 'Comment',
    properties: {
      email: {},
      comment: {
        tag: ['auto']
      },
      created: {
        type: Date
      }
    }
  })
}

const { age, phoneNumber, dateOfBirth, active } =
  createContactSchema().makeDefault()

const createBlogSchema = () => {
  return schemata({
    name: 'Blog',
    properties: {
      title: {
        tag: ['auto'],
        type: String
      },
      body: {
        tag: ['auto']
      },
      author: {
        type: createContactSchema()
      },
      comments: {
        type: schemata.Array(createCommentSchema()),
        tag: ['auto']
      }
    }
  })
}

const { author, comments, body } = createBlogSchema().makeDefault()

const extended = createBlogSchema().extend(
  schemata({
    name: 'Bar',
    properties: {
      category: {
        tag: ['auto'],
        type: String
      }
    }
  })
)

const { title, category, author: extendedAuthor } = extended.makeDefault()

const createNamedSchemata = (properties) =>
  schemata({ name: 'Foo', properties })

module.exports = {
  createContactSchema,
  createBlogSchema,
  createCommentSchema,
  createNamedSchemata
}
