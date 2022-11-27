import Footer from "components/sections/Footer/Footer"
import Header from "components/sections/Header/Header"

function MainTemplate (props) {
  return (
    <div>
      <Header logo="Instagram App"/>
      {props.children}
      <Footer />
    </div>
  )
}

export default MainTemplate

// Zadanie dla was
// 1. Sprawdz czy to dziala
// 2. Uzyj templatki na wszystkich podstronach
// 3. Do templatki wrzuc komponent WelcomeMessage

// Przerwa do 14