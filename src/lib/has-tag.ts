import { Properties } from './types'

/**
 * Has a property got a tag
 */
const hasTag = (schema: Properties, key: string, tag?: string): boolean => {
  // No tag specified
  if (tag === undefined) return true

  // This property has no tags
  if (schema[key].tag === undefined) return false
  if (!Array.isArray(schema[key].tag)) return false

  return (schema[key].tag as string[]).indexOf(tag) !== -1
}

export default hasTag
module.exports = hasTag
