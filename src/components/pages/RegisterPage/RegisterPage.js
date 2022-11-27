import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "helpers/firebase";

import MainTemplate from "components/templates/MainTemplate/MainTemplate";
import WelcomeMessage from "components/sections/WelcomeMessage/WelcomeMessage"
import LoginRegisterForm from "components/sections/LoginRegisterForm/LoginRegisterForm";

function RegisterPage() {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [isPasswordInputError, setIsPasswordInputError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    // Jakby ktos chcial uzyc regexp
    // const emailRegExp = new RegExp(/wzor)
    // emailRegExp.test(emailInputValue) // true/false

    const isValid = emailInputValue.includes('@') && passwordInputValue.length > 5;

    setIsEmailInputError(!emailInputValue.includes('@'))
    setIsPasswordInputError(passwordInputValue.length <= 5)

    if(!isValid) {
      return;
    }

    createUserWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
      .then(() => {
        navigate('/')
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
        <h3>Register Page</h3>
      </WelcomeMessage>
      <LoginRegisterForm
        handleSubmit={handleSubmit}
        emailInputValue={emailInputValue}
        handleEmailChange={handleEmailChange}
        isEmailInputError={isEmailInputError}
        passwordInputValue={passwordInputValue}
        handlePasswordChange={handlePasswordChange}
        isPasswordInputError={isPasswordInputError}
        submitText="Register"
      />
    </MainTemplate>
  )
}

export default RegisterPage