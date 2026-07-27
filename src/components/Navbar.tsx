/**
 * Navbar.tsx — Navigation Bar & Mobile Hamburger Menu
 *
 * Provides the fixed-position navigation bar with:
 * - Brand logo/title linking to homepage
 * - Desktop navigation links (About, Resume, Work, Contact) with hover animations
 * - Email link centered in the navbar (visible on desktop)
 * - Hamburger button for mobile with fullscreen overlay menu
 * - GSAP ScrollSmoother integration for smooth scrolling navigation
 * - Animated background circles and fade gradient
 */

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

// Register GSAP plugins for scroll smoothing and scroll-triggered animations
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// Export smoother instance so other components can programmatically scroll
export let smoother: ScrollSmoother;

/**
 * Navbar component — Main navigation for the portfolio site.
 * Manages desktop nav, mobile hamburger menu, and GSAP smooth scrolling.
 */
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /**
   * Initialize GSAP ScrollSmoother and attach scroll-to navigation.
   * Creates a smooth scrolling experience with inertia effects.
   * On desktop (> 1024px), nav clicks use smoother.scrollTo for animated scrolling.
   * On mobile, native anchor behavior handles the scroll.
   */
  useEffect(() => {
    // Create ScrollSmoother instance wrapping the main content
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.5,
      speed: 0.5,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    // Reset scroll position and pause until user interacts
    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a, .mobile-nav-links a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);  /**
   * Prevent body scroll when the mobile hamburger menu is open.
   * This ensures users don't accidentally scroll the page behind the overlay.
   */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Ishfaq Mir
        </a>
        <a
          href="mailto:mirishfaq01@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          mirishfaq01@gmail.com
        </a>

        {/* Desktop nav */}
        <ul className="desktop-nav">
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#career" href="#career">
              <HoverLinks text="RESUME" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? "hamburger-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          data-cursor="disable"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "mobile-menu-open" : ""}`}>
        <nav className="mobile-nav-links">
          <a data-href="#about" href="#about" onClick={closeMenu}>
            <span className="mobile-nav-num">01</span> About
          </a>
          <a data-href="#career" href="#career" onClick={closeMenu}>
            <span className="mobile-nav-num">02</span> Resume
          </a>
          <a data-href="#work" href="#work" onClick={closeMenu}>
            <span className="mobile-nav-num">03</span> Work
          </a>
          <a data-href="#contact" href="#contact" onClick={closeMenu}>
            <span className="mobile-nav-num">04</span> Contact
          </a>
          <a
            href="mailto:mirishfaq01@gmail.com"
            className="mobile-nav-email"
            onClick={closeMenu}
          >
            mirishfaq01@gmail.com
          </a>
        </nav>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
