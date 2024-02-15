// Normalize names that might have accents or other additions
export const normalizeName = (name: string): string => name.normalize('NFD').replace(/\p{Diacritic}/gu, '')
