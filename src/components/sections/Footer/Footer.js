import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      Instagram App - Footer

      <nav>
        <ul>
          <li>
            <Link to="/">
              Strona Glowna
            </Link>
          </li>
          <li>
            <Link to="/add">
              Add new message
            </Link>
          </li>
          <li>
            <Link to="/about">
              About
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;