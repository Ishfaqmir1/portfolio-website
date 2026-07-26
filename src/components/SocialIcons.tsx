/**
 * SocialIcons.tsx — Fixed-position social links & resume download button
 *
 * Renders at the bottom of the viewport with:
 * - Social media icon links (GitHub, LinkedIn, Twitter/X, Instagram)
 *   displayed as a horizontal row on mobile and a vertical column on desktop
 * - Resume download button as a pill badge on mobile, inline text on desktop
 * - Mouse-follow hover effect on desktop that subtly tracks cursor position
 */

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

/**
 * SocialIcons component — Fixed bottom bar with social links and resume download.
 * Adapts layout responsively: horizontal row on mobile, vertical column on desktop.
 */
const SocialIcons = () => {
  /**
   * Mouse-follow hover effect for desktop social icons.
   * Tracks cursor position within each icon span and smoothly animates
   * the icon position via CSS custom properties and requestAnimationFrame.
   * Only active on viewports >= 900px.
   */
  useEffect(() => {
    // Skip mouse tracking on mobile — icons use simpler hover effects there
    if (window.innerWidth < 900) return;

    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/ishfaqmir" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/ishfaq-mir" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/resume.pdf" target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
