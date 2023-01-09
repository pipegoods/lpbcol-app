import { Hono } from 'hono'
import leaderboard from '../db/leaderboard.json'

const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the current standings of the league'
    }
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

export default app
