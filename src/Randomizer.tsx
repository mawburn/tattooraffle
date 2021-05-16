import { useCallback, useContext, useRef, useState } from 'react'
import { AppContext } from './App'
import getNames from './utils/getNames'
import getRand from './utils/getRand'
import getWinner from './utils/getWinner'

export interface Winner {
  id: string
  name: string
}

const getNext = (timer: number, name: string) =>
  new Promise<string>(res => {
    setTimeout(() => {
      res(name)
    }, timer)
  })

const Randomizer = () => {
  const lastName = useRef('')
  const { fileContents } = useContext(AppContext)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [spinnerName, setSpinnerName] = useState<string>('')

  const spin = useCallback(() => {
    setWinner(getWinner(fileContents))
    const names = getNames(fileContents)

    const timer = 100
    lastName.current = names[getRand(names.length)]

    for (let i = 0; i < timer; --i) {
      getNext(i * 50, lastName.current)

      let newName = names[getRand(names.length)]

      while (lastName.current === newName) {
        newName = names[getRand(names.length)]
      }

      lastName.current = newName
      setSpinnerName(newName)
    }
  }, [fileContents])

  return (
    <>
      {!winner ? (
        <button onClick={spin}>Get Winner</button>
      ) : (
        <div>
          Winner Winner Chicken Dinner: <strong>{winner.name}</strong> (transaction: {winner.id})
        </div>
      )}
    </>
  )
}

export default Randomizer
