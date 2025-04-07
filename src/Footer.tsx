import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-sections">
          <section>
            <h4>Company</h4>
            <Link to="/about-us">
              <p>About Us</p>
            </Link>
            {/* <p>Press</p> */}
            <Link to="/how-it-works">
              <p>How It Works</p>
            </Link>
          </section>
          <section>
            <h4>Legal</h4>
            <Link to="/terms-and-conditions">
              <p>Terms & Conditions</p>
            </Link>
            <Link to="/privacy-policy">
              <p>Privacy Policy</p>
            </Link>
          </section>
          <section>
            <h4>Follow Us</h4>
            <p>X</p>
            <a href="https://discord.gg/NTwGsGMg" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              <p>Discord</p>
            </a>
            {/* <p>LinkedIn</p> */}
            {/* <p>GitHub</p> */}
          </section>
          <section>
            <h4>Contact</h4>
            <p>support@company.com</p>
            <p>+1 (555) 123-4567</p>
          </section>
        </div>
        <p>© 2024 EAGLE Labs. All rights reserved.</p>
      </div>
    </footer>
  );
}
