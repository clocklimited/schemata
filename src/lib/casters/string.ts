function castString(value: any): String {
  if (value === undefined || value === '' || value === null) return null
  return value.toString && value.toString()
}

export default castString
module.exports = castString
