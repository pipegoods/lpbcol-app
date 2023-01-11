import { TEAMS, writeDBFile } from '../db/index.js'
import { scrape } from '../utils/scrape.js'

const URLS = {
  teams:
    'https://col.wbsc.org/es/events/2022-liga-profesional-de-beisbol-de-colombia-2022-2023/teams'
}

const TEAMS_ID_SCRAPING = {
  tig: 23241,
  cai: 23242,
  trs: 23244,
  vaq: 23243
}

const getTeams = async () => {
  const teams = TEAMS.map(async (team) => {
    const id = TEAMS_ID_SCRAPING[team.id]
    const $ = await scrape(`${URLS.teams}/${id}`)
    const $rows = $('tbody tr')

    const players = []

    $rows.each((_, element) => {
      const siteName = $(element)
        .find('.player a')
        .text()
        .toLowerCase()
        .split(' ')
      const name = siteName
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      const urlPlayer = $(element).find('.player a').attr('href')

      const rowStatistics = $(element).find('.text-center')

      const backNumber = Number($(rowStatistics[0]).text())
      const position = $(rowStatistics[1]).text()
      const bt = $(rowStatistics[2]).text() // batteo y lanzamiento (L - iquierda, Rigth - derecho)
      const height = Number($(rowStatistics[3]).text().split('.').join(''))
      const weight = Number($(rowStatistics[4]).text())
      const birthDate = Number($(rowStatistics[5]).text())

      players.push({
        name,
        backNumber,
        position,
        bt,
        height,
        weight,
        birthDate,
        urlPlayer
      })
    })

    return {
      ...team,
      players
    }
  })

  return Promise.all(teams)
}

const teams = await getTeams()

await writeDBFile('teams', teams)
