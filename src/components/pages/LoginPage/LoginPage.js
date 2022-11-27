import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "helpers/firebase";

import LoginRegisterForm from "components/sections/LoginRegisterForm/LoginRegisterForm";
import WelcomeMessage from "components/sections/WelcomeMessage/WelcomeMessage"
// import { loginUser } from "helpers/http";
import MainTemplate from "components/templates/MainTemplate/MainTemplate";

function LoginPage() {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [isPasswordInputError, setIsPasswordInputError] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoginError(false);

    // Jakby ktos chcial uzyc regexp
    // const emailRegExp = new RegExp(/wzor)
    // emailRegExp.test(emailInputValue) // true/false

    const isValid = emailInputValue.includes('@') && passwordInputValue.length > 5;

    setIsEmailInputError(!emailInputValue.includes('@'))
    setIsPasswordInputError(passwordInputValue.length <= 5)

    if(!isValid) {
      return;
    }

    // Niebezpieczny sposob sprawdzania uzytkownikow

    // fetch('http://localhost:5000/users')
    //   .then(res => res.json())
    //   .then((users) => {
    //     const currentUser = users.find(user => {
    //       return user.email === emailInputValue && user.password === passwordInputValue
    //     })
    //     if(currentUser) {
    //       navigate('/')
    //     }
    //   })

    // moge skorzystac z queryparams zeby wyszukac konkretnego uzytkownika
    // loginUser()
    //   .then((users) => {
    //     // to bedzie pierwszy element tablicy
    //     const currentUser = users[0];

    //     if(currentUser && currentUser.password === passwordInputValue) {
    //       navigate('/')
    //     } else {
    //       setIsLoginError(true);
    //     }
    //   })

    signInWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setIsLoginError(true);
      })
  }

  const handleEmailChange = (event) => {
    setEmailInputValue(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPasswordInputValue(event.target.value);
  }

  return (
    <MainTemplate>
      <WelcomeMessage>
        <h3>Login Page</h3>
      </WelcomeMessage>

      <LoginRegisterForm
        handleSubmit={handleSubmit}
        emailInputValue={emailInputValue}
        handleEmailChange={handleEmailChange}
        isEmailInputError={isEmailInputError}
        passwordInputValue={passwordInputValue}
        handlePasswordChange={handlePasswordChange}
        isPasswordInputError={isPasswordInputError}
        submitText="Login"
        isLoginError={isLoginError}
      />
    </MainTemplate>
  )
}

export default LoginPage


// Zadanie dla was do wykonania

// w pliku http.js stworz 2 funkcje loginUser i registerUser. Nastepnie wytnij 2 wywolania fetch w LoginPage i RegisterPage