import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import WelcomeMessage from 'components/sections/WelcomeMessage/WelcomeMessage'
import MessagesForm from 'components/sections/MessagesForm/MessagesForm'
import { getMessage, editMessage } from 'helpers/http'
import MainTemplate from 'components/templates/MainTemplate/MainTemplate'

function EditPage() {
	const [authorInput, setAuthorInput] = useState('')
	const [isAuthorInputError, setIsAuthorInputError] = useState(false)
	const [messageInput, setMessageInput] = useState('')
	const [isMessageInputError, setIsMessageInputError] = useState(false)

	// jak odebrac to id z parametrow?
	// params jest to obiekt z parametrami przychodzacymi do strony
	const params = useParams()

	// funkcja useNavigate z react-router-dom, zwraca nam funkcje, ktora umozliwia nam przechodzenie miedzy stronami
	const navigate = useNavigate()

	useEffect(() => {
		getMessage(params.messageId).then(data => {
			const message = data.toJSON()

			// potrzebuje wypelnic inputy danymi, ktore pochodza z BE
			setAuthorInput(message.author)
			setMessageInput(message.message)
		})
	}, [])

	const handleSubmit = event => {
		event.preventDefault()

		// Pole author nie moze byc puste i pole message musi miec wiecej niz 2 znaki
		const isValid = authorInput.trim().length > 0 && messageInput.trim().length > 2

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

		if (!isValid) {
			// jesli w funkcji uzywamy return, to JS nie wejdzie do dalszego wywolania funkcji
			return
		}

		const editedMessage = {
			author: authorInput,
			message: messageInput,
		}

		editMessage(params.messageId, editedMessage).then(() => {
			// Jak sie uda zmienic rekord w bazie, to potrzebuje przekierowac uzytkownika na strone glowna
			navigate('/')
		})

		// Czyszczenie pol formularza
		setAuthorInput('')
		setMessageInput('')
	}

	const handleAuthorChange = event => {
		setAuthorInput(event.target.value)
	}

	const handleMessageChange = event => {
		setMessageInput(event.target.value)
	}

	return (
		<MainTemplate>
			<WelcomeMessage>
				<h3>Edit your message</h3>
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

export default EditPage

// - Stworz strone LoginPage i RegisterPage.
// - Na tych podstronach uzyj komponentu Header i Footer.
// - Podlinkuj strone login i register w Headerze i Footerze

// - Na podstronie Register po kliknieciu przycisku Send, stworz w bazie danych (http://localhost:5000/users) nowego uzytkownika. Kazdy uzytkownik powinien miec pole email, password, name i avatar. W momencie tworzenia uzytkownika, pole name i avatar powinno byc puste. Jak uda sie pozytywnie zarejestrowac, przekieruj na strone glowna

// - Stworz osobna sekcje o nazwie LoginRegisterForm, ktory bedzie tworzyl formularz zawierajacy 2 pola - email i haslo

// * Zrob obsluge logowania (http://localhost:5000/users?email='XXX')
