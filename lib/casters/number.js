function castNumber(value) {
  if (value === undefined || value === '' || value === null) return null
  return Number(value)
}

module.exports = castNumber
