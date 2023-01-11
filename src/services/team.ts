import { ITeam } from '../models/ITeam'
import { apiURL } from './config'

export const getAllTeams = async (): Promise<ITeam[]> => {
  const response = await fetch(`${apiURL}/teams`)
  return await response.json()
}
