import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'

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

app.get('/static/*', serveStatic({ root: './' }))

export default app
