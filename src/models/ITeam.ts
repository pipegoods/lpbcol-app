export interface ITeam {
  id: string
  name: string
  image: string
  socialNetworks: string[]
  players: IPlayer[]
}

export interface IPlayer {
  name: string
  backNumber: number
  position: string
  bt: string
  height: number
  weight: number
  birthDate: string
  urlPlayer: string
  image?: string
}
