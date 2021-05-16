import { createContext, useState } from 'react'
import List from './List'
import Randomizer from './Randomizer'
import Upload from './Upload'

interface IAppContext {
  fileContents: object[]
  setFileContents: (fileContents: object[]) => void
}

export const AppContext = createContext<IAppContext>({
  fileContents: [],
  setFileContents: (fileContents: object[]) => null,
})

const App = () => {
  const [fileContents, setFileContents] = useState<object[]>([])

  return (
    <AppContext.Provider value={{ fileContents, setFileContents }}>
      <div className="container">
        <header>
          <h1>
            <img className="mainLogo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
            Tattoo Raffle
          </h1>
          {Object.keys(fileContents).length === 0 ? (
            <Upload />
          ) : (
            <>
              <Randomizer />
              <List />
            </>
          )}
        </header>
      </div>
    </AppContext.Provider>
  )
}

export default App
