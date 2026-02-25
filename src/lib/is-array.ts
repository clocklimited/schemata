import isSchemata from './is-schemata'

/*
 * Take an object and determine whether it is a schemata array type.
 */
const isArray = (obj: any): boolean => {
  // Schemata array types must be objects
  if (typeof obj !== 'function') return false

  // Array types look like { arraySchema: <schemata> }
  return isSchemata(obj.arraySchema)
}

export default isArray
module.exports = isArray
