/**
 * Clean text from tabs, new lines and multiple spaces
 * @param {*} text
 * @returns string cleaned
 */
export const cleanText = (text) => text.replace(/\t\|\n|\s+/g, ' ')
