import Button from "components/atoms/Button/Button"
import { Link } from "react-router-dom"
import './MessagesList.css'

function MessagesList(props) {
  return (
    <ul>
      {
        props.messages.map(message => {
          return (
            <li key={message.id} className="list-item">
              {message.message} - <strong>{message.author}</strong>
              <div className="button-container">
                <Link to={`/edit/${message.id}`}>
                  <Button
                    text="Edytuj"
                  />
                </Link>

                <Button
                  text="X"
                  onClick={() => props.handleMessageRemove(message.id)}
                />
              </div>

            </li>
          )
        })
      }
    </ul>
  )
}

export default MessagesList