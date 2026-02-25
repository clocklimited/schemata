function castDate(value: any): Date {
  return value === '' || value === null || value === undefined
    ? null
    : value instanceof Date
    ? value
    : new Date(value)
}

export default castDate
module.exports = castDate
