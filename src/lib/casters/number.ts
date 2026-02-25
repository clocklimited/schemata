function castNumber(value: any): number {
  if (value === undefined || value === '' || value === null) return null
  return Number(value)
}

export default castNumber
module.exports = castNumber
