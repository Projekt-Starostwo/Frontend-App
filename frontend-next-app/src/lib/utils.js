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
  return text
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
  return slug
    .replace(/-/g, ' ') // Replace all hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}

export async function tryCatch(promise) {
  try {
    const data = await promise
    return { data: data, error: null }
  } catch (error) {
    return { data: null, error: error }
  }
}

// Function to normalize strings (remove special characters, normalize case)
export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD') // Decomposes diacritics (e.g., ę -> e, ś -> s)
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritic marks
    .replace(/[^a-z0-9]/g, '') // Removes unsupported characters
}
