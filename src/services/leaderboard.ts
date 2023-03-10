import { ILeaderboard, ISemifinal } from '@models/ILeaderboard'
import { apiURL } from './config'

export const getLeaderboard = async (): Promise<ILeaderboard[]> => {
  const response = await fetch(`${apiURL}/leaderboard`)
  return await response.json()
}

export const getSemifinal = async (): Promise<ISemifinal[]> => {
  const response = await fetch(`${apiURL}/semifinal`)
  return await response.json()
}

export const getFinal = async (): Promise<ISemifinal[]> => {
  const response = await fetch(`${apiURL}/final`)
  return await response.json()
}
