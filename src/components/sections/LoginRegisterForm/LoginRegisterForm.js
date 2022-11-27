import Button from "components/atoms/Button/Button"
import Input from "components/atoms/Input/Input"

function LoginRegisterForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <label>
          email
          <Input
            value={props.emailInputValue}
            onChange={props.handleEmailChange}
          />
        </label>
        {
          props.isEmailInputError
            ? <small>Pole email jest nieprawidlowe</small>
            : null
        }
      </div>
      <div>
        <label>
          password
          <Input
            value={props.passwordInputValue}
            onChange={props.handlePasswordChange}
            type="password"
          />
        </label>
        {
          props.isPasswordInputError
            ? <small>Pole password musi miec minimum 6 znakow</small>
            : null
        }
      </div>
      <Button text={props.submitText}/>
      {props.isLoginError
        ? <p> Nieprawidlowy login lub haslo</p>
        : null
      }
    </form>
  )
}

export default LoginRegisterForm