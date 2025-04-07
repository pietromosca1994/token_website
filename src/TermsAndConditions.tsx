import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./App.css";
import "./TermsAndConditions.css";

// Terms and Conditions Page
function TermsAndConditions() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      
      <Header />
      
      <main className="main-content">
        <div className="content-container">
          <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions</h1>
            
            <div className="terms-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Battery DAO's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>2. Description of Service</h2>
              <p>
                Battery DAO provides a decentralized platform for EV battery owners to connect their vehicles through the DIMO network, contribute battery data, and participate in a decentralized autonomous organization. Our service includes web interfaces, smart contracts, and blockchain interactions on the Solana network.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>3. User Eligibility</h2>
              <p>
                To use our services, you must:
              </p>
              <ul className="terms-list">
                <li>Be at least 18 years old or the legal age in your jurisdiction</li>
                <li>Have the legal capacity to enter into a binding agreement</li>
                <li>Not be prohibited from using blockchain technology in your jurisdiction</li>
                <li>Maintain control of your private keys and wallet security</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h2>4. Account Registration and Security</h2>
              <p>
                When you connect with DIMO and/or link a wallet, you are responsible for:
              </p>
              <ul className="terms-list">
                <li>Maintaining the confidentiality of your credentials</li>
                <li>Restricting access to your account and devices</li>
                <li>All activities that occur under your account</li>
                <li>Implementing proper security measures for your wallet</li>
              </ul>
              <p>
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>5. Blockchain Interactions</h2>
              <p>
                You acknowledge and understand that:
              </p>
              <ul className="terms-list">
                <li>Transactions on the blockchain are irreversible</li>
                <li>You are responsible for any network fees (gas fees) associated with transactions</li>
                <li>The security and custody of your private keys are your responsibility</li>
                <li>We cannot recover lost keys or reverse blockchain transactions</li>
                <li>Smart contract interactions carry inherent risks</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h2>6. Data Contributions</h2>
              <p>
                By contributing battery data through the DIMO network:
              </p>
              <ul className="terms-list">
                <li>You represent that you have the right to share such data</li>
                <li>You grant Battery DAO a non-exclusive license to use, analyze, and aggregate this data</li>
                <li>You acknowledge that anonymized data may be used for research and development</li>
                <li>You understand that data contributed to the blockchain becomes public and permanent</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h2>7. DAO Participation</h2>
              <p>
                As a participant in Battery DAO:
              </p>
              <ul className="terms-list">
                <li>You have the right to participate in governance according to the established mechanisms</li>
                <li>Your voting power may be proportional to your contribution or token holdings</li>
                <li>You agree to abide by the outcomes of legitimate governance votes</li>
                <li>You understand that the DAO structure may evolve over time</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h2>8. Intellectual Property</h2>
              <p>
                All content on our platform, including text, graphics, logos, and software, is the property of Battery DAO or its content suppliers and is protected by intellectual property laws. The open-source components are subject to their respective licenses.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Battery DAO shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or related to your use of our service, even if we have been advised of the possibility of such damages.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>10. Disclaimers</h2>
              <p>
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free. We are not responsible for the actions, content, information, or data of third parties.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>11. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Battery DAO is registered, without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div className="terms-section">
              <h2>13. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="contact-info">
                legal@batterydao.com
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default TermsAndConditions;