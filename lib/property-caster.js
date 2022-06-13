const isSchemata = require('./is-schemata')
const isSchemataArray = require('./is-array')
const getType = require('./type-getter')
const castArray = require('./casters/array')
const castBoolean = require('./casters/boolean')
const castDate = require('./casters/date')
const castNumber = require('./casters/number')
const castObject = require('./casters/object')
const castString = require('./casters/string')
/**
 * Casts a value to a given type.
 *
 * For booleans and integers; undefined, '', and null will all be cast to null
 * For array they will be converted to []
 * For object they will be converted to {}
 *
 * Throws error if type is undefined.
 *
 */
const castProperty = (type, value, key, entityObject) => {
  if (type === undefined) throw new Error('Missing type')

  // First check whether the type of this property is
  // a sub-schema, or an array of sub-schemas

  const subSchema = getType(type, entityObject)
  if (isSchemata(subSchema)) {
    return value !== null ? subSchema.cast(value) : null
  }

  if (isSchemataArray(type)) {
    if (!value) return null
    if (!Array.isArray(value)) value = [value]
    return value.map((v) => type.arraySchema.cast(v))
  }

  // If the { type: x } is a primitive constructor, use
  // cast the value based on which constructor is found
  switch (type) {
    case Boolean:
      return castBoolean(value)
    case Number:
      return castNumber(value)
    case String:
      return castString(value)
    case Object:
      return castObject(value)
    case Date:
      return castDate(value)
    case Array:
      return castArray(value)
    default:
      return value
  }
}

module.exports = castProperty
