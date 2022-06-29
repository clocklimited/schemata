function castBoolean(value: any): boolean {
  if (value === undefined || value === '' || value === null) return null
  const falsey = [false, 0, '0', 'false', 'off', 'no']
  return falsey.indexOf(value) === -1
}

module.exports = castBoolean
