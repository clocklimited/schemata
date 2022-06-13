# Changelog

### v8.0.0

 - Validator cadence has changed. Now, if you provide validators as an array, these will ALWAYS be run when validating against a specific validation set.
     Beforehand, the following was valid:

```js
const schemata = require('schemata')
const required = require('validity-required')

const animal = schemata({
  name: 'Animal',
  description: 'An animal',
  properties: {
    numberOfLegs: {
      type: Number,
      validators: [required]
    },
    numberOfGills: {
      type: Number,
      validators: {
        aquatic: [required]
      }
    }
  }
})

const errors = await animal.validate({ numberOfGills: 2 }, 'aquatic')
// errors = {}

```

With the new version, `.all` and `[]` _are_ functionally equivalent and behave as expected, so you would encounter:

```js
const errors = await animal.validate({ numberOfGills: 2 }, 'aquatic')
// errors = { numberOfLegs: 'Number of legs is required' }
```

 - There is additional support for a `default` validator. This is now the set that is validated against when no set is passed (previously `all`). This is used to provide a set of validators to run if a specific set does not match.

 - You can now extend schemata instances as much as you please using schemata.extend.
 - This version drops support for Node versions below 14.

### v7.0.0

This should be compatible with v6 but has some major rewrites, hence the version bump.

You can now validate using regular functions, promises and the old style callback.

```js
const databaseLookup = async () => null

// Regular function
const isOfWizardingAge = (propertyName, name, entity) =>
  entity[propertyName] < 17 && 'Sorry you are not of age'

// Promise
const isUniqueAge = async (propertyName, name, entity) => {
  const found = await databaseLookup({ age: entity[propertyName] })
  if (found) return `${entity[propertyName]} already exists`
}

const properties = createContactSchema().getProperties()
properties.age.validators = [
  isOfWizardingAge,
  isUniqueAge,
  (propertyName, name, object, cb) =>
    cb(null, `${propertyName} ${name} ${object[propertyName]}`)
]
const schema = createNamedSchemata(properties)
const errors = await schema.validate(
  schema.makeDefault({ name: 'Paul', age: 16 })
)
console.error(errors)
```

This version is the first to be transpiled using babel and with `async.js` removed.

### v6.0.0

Moves `castProperty` to a static function.

### v5.0.0

The main initialization arguments have now changed so you must provide a `name`
and can also provide a `description`. The schema definition is now set via the
`properties` property.

### v4.1.0

Validate now return a promise if a callback is not provided.

### v4.0.0

Node 6+ upgrade. Direct access to the schema has been removed (`schema.schema`) and `getProperties()` must now be used.

### v3.2.0

- Introduces shorthand for `schema.validators.all = []`. Now `schema.validators = []` is equivalent.

### v3.1.0

- Fixed a bug where `stripUnknownProperties()` was not stripping out properties of type array that were null.

### v3.0.0

This version prevents you from using arrays and objects for `defaultValue`. Now
only primitives and functions are allowed. If you are not doing this in your
project then you can safely upgrade from v2. See
https://github.com/serby/schemata/pull/34 for more details.

