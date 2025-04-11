// src/Payment.tsx
import GlobeVisualization from "./components/GlobeVisualization";
import { Footer } from "./Footer";
import { Header } from "./Header";
import PaymentComponent from "./components/PaymentComponent";
import "./App.css";
import "./TermsAndConditions.css";
import "./Payment1.css"; // Add new CSS
import { useState, useEffect, useRef } from "react";

function Payment() {
  return (
    <div className="main-page">
      <div className="globe-background">
        <GlobeVisualization />
      </div>
      <Header />
      <main className="payment-container">
        <div className="payment-content">
          <h1 className="payment-title">Purchase Tokens</h1>
          <PaymentComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Payment;