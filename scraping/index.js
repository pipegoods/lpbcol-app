import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const URLS = {
  leaderboard:
    'https://col.wbsc.org/es/events/2022-liga-profesional-de-beisbol-de-colombia-2022-2023/standings'
}

const scrape = async (url) => {
  const response = await fetch(url)
  const html = await response.text()
  return cheerio.load(html)
}

const cleanText = text => text.replace(/\t\|\n|\s+/g, ' ')

const getLeaderBoard = async () => {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('.standings-print tbody tr')

  const leaderboard = []

  $rows.each((index, element) => {
    if (index === 0) return
    const [shortName] = cleanText($(element).find('.team-name').text()).trim().split(' ')
    const fullName = $(element).find('.team-name small').text()

    const rowStatistics = $(element).find('.text-center')

    const rowWins = Number($(rowStatistics[1]).text())
    const rowLosses = Number($(rowStatistics[2]).text())
    const rowWinPercentage = Number($(rowStatistics[4]).text())
    const rowGamesBehind = Number($(rowStatistics[5]).text())

    leaderboard.push({
      shortName,
      fullName,
      wins: rowWins,
      losses: rowLosses,
      winPercentage: rowWinPercentage,
      gamesBehind: rowGamesBehind
    })
  })

  return leaderboard
}

const leaderboard = await getLeaderBoard()
const filePath = path.join(process.cwd(), 'db', 'leaderboard.json')

await writeFile(filePath, JSON.stringify(leaderboard, null, 2), 'utf-8')
