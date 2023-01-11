import { ITeam } from './ITeam'

export interface ILeaderboard {
  team: ITeam
  wins: number
  losses: number
  winPercentage: number
  gamesBehind: number
}
