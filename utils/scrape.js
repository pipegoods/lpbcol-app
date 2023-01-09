import * as cheerio from 'cheerio'

/**
 * Scrape a URL and return a Cheerio instance
 * @param {string} url
 * @returns cheerio instance
 */
export const scrape = async (url) => {
  const response = await fetch(url)
  const html = await response.text()
  return cheerio.load(html)
}
