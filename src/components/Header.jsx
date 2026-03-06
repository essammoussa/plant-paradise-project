/**
 * Header Component — Paradise Nursery (Redesigned)
 * Matches the Landing page design system: Cormorant Garamond + DM Sans,
 * forest/cream/terracotta tokens, hide-on-scroll-down / show-on-scroll-up.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Home, TreePine } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();
  const location          = useLocation();
  const totalItems        = getTotalItems();

  /* ── Hide-on-scroll-down / show-on-scroll-up ── */
  const [scrolled,   setScrolled]   = React.useState(false);
  const [navHidden,  setNavHidden]  = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (y > 80) {
        setNavHidden(y > lastScrollY.current);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .pn-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(247,243,236,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(107,143,94,0.15);
          transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .3s;
          font-family: 'DM Sans', sans-serif;
        }
        .pn-header.scrolled  { box-shadow: 0 4px 32px rgba(26,46,26,.08); }
        .pn-header.hidden    { transform: translateY(-100%); }

        .pn-header-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }

        /* Logo */
        .pn-hdr-logo {
          display: flex; align-items: center; gap: .6rem;
          text-decoration: none;
        }
        .pn-hdr-logo-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: #1a2e1a;
          display: flex; align-items: center; justify-content: center;
          transition: transform .3s;
          flex-shrink: 0;
        }
        .pn-hdr-logo:hover .pn-hdr-logo-icon {
          transform: rotate(15deg) scale(1.05);
        }
        .pn-hdr-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 500;
          color: #1a2e1a; letter-spacing: .02em;
          white-space: nowrap;
        }

        /* Nav links */
        .pn-hdr-nav {
          display: flex; align-items: center; gap: 2rem;
        }
        .pn-hdr-link {
          display: flex; align-items: center; gap: .4rem;
          font-size: .82rem; font-weight: 400;
          letter-spacing: .06em; text-transform: uppercase;
          color: #2d4a2d; text-decoration: none;
          position: relative; padding-bottom: 2px;
          transition: color .2s;
        }
        .pn-hdr-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: #c4714a;
          transition: width .25s ease;
        }
        .pn-hdr-link:hover { color: #1a2e1a; }
        .pn-hdr-link:hover::after { width: 100%; }
        .pn-hdr-link.active { color: #1a2e1a; }
        .pn-hdr-link.active::after { width: 100%; }

        /* Cart button */
        .pn-hdr-cart {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 50%;
          border: 1.5px solid rgba(45,74,45,.2);
          color: #2d4a2d; text-decoration: none;
          transition: background .2s, border-color .2s, transform .2s;
        }
        .pn-hdr-cart:hover {
          background: rgba(26,46,26,.06);
          border-color: rgba(45,74,45,.4);
          transform: scale(1.05);
        }
        .pn-hdr-cart.active {
          background: #1a2e1a; color: #f7f3ec;
          border-color: #1a2e1a;
        }

        /* Badge */
        .pn-hdr-badge {
          position: absolute; top: -5px; right: -5px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #c4714a; color: #fff;
          font-size: .65rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid rgba(247,243,236,0.92);
          animation: badgePop .25s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes badgePop {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        /* Offset page content under fixed header */
        .pn-header-offset { height: 72px; }
      `}</style>

      <header className={`pn-header${scrolled ? ' scrolled' : ''}${navHidden ? ' hidden' : ''}`}>
        <div className="pn-header-inner">

          {/* Logo */}
          <Link to="/" className="pn-hdr-logo">
            <div className="pn-hdr-logo-icon">
              <Leaf size={17} color="#f7f3ec" />
            </div>
            <span className="pn-hdr-logo-text">Paradise Nursery</span>
          </Link>

          {/* Nav */}
          <nav className="pn-hdr-nav">
            <Link to="/" className={`pn-hdr-link${isActive('/') ? ' active' : ''}`}>
              <Home size={13} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link to="/products" className={`pn-hdr-link${isActive('/products') ? ' active' : ''}`}>
              <TreePine size={13} />
              Plants
            </Link>

            {/* Cart */}
            <Link to="/cart" className={`pn-hdr-cart${isActive('/cart') ? ' active' : ''}`} aria-label={`Cart (${totalItems} items)`}>
              <ShoppingCart size={17} />
              {totalItems > 0 && (
                <span key={totalItems} className="pn-hdr-badge">{totalItems}</span>
              )}
            </Link>
          </nav>

        </div>
      </header>

      {/* Spacer so content doesn't hide under fixed header */}
      <div className="pn-header-offset" />
    </>
  );
};

export default Header;