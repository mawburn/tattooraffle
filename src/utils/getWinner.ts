import { Winner } from '../Randomizer'
import getRand from './getRand'

const getWinner = (fileContents: object[]): Winner => {
  const ticketArr: any[] = []

  fileContents.forEach((f: any) => {
    for (let i = 0; i < Math.floor(f.Amount.substring(1)); i++) {
      ticketArr.push(f['Transaction ID'])
    }
  })

  const rand = getRand(ticketArr.length - 1)

  const winnerId = ticketArr[rand]

  const winner: any = fileContents.find((f: any) => f['Transaction ID'] === winnerId)

  return {
    id: winner['Transaction ID'],
    name: winner['Name of sender/receiver'],
  }
}

export default getWinner
