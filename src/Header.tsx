import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1 className="logo">EAGLE Labs.</h1>
      </Link>
      <button className="login-button" disabled={false}>
        Sign In
      </button>
    </header>
  );
}