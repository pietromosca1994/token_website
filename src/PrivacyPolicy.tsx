import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./PrivacyPolicy.css"; // You'll need to create this CSS file

// Privacy Policy Page
function PrivacyPolicy() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          <div className="policy-container">
            <h1 className="policy-title">Privacy Policy</h1>
            
            <div className="policy-section">
              <h2>Introduction</h2>
              <p>
                At Battery DAO, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service. Please read this 
                privacy policy carefully. If you do not agree with the terms of this privacy policy, please 
                do not access the site.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="policy-list">
                <li>Register for an account</li>
                <li>Connect your DIMO vehicles</li>
                <li>Link your Solana wallet</li>
                <li>Submit battery information</li>
                <li>Participate in community governance</li>
                <li>Contact our support team</li>
              </ul>
              <p>
                This may include your name, email address, wallet addresses, vehicle information, 
                and battery telemetry data shared through the DIMO network.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="policy-list">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Verify battery connections and contributions</li>
                <li>Distribute rewards based on participation</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
              </ul>
            </div>
            
            <div className="policy-section">
              <h2>Blockchain Data</h2>
              <p>
                Given the nature of blockchain technology, certain information such as wallet addresses and 
                transaction details are stored on a public blockchain and are not considered private information. 
                You acknowledge that such information is public and transparent.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Data Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="policy-list">
                <li>DIMO network partners when explicitly authorized by you</li>
                <li>Service providers who perform services on our behalf</li>
                <li>As required by law or to protect rights and safety</li>
              </ul>
              <p>
                We will never sell your personal data to third parties.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Data Security</h2>
              <p>
                We use reasonable administrative, technical, and physical measures to help protect your 
                personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, 
                and destruction. However, no method of transmission over the Internet or electronic storage is 
                100% secure, so we cannot guarantee absolute security.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information, such as:
              </p>
              <ul className="policy-list">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to our processing of your information</li>
                <li>Portability of your information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. The updated version will be effective 
                as of the updated date referenced above. We encourage you to review this privacy policy 
                frequently to stay informed about how we are protecting your information.
              </p>
            </div>
            
            <div className="policy-section">
              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about this privacy policy or our practices, please contact us at:
              </p>
              <p className="contact-info">
                privacy@batterydao.com
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;