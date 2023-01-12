import { writeDBFile, TEAMS } from '../db/index.js'
import { scrape } from '../utils/scrape.js'

const URLS = {
  semifinal: 'https://lpbcol.com/'
}

const getSemifinal = async () => {
  const $ = await scrape(URLS.semifinal)
  const $rows = $('.tabla_posicion tbody tr')

  const leaderboard = []

  $rows.each((index, element) => {
    if (index === 0) return

    const srcImgTeam = $(element).find('img').attr('src')
    const idTeam = srcImgTeam.includes('vaqueros') ? 'vaq' : 'cai'

    const { players, ...team } = TEAMS.find((team) => team.id === idTeam)

    const rowStatistics = $(element).find('td')
    const wins = Number($(rowStatistics[1]).text())
    const losses = Number($(rowStatistics[2]).text())
    const ptc = Number($(rowStatistics[3]).text())

    leaderboard.push({
      team,
      wins,
      losses,
      ptc
    })
  })

  return leaderboard
}

const leaderboard = await getSemifinal()

await writeDBFile('semifinal', leaderboard)
