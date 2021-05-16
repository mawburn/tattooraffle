import { useContext, useState } from 'react'
import { AppContext } from './App'

const List = () => {
  const { fileContents } = useContext(AppContext)
  const [shown, setShown] = useState<boolean>(false)

  return (
    <div>
      <button className="btnText" onClick={() => setShown(!shown)}>
        {shown ? 'Hide tickets' : 'Show all ticket holders'}
      </button>
      {shown && (
        <>
          <h2>Ticket holders</h2>
          {fileContents.map((f: any) => (
            <div key={f['Transaction ID']} className="ticketRow">
              <div className="ticketId">
                <strong>ID:</strong> {f['Transaction ID']}
              </div>
              <div className="ticketName">
                <strong>Name:</strong> {f['Name of sender/receiver']}
              </div>
              <div className="ticketCount">
                <strong>Tickets:</strong> {Math.floor(f.Amount.substring(1))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default List
