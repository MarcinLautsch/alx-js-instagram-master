import { useState, useEffect } from 'react';

import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import MessagesList from 'components/sections/MessagesList/MessagesList';
import WelcomeMessage from 'components/sections/WelcomeMessage/WelcomeMessage';

import {
  removeMessage,
  // getMessages,
  getMessagesFromFB
} from 'helpers/http';
import Footer from 'components/sections/Footer/Footer';

function HomePage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessagesFromFB(setMessages)
    // getMessages()
    //   .then(data => {
    //     setMessages(data);
    //   })
  }, [])

  const handleMessageRemove = (id) => {
    const filteredMessage = messages.filter(message => {
      return message.id !== id
    })

    removeMessage(id)
    setMessages(filteredMessage)
  }

  return (
    <MainTemplate>
      <WelcomeMessage>
        <h3>Messages List</h3>
      </WelcomeMessage>
      <MessagesList
        messages={messages}
        handleMessageRemove={handleMessageRemove}
      />
    </MainTemplate>
  );
}

export default HomePage;