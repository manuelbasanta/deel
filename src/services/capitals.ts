import { normalizeName } from '../utils/text'

// API docs https://restcountries.com/
const BASE_URL = 'https://restcountries.com/v3.1/capital'
const MAX_RESULTS = 5

// Lots of unnecessary data on the response being removed
const formatCapitalData = (data: any, filter: string): string[] => {
  return data.slice(0, MAX_RESULTS)
    .map((item: any) => item.capital.find((cap: string) => normalizeName(cap).toLocaleLowerCase().includes(filter.toLocaleLowerCase())))
}

const getByName = async (name: string): Promise<{ data: string[], notFound: boolean, error: boolean }> => {
  try {
    const res = await fetch(`${BASE_URL}/${name}`)
    if (res.status === 404) {
      return {
        data: [],
        notFound: true,
        error: false
      }
    }
    const data = await res.json()

    return {
      data: formatCapitalData(data, name),
      notFound: false,
      error: false
    }
  } catch (err) {
    return {
      data: [],
      notFound: false,
      error: true
    }
  }
}

export default {
  getByName
}
