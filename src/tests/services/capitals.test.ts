import { describe, expect, test } from '@jest/globals'
import capitalsService from '../../services/capitals'

describe('getByName', () => {
  test('should return data when the capital is found', async () => {
    const result = await capitalsService.getByName('Paris')
    expect(result.data).toEqual(['Paris'])
    expect(result.notFound).toBe(false)
    expect(result.error).toBe(false)
  })

  test('should return empty data and notFound flag when capital is not found', async () => {
    const result = await capitalsService.getByName('NonExistentCapital')
    expect(result.data).toEqual([])
    expect(result.notFound).toBe(true)
    expect(result.error).toBe(false)
  })

  test('should return empty data and error flag when an error occurs', async () => {
    const result = await capitalsService.getByName('.><<_+$%$@>:L>aer243#>@!C"v4')
    expect(result.data).toEqual([])
    expect(result.notFound).toBe(false)
    expect(result.error).toBe(true)
  })
})
