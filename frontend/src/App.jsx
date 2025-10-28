import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProblemsSection from "./components/ProblemsSection";
import AboutSection from "./components/AboutSection";
import UniquenessSection from "./components/UniquenessSection";
import FounderMessageSection from "./components/FounderMessageSection";
import PersonalNotesSection from "./components/PersonalNotesSection";
import RegistrationForm from "./components/RegistrationForm";
import ThankYouPage from "./components/ThankYouPage";

function App() {
  const [referrer, setReferrer] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref") || "unknown";
    setReferrer(ref);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <TopBar />
              <Header />
              <HeroSection />
              <ProblemsSection />
              <UniquenessSection />
              <FounderMessageSection />
             
            </>
          }
        />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;
