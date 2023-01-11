import { ILeaderboard } from '@models/ILeaderboard'
import { apiURL } from './config'

export const getLeaderboard = async (): Promise<ILeaderboard[]> => {
  const response = await fetch(`${apiURL}/leaderboard`)
  return await response.json()
}
