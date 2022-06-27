const expectedInterface = ['makeBlank', 'makeDefault', 'getName', 'validate']
const isSchemata = (obj) => {
  // Schemata instances must be functions
  if (typeof obj !== 'function') return false
  return expectedInterface.every((func) => obj[func] !== undefined)
}

module.exports = isSchemata
