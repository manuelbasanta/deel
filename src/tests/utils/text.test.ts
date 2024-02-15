import { describe, expect, test } from '@jest/globals'
import { normalizeName } from '../../utils/text'

describe('normalizeName', () => {
  test('removes accent', () => {
    expect(normalizeName('Papeetē')).toBe('Papeete')
  })
  test('does not change words without accents', () => {
    expect(normalizeName('Washington')).toBe('Washington')
  })
})
