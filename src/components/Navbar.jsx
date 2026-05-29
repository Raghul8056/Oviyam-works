import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
  const [isPoojaHovered, setIsPoojaHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isServicesHovered || isCategoriesHovered || isPoojaHovered) {
      document.body.classList.add('mega-menu-open');
    } else {
      document.body.classList.remove('mega-menu-open');
    }
  }, [isServicesHovered, isCategoriesHovered, isPoojaHovered]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Our Services', href: '#our-services' },
    { label: 'Categories', href: '#categories' },
    { label: 'Pooja Rooms', href: '#pooja-rooms' },
    { label: 'Contact Us', href: '#contact-us' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      {/* Top Row: Logo + Utility Icons */}
      <div className="navbar__top">
        <div className="navbar__container">
          {/* Logo */}
          <a href="/" className="navbar__logo" id="navbar-logo">
            <img src="/logo.png" alt="Oviyam" className="navbar__logo-img" />
          </a>

          {/* Right Utilities: Account + Cart */}
          <div className="navbar__utilities">
            {/* User Account */}
            <button 
              className="navbar__icon-btn" 
              aria-label="Account" 
              id="navbar-account-btn"
              onClick={onLoginClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart / Wishlist removed as requested */}

            {/* Mobile Menu Toggle */}
            <button
              className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              id="navbar-menu-btn"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Navigation Links */}
      <nav className="navbar__nav" id="navbar-nav">
        <div className="navbar__container">
          <ul className="navbar__links">
            {navLinks.map((link, index) => {
              const isServices = link.label === 'Our Services';
              const isCategories = link.label === 'Categories';
              const isPooja = link.label === 'Pooja Rooms';
              
              const isHovered = (isServices && isServicesHovered) || 
                                (isCategories && isCategoriesHovered) || 
                                (isPooja && isPoojaHovered);

              const hasMegaMenu = isServices || isCategories || isPooja;

              let setHover;
              if (isServices) setHover = setIsServicesHovered;
              else if (isCategories) setHover = setIsCategoriesHovered;
              else if (isPooja) setHover = setIsPoojaHovered;

              return (
                <li 
                  key={index} 
                  className={`navbar__link-item ${hasMegaMenu ? 'navbar__link-item--services' : ''}`}
                  onMouseEnter={hasMegaMenu ? () => setHover(true) : undefined}
                  onMouseLeave={hasMegaMenu ? () => setHover(false) : undefined}
                >
                  <a
                    href={link.href}
                    className="navbar__link"
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>

                  {/* Mega Menu Dropdowns */}
                  {hasMegaMenu && (
                    <div className={`navbar__mega-menu ${isHovered ? 'navbar__mega-menu--open' : ''}`}>
                      <div className="navbar__mega-menu-container">
                        <div className="navbar__mega-menu-grid">
                          
                          {/* Services Mega Menu */}
                          {isServices && (
                            <>
                              <a href="#services-2d-3d" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-artisan.png" alt="2D & 3D Designs" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">2D & 3D Designs</span>
                              </a>
                              <a href="#services-custom" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-deity.png" alt="Custom Designs" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Custom Designs</span>
                              </a>
                              <a href="#services-pooja" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-pooja.png" alt="Pooja Room Designs" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Pooja Rooms</span>
                              </a>
                            </>
                          )}

                          {/* Categories Mega Menu */}
                          {isCategories && (
                            <>
                              <a href="#collections-vaishnava" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-vishnu.png" alt="Vaishnava Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Vaishnava Collection</span>
                              </a>
                              <a href="#collections-shaiva" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-shiva.png" alt="Shaiva Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Shaiva Collection</span>
                              </a>
                              <a href="#collections-nagara" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-pooja.png" alt="Nagara Style" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Nagara Style</span>
                              </a>
                              <a href="#collections-dravidian" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-mantapa.png" alt="Dravidian Style" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Dravidian Style</span>
                              </a>
                              <a href="#collections-krishna" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-vishnu.png" alt="Krishna Special" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Krishna Special</span>
                              </a>
                              <a href="#collections-kula-deivam" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-deity.png" alt="Kula Deivam Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Kula Deivam Collection</span>
                              </a>
                              <a href="#collections-local-deivam" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-doors.png" alt="Local Deivam Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Local Deivam Collection</span>
                              </a>
                              <a href="#collections-divine-feminine" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-devi.png" alt="Divine Feminine Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Divine Feminine Collection</span>
                              </a>
                              <a href="#collections-fusion" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-decor.png" alt="Fusion Heritage Collection" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Fusion Heritage Collection</span>
                              </a>
                            </>
                          )}

                          {/* Pooja Rooms Mega Menu */}
                          {isPooja && (
                            <>
                              <a href="#pooja-mantapas" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-mantapa.png" alt="Wooden Mantapas" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Mantapas</span>
                              </a>
                              <a href="#pooja-doors" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-doors.png" alt="Temple Doors" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Temple Doors</span>
                              </a>
                              <a href="#pooja-decor" className="navbar__mega-menu-card">
                                <div className="navbar__mega-menu-img-wrapper">
                                  <img src="/services/3d-decor.png" alt="Sacred Decor" className="navbar__mega-menu-img" />
                                </div>
                                <span className="navbar__mega-menu-title">Sacred Decor</span>
                              </a>
                            </>
                          )}

                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, index) => (
            <li key={index} className="navbar__mobile-link-item">
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Overlay Background */}
      {isMobileMenuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
