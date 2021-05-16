import { useContext } from 'react'
import { AppContext } from './App'

const List = () => {
  const { fileContents } = useContext(AppContext)

  return (
    <div>
      <h2>Ticket holders</h2>
      {fileContents.map((f: any) => (
        <div className="ticketRow">
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
    </div>
  )
}

export default List
