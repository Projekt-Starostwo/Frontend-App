import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getCmsUrl } from './queries'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export async function appedDomain(url) {
  const cms = await getCmsUrl()
  console.log('CMS RES ', cms)
  return `http://${cms}${url}`
}

export function slugify(text) {
  if (!text) return ''

  const normalizedText = normalizeString(text)

  return normalizedText
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function deslugify(slug) {
  if (!slug) return ''
  return slug.replace(/-/g, ' ') // Replace all hyphens with spaces
}

// use this function to avoid using try catch thats not comfortable
export async function tryCatch(promise) {
  try {
    const data = await promise
    return { data: data, error: null }
  } catch (error) {
    return { data: null, error: error }
  }
}

export function normalizeString(str) {
  if (!str) {
    return ''
  }

  let normalizedStr = str.toLowerCase()

  for (const char in transliterationMap) {
    const regex = new RegExp(char, 'g')
    normalizedStr = normalizedStr.replace(regex, transliterationMap[char])
  }

  normalizedStr = normalizedStr
    .replace(/- /g, '')
    .trim()
    .replace(/[^a-z0-9\s]/g, '') // Remove any remaining non-ASCII characters

  return normalizedStr
}

const transliterationMap = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  Ą: 'A',
  Ć: 'C',
  Ę: 'E',
  Ł: 'L',
  Ń: 'N',
  Ó: 'O',
  Ś: 'S',
  Ź: 'Z',
  Ż: 'Z',
}
