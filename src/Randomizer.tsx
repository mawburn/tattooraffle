import { useCallback, useContext, useRef, useState } from 'react'
import { AppContext } from './App'
import getNames from './utils/getNames'
import getRand from './utils/getRand'
import getWinner from './utils/getWinner'

export interface Winner {
  id: string
  name: string
}

const getTimer = (timer: number) =>
  new Promise<void>(res => {
    setTimeout(() => {
      res()
    }, timer)
  })

const Randomizer = () => {
  const { fileContents } = useContext(AppContext)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [spinnerName, setSpinnerName] = useState<string>('')

  const spin = useCallback(async () => {
    // grab the winner
    const _winner = getWinner(fileContents)
    setWinner(_winner)

    // This is just for show
    const names = getNames(fileContents)

    const timer = 100

    for (let i = 0; i < timer; --i) {
      await getTimer(i * 50)

      setSpinnerName(names[i])
    }

    setTimeout(() => {
      setSpinnerName(_winner.name)
    }, 1000)
  }, [fileContents])

  return <>{!winner ? <button onClick={spin}>Get Winner</button> : <div>{spinnerName}</div>}</>
}

export default Randomizer
