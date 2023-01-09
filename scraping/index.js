import * as cheerio from 'cheerio'
import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const BD_PATH = path.join(process.cwd(), 'db')
const TEAMS = await readFile(`${BD_PATH}/teams.json`, 'utf-8').then(JSON.parse)

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
    const [id] = cleanText($(element).find('.team-name').text()).trim().split(' ')

    const rowStatistics = $(element).find('.text-center')

    const rowWins = Number($(rowStatistics[1]).text())
    const rowLosses = Number($(rowStatistics[2]).text())
    const rowWinPercentage = Number($(rowStatistics[4]).text())
    const rowGamesBehind = Number($(rowStatistics[5]).text())

    const team = TEAMS.find(team => team.id === id)

    leaderboard.push({
      team,
      wins: rowWins,
      losses: rowLosses,
      winPercentage: rowWinPercentage,
      gamesBehind: rowGamesBehind
    })
  })

  return leaderboard
}

const leaderboard = await getLeaderBoard()

await writeFile(`${BD_PATH}/leaderboard.json`, JSON.stringify(leaderboard, null, 2), 'utf-8')
