import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { AppContext } from './App'
import Papa from 'papaparse'

const Upload = () => {
  const [error, setError] = useState<string | null>(null)
  const { setFileContents } = useContext(AppContext)

  const parseFile = useCallback(
    (fileEvent: ChangeEvent<HTMLInputElement> | null) => {
      if (fileEvent?.currentTarget?.files) {
        Papa.parse(fileEvent.currentTarget.files[0], {
          header: true,
          skipEmptyLines: true,
          error: error => {
            setError(error.message)
          },
          complete: results => {
            const contents = !results.data
              ? []
              : results.data.filter(
                  (d: any) => d['Transaction Type'] === 'Received P2P' && d['Status'] === 'PAYMENT DEPOSITED'
                )

            setFileContents(contents as object[])
          },
        })
      }
    },
    [setFileContents]
  )

  return (
    <div className="uploadForm">
      {error && <h2>{error}</h2>}
      <form>
        <label>
          Upload your file
          <input type="file" accept=".csv" onChange={parseFile} />
        </label>
      </form>
    </div>
  )
}

export default Upload
