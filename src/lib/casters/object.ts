function castObject(value: any): any {
  // typeof null === 'object', but null is an acceptable value
  return typeof value !== 'object' ? {} : value
}

module.exports = castObject
