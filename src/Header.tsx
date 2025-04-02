import { Link } from "react-router-dom";

export function Header() {
    return (
      <header className="header">
        <Link to="/">
          <p><h1 className="logo">EAGLE Labs.</h1></p>
        </Link>
        <button className="login-button">Login</button>
      </header>
    )
  }