import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function appedDomain(url) {
  return `http://localhost:1337${url}`
}

export function slugify(text) {
  if (!text) return ''

  const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

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
    return '' // Handle null or undefined input gracefully
  }
  return str
    .toLowerCase()
    .trim() // Remove leading/trailing whitespace
    .normalize('NFD') // Decomposes diacritics (e.g., ę -> e, ś -> s)
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritic marks
    .replace(/[^a-z0-9\s]/g, '') // Removes unsupported characters, including spaces
}
