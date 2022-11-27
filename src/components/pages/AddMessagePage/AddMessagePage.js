import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MessagesForm from 'components/sections/MessagesForm/MessagesForm';
import Footer from "components/sections/Footer/Footer"
import Header from "components/sections/Header/Header"
import WelcomeMessage from 'components/sections/WelcomeMessage/WelcomeMessage';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';

import { addMessage } from 'helpers/http'

// 1. Stworz podstrone /about w ktorej wyswietl jakis tekst. Podstrona About powinna rowniez posiadac nawigacje

// 2. Stworz sekcje Footer, w ktorej umiesc nawigacje do strony glownej, do strony add i do strony about

// 3. Uzyj sekcji Footer w kazdej podstronie

function AddMessagePage() {
  const [authorInput, setAuthorInput] = useState('');
  const [isAuthorInputError, setIsAuthorInputError] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isMessageInputError, setIsMessageInputError] = useState(false);

  const navigate = useNavigate();

  const handleAuthorChange = (event) => {
    setAuthorInput(event.target.value);
  }

  const handleMessageChange = (event) => {
    setMessageInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Pole author nie moze byc puste i pole message musi miec wiecej niz 2 znaki
    const isValid = authorInput.trim().length > 0
      && messageInput.trim().length > 2;

    // Blad bedzie true/false w zaleznosci od tego, jaka jest wartosc inputa

    // wyswietl blad, jak pole authorInput jest puste
    setIsAuthorInputError(authorInput.trim().length === 0)
    // wyswietl blad, jak pole messageInput ma mniej lub rowne 2 znaki
    setIsMessageInputError(messageInput.trim().length <= 2)

    // if(authorInput.trim().length === 0) {
    //   setIsAuthorInputError(true)
    // } else {
    //   setIsAuthorInputError(false)
    // }


    if(!isValid) {
      // jesli w funkcji uzywamy return, to JS nie wejdzie do dalszego wywolania funkcji
      return;
    }

    // Date.now() zwraca obecny czas jako timestamp
    // timestamp to jest liczba sekund ktora uplynela od 1.01.1970
    const randomId = Date.now();

    const newMessage = {
      id: randomId,
      author: authorInput,
      message: messageInput
    }

    addMessage(newMessage)
      .then((x) => {
        console.log(x)
        // navigate('/');
      })
      .catch(console.log)

    // Czyszczenie pol formularza
    setAuthorInput('');
    setMessageInput('');
  }
  return (
    <MainTemplate>
      <WelcomeMessage>
        <h3>Add new post</h3>
      </WelcomeMessage>
      <MessagesForm
        handleSubmit={handleSubmit}
        authorInput={authorInput}
        handleAuthorChange={handleAuthorChange}
        messageInput={messageInput}
        handleMessageChange={handleMessageChange}
        isAuthorInputError={isAuthorInputError}
        isMessageInputError={isMessageInputError}
      />
    </MainTemplate>

  )
}

export default AddMessagePage