import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import OurStory from './components/OurStory';
import VideoSection from './components/VideoSection';
import OurServices from './components/OurServices';
import OurCollections from './components/OurCollections';
import OurStats from './components/OurStats';
import Cta from './components/Cta';
import Footer from './components/Footer';
import Login from './components/Login';
import { useGSAPInit } from './hooks/useGSAP';

import './App.css';
import './animations.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  // Initialize GSAP + ScrollTrigger
  useGSAPInit();

  return (
    <>
      {showLogin && <Login onBack={() => setShowLogin(false)} />}
      
      <div className="app" id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar onLoginClick={() => setShowLogin(true)} />

          <main id="page-content" className="page-content">
            {/* Spacer to account for fixed navbar */}
            <div style={{ height: '118px' }} />

            {/* Hero Image Slider */}
            <HeroSlider />

            {/* Section 2: Our Story */}
            <OurStory />

            {/* Video Placeholder */}
            <VideoSection />

            {/* Section 3: Our Services */}
            <OurServices />

            {/* Section 4: Our Collections */}
            <OurCollections />

            {/* Section 6: Our Stats */}
            <OurStats />

            {/* Section 7: CTA */}
            <Cta />

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
