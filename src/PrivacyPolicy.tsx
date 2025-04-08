import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./PrivacyPolicy.css";
import { useState, useEffect, useRef } from "react";

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = useRef({});

  // Register refs for all sections
  const registerRef = (id, ref) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  // Handle section navigation
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs.current[sectionId].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find which section is currently in view
      for (const id in sectionRefs.current) {
        const section = sectionRefs.current[id];
        if (section) {
          const offsetTop = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            if (activeSection !== id) {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      <Header />
      
      <main className="main-content">
        <div className="terms-page-container">
          <div className="policy-container terms-container">
            <h1 className="policy-title terms-title">Privacy Policy</h1>
            <div className="terms-last-updated">Last Updated: April 8, 2025</div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("introduction", el)} id="introduction">
              <h2>1. Introduction</h2>
              <p>
                At Eagle Labs, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service. Please read this 
                privacy policy carefully. If you do not agree with the terms of this privacy policy, please 
                do not access the site.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("collection", el)} id="collection">
              <h2>2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="policy-list terms-list">
                <li>Register for an account</li>
                <li>Use our products or services</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
                <li>Contact our support team</li>
              </ul>
              <p>
                This may include your name, email address, contact information, payment details, 
                and any other information you choose to provide.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("usage", el)} id="usage">
              <h2>3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="policy-list terms-list">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Develop new products and services</li>
              </ul>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("sharing", el)} id="sharing">
              <h2>4. Data Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="policy-list terms-list">
                <li>Service providers who perform services on our behalf</li>
                <li>Business partners with your consent</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
                <li>As required by law or to protect rights and safety</li>
              </ul>
              <p>
                We will not sell your personal data to third parties without your explicit consent.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("international", el)} id="international">
              <h2>5. International Data Transfers</h2>
              <p>
                Eagle Labs is headquartered in the British Virgin Islands, and we operate globally. Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.
              </p>
              <p>
                By providing your information, you consent to this transfer. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("security", el)} id="security">
              <h2>6. Data Security</h2>
              <p>
                We use reasonable administrative, technical, and physical measures to help protect your 
                personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, 
                and destruction. However, no method of transmission over the Internet or electronic storage is 
                100% secure, so we cannot guarantee absolute security.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("cookies", el)} id="cookies">
              <h2>7. Cookie Policy</h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing experience. You can control cookies through your browser settings and other tools. By continuing to use our website, you consent to our use of cookies.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("rights", el)} id="rights">
              <h2>8. Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information, such as:
              </p>
              <ul className="policy-list terms-list">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to our processing of your information</li>
                <li>Portability of your information</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("children", el)} id="children">
              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete that information.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("changes", el)} id="changes">
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. The updated version will be effective 
                as of the updated date referenced on our website. We encourage you to review this privacy policy 
                frequently to stay informed about how we are protecting your information.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("jurisdiction", el)} id="jurisdiction">
              <h2>11. Legal Jurisdiction</h2>
              <p>
                This privacy policy is governed by the laws of the British Virgin Islands. Any disputes arising from or related to this policy shall be subject to the exclusive jurisdiction of the courts in the British Virgin Islands.
              </p>
            </div>
            
            <div className="policy-section terms-section" ref={(el) => registerRef("contact", el)} id="contact">
              <h2>12. Contact Us</h2>
              <p>
                If you have questions or concerns about this privacy policy or our practices, please contact us at:
              </p>
              <p className="contact-info">
                info@eaglelabs.com
              </p>
              <p>
                Eagle Labs<br />
                British Virgin Islands
              </p>
            </div>
          </div>
          
          <div className="terms-summary">
            <div className="summary-title">Contents</div>
            <ul className="summary-list">
              <li className={activeSection === "introduction" ? "active" : ""}>
                <a href="#introduction" onClick={(e) => {e.preventDefault(); scrollToSection("introduction")}}>1. Introduction</a>
              </li>
              <li className={activeSection === "collection" ? "active" : ""}>
                <a href="#collection" onClick={(e) => {e.preventDefault(); scrollToSection("collection")}}>2. Information We Collect</a>
              </li>
              <li className={activeSection === "usage" ? "active" : ""}>
                <a href="#usage" onClick={(e) => {e.preventDefault(); scrollToSection("usage")}}>3. How We Use Your Information</a>
              </li>
              <li className={activeSection === "sharing" ? "active" : ""}>
                <a href="#sharing" onClick={(e) => {e.preventDefault(); scrollToSection("sharing")}}>4. Data Sharing</a>
              </li>
              <li className={activeSection === "international" ? "active" : ""}>
                <a href="#international" onClick={(e) => {e.preventDefault(); scrollToSection("international")}}>5. International Transfers</a>
              </li>
              <li className={activeSection === "security" ? "active" : ""}>
                <a href="#security" onClick={(e) => {e.preventDefault(); scrollToSection("security")}}>6. Data Security</a>
              </li>
              <li className={activeSection === "cookies" ? "active" : ""}>
                <a href="#cookies" onClick={(e) => {e.preventDefault(); scrollToSection("cookies")}}>7. Cookie Policy</a>
              </li>
              <li className={activeSection === "rights" ? "active" : ""}>
                <a href="#rights" onClick={(e) => {e.preventDefault(); scrollToSection("rights")}}>8. Your Rights</a>
              </li>
              <li className={activeSection === "children" ? "active" : ""}>
                <a href="#children" onClick={(e) => {e.preventDefault(); scrollToSection("children")}}>9. Children's Privacy</a>
              </li>
              <li className={activeSection === "changes" ? "active" : ""}>
                <a href="#changes" onClick={(e) => {e.preventDefault(); scrollToSection("changes")}}>10. Changes to Policy</a>
              </li>
              <li className={activeSection === "jurisdiction" ? "active" : ""}>
                <a href="#jurisdiction" onClick={(e) => {e.preventDefault(); scrollToSection("jurisdiction")}}>11. Legal Jurisdiction</a>
              </li>
              <li className={activeSection === "contact" ? "active" : ""}>
                <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection("contact")}}>12. Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;