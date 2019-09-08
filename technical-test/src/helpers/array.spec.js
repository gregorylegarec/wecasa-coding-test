import {removeFirstValue } from './array'

describe('Array Helpers', () => {
  describe('removeFirstValue', () => {
    it('should remove given value', () => {
      expect(removeFirstValue(['1', '2', '3'], '2')).toEqual(['1', '3'])
    })

    it('should return passed array', () => {
      expect(removeFirstValue(['1', '2', '3'], '4')).toEqual(['1', '2', '3'])
    })

    it('should remove first given value', () => {
      expect(removeFirstValue(['1', '2', '2', '3'], '2')).toEqual(['1', '2', '3'])
    })

    it('should remove first given value at first index', () => {
      expect(removeFirstValue(['2', '1', '2', '3'], '2')).toEqual(['1', '2', '3'])

    })

    it('should remove first given value at last index', () => {
      expect(removeFirstValue(['1', '3', '2'], '2')).toEqual(['1', '3'])

    })
  })
})
