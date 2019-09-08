/**
 * Remove first occurrence of given value in the given array.
 * Do not remove other identical values
 */
export function removeFirstValue(array:Array<any>, value: any) {
  const valueFirstIndex = array.indexOf(value)
  if (valueFirstIndex === -1) return [...array]
  const valuesBefore = valueFirstIndex === 0 ? [] : array.slice(0, valueFirstIndex)
  const valuesAfter = array.slice(valueFirstIndex+1)
  return valuesBefore.concat(valuesAfter)
}

export default {
  removeFirstValue
}
