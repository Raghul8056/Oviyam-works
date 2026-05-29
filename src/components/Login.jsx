import React from 'react';
import './Login.css';

const Login = ({ onBack }) => {
  return (
    <div className="login-page">
      {/* Absolute positioned Back Button */}
      <button className="login-page__back-btn" onClick={onBack} aria-label="Go Back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        <span>Back to Home</span>
      </button>

      {/* Decorative Background Elements */}
      <div className="login-page__bg-texture" />

      <div className="login-page__container">
        
        {/* Left Visual Column */}
        <div className="login-page__left">
           <div className="login-page__image-wrapper">
             <img src="/story/temple-cutout.png" alt="Oviyam Divine Art" className="login-page__image" />
           </div>
           <div className="login-page__left-content">
             <h3>Masterpieces of Devotion</h3>
             <p>Access exclusive 3D Tanjore collections and manage your custom artwork consultations.</p>
           </div>
        </div>

        {/* Right Form Column */}
        <div className="login-page__right">
          <img src="/logo.png" alt="Oviyam Logo" className="login-page__logo" />
          <h2 className="login-page__title">Welcome to Oviyam</h2>
          <p className="login-page__subtitle">Sign in to access your sacred collections.</p>

          <form className="login-page__form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-page__form-group">
              <label htmlFor="login-email">Email Address</label>
              <input type="email" id="login-email" placeholder="Enter your email" />
            </div>
            
            <div className="login-page__form-group">
              <div className="login-page__password-header">
                <label htmlFor="login-password">Password</label>
                <a href="#forgot" className="login-page__forgot">Forgot?</a>
              </div>
              <input type="password" id="login-password" placeholder="Enter your password" />
            </div>

            <button type="submit" className="login-page__submit-btn">
              Sign In
            </button>
          </form>

          <div className="login-page__divider">
            <span>OR</span>
          </div>

          <button className="login-page__google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="login-page__footer">
            Don't have an account? <a href="#register">Register Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
