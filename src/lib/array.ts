import { ISchemata, Properties, SchemataType } from './types'

/*
 * Array helper to assist creation of nested array schemas
 */
function ArrayType<Q extends Properties, T extends SchemataType<Q>>(
  schema: ISchemata<Q, T> | (() => ISchemata<Q, T>)
) {
  const schemata = 'makeDefault' in schema ? schema : schema()

  const fn = function () {
    return schemata.makeDefault()
  }

  fn.arraySchema = schemata

  return fn
}

export default ArrayType
module.exports = ArrayType
