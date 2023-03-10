import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import semifinal from '../db/semifinal.json'
import final from '../db/final.json'

const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the current standings of the league'
    },
    {
      endpoint: '/teams',
      description: 'Returns the current teams of the league'
    },
    {
      endpoint: '/teams/:id',
      description: 'Returns the team with the given id'
    },
    {
      endpoint: '/semifinal',
      description: 'Returns the semifinal stats'
    },
    {
      endpoint: '/final',
      description: 'Returns the final stats'
    }
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id === id)

  if (!foundTeam) return ctx.json({ message: 'team not found' }, 404)
  return ctx.json(foundTeam)
})

app.get('/semifinal', (ctx) => {
  return ctx.json(semifinal)
})

app.get('/final', (ctx) => {
  return ctx.json(final)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
