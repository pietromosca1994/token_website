import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./TermsAndConditions.css";
import { useState, useEffect, useRef } from "react";

// Terms and Conditions Page
function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = useRef({});

  // Register refs for all sections
  const registerRef = (id: any, ref: any) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  // Handle section navigation
  const scrollToSection = (sectionId: any) => {
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
          <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions</h1>
            <div className="terms-last-updated">Last Updated: April 8, 2025</div>
            
            <div className="terms-section" ref={(el) => registerRef("introduction", el)} id="introduction">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Eagle Labs. These Terms and Conditions govern your access to and use of our website, products, and services. Please read these terms carefully before using our services.
              </p>
              <p>
                By accessing or using Eagle Labs' services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("services", el)} id="services">
              <h2>2. Services Description</h2>
              <p>
                Eagle Labs provides digital services including but not limited to data analytics, software solutions, and digital platforms. Our services may include web interfaces, application programming interfaces, and other digital technologies.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We will not be liable to you or any third party for any such modification, suspension, or discontinuation.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("eligibility", el)} id="eligibility">
              <h2>3. User Eligibility</h2>
              <p>
                To use our services, you must:
              </p>
              <ul className="terms-list">
                <li>Be at least 18 years old or the legal age of majority in your jurisdiction, whichever is greater</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using digital services under the laws of your jurisdiction</li>
                <li>Comply with these Terms and all applicable local, state, national, and international laws and regulations</li>
              </ul>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("account", el)} id="account">
              <h2>4. Account Registration and Security</h2>
              <p>
                When you create an account with Eagle Labs, you are responsible for:
              </p>
              <ul className="terms-list">
                <li>Providing accurate, current, and complete information</li>
                <li>Maintaining the confidentiality of your credentials</li>
                <li>Restricting access to your account and devices</li>
                <li>All activities that occur under your account</li>
              </ul>
              <p>
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security at info@eaglelabs.com.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("usage", el)} id="usage">
              <h2>5. Acceptable Use</h2>
              <p>
                You agree not to use our services to:
              </p>
              <ul className="terms-list">
                <li>Violate any applicable law or regulation</li>
                <li>Infringe upon the rights of others</li>
                <li>Distribute malware or other harmful code</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to any part of our services</li>
                <li>Collect or store personal data about other users without their consent</li>
              </ul>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("data", el)} id="data">
              <h2>6. Data Usage and Privacy</h2>
              <p>
                By using our services:
              </p>
              <ul className="terms-list">
                <li>You acknowledge our Privacy Policy, which describes how we collect, use, and protect your information</li>
                <li>You represent that you have the right to share any data you provide</li>
                <li>You grant Eagle Labs a non-exclusive license to use, process, and analyze this data as necessary to provide our services</li>
                <li>You understand that anonymized data may be used for research and development</li>
              </ul>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("ip", el)} id="ip">
              <h2>7. Intellectual Property</h2>
              <p>
                All content on our platform, including text, graphics, logos, and software, is the property of Eagle Labs or its content suppliers and is protected by intellectual property laws worldwide. You may not use, reproduce, distribute, or create derivative works from this content without our express written permission.
              </p>
              <p>
                Any feedback, suggestions, or ideas you provide regarding our services may be used by us without any obligation to compensate you.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("thirdparty", el)} id="thirdparty">
              <h2>8. Third-Party Services</h2>
              <p>
                Our services may include links to third-party websites or services that are not owned or controlled by Eagle Labs. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p>
                You acknowledge and agree that Eagle Labs shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("liability", el)} id="liability">
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Eagle Labs and its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="terms-list">
                <li>Your access to or use of or inability to access or use our services</li>
                <li>Any conduct or content of any third party on our services</li>
                <li>Any content obtained from our services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("disclaimers", el)} id="disclaimers">
              <h2>10. Disclaimers</h2>
              <p>
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
              <p>
                Eagle Labs does not warrant that our services will function uninterrupted, secure, or available at any particular time or location; that any errors or defects will be corrected; or that our services are free of viruses or other harmful components.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("modifications", el)} id="modifications">
              <h2>11. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
              </p>
              <p>
                We will make reasonable efforts to notify you of significant changes, but it is your responsibility to review these Terms periodically.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("governing", el)} id="governing">
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the British Virgin Islands, without regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("compliance", el)} id="compliance">
              <h2>13. International Use and Compliance</h2>
              <p>
                Eagle Labs' services are intended for global use. However, you agree to comply with all local laws, regulations, and rules that apply to your use of our services. We reserve the right to limit our services in any country.
              </p>
              <p>
                You are responsible for compliance with local laws if and to the extent such laws are applicable in your jurisdiction.
              </p>
            </div>
            
            <div className="terms-section" ref={(el) => registerRef("contact", el)} id="contact">
              <h2>14. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="contact-info">
                info@eaglelabs.com
              </p>
              <p>
                Eagle Labs<br />
                Road Town, Tortola<br />
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
              <li className={activeSection === "services" ? "active" : ""}>
                <a href="#services" onClick={(e) => {e.preventDefault(); scrollToSection("services")}}>2. Services Description</a>
              </li>
              <li className={activeSection === "eligibility" ? "active" : ""}>
                <a href="#eligibility" onClick={(e) => {e.preventDefault(); scrollToSection("eligibility")}}>3. User Eligibility</a>
              </li>
              <li className={activeSection === "account" ? "active" : ""}>
                <a href="#account" onClick={(e) => {e.preventDefault(); scrollToSection("account")}}>4. Account Security</a>
              </li>
              <li className={activeSection === "usage" ? "active" : ""}>
                <a href="#usage" onClick={(e) => {e.preventDefault(); scrollToSection("usage")}}>5. Acceptable Use</a>
              </li>
              <li className={activeSection === "data" ? "active" : ""}>
                <a href="#data" onClick={(e) => {e.preventDefault(); scrollToSection("data")}}>6. Data Usage</a>
              </li>
              <li className={activeSection === "ip" ? "active" : ""}>
                <a href="#ip" onClick={(e) => {e.preventDefault(); scrollToSection("ip")}}>7. Intellectual Property</a>
              </li>
              <li className={activeSection === "thirdparty" ? "active" : ""}>
                <a href="#thirdparty" onClick={(e) => {e.preventDefault(); scrollToSection("thirdparty")}}>8. Third-Party Services</a>
              </li>
              <li className={activeSection === "liability" ? "active" : ""}>
                <a href="#liability" onClick={(e) => {e.preventDefault(); scrollToSection("liability")}}>9. Limitation of Liability</a>
              </li>
              <li className={activeSection === "disclaimers" ? "active" : ""}>
                <a href="#disclaimers" onClick={(e) => {e.preventDefault(); scrollToSection("disclaimers")}}>10. Disclaimers</a>
              </li>
              <li className={activeSection === "modifications" ? "active" : ""}>
                <a href="#modifications" onClick={(e) => {e.preventDefault(); scrollToSection("modifications")}}>11. Modifications</a>
              </li>
              <li className={activeSection === "governing" ? "active" : ""}>
                <a href="#governing" onClick={(e) => {e.preventDefault(); scrollToSection("governing")}}>12. Governing Law</a>
              </li>
              <li className={activeSection === "compliance" ? "active" : ""}>
                <a href="#compliance" onClick={(e) => {e.preventDefault(); scrollToSection("compliance")}}>13. International Use</a>
              </li>
              <li className={activeSection === "contact" ? "active" : ""}>
                <a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection("contact")}}>14. Contact Information</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default TermsAndConditions;