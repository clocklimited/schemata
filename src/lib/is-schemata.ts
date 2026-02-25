const expectedInterface = ['makeBlank', 'makeDefault', 'getName', 'validate']
const isSchemata = (obj: any): boolean => {
  // Schemata instances must be functions
  if (typeof obj !== 'function') return false
  return expectedInterface.every((func) => obj[func] !== undefined)
}

export default isSchemata
module.exports = isSchemata
