/**
 * Work.tsx — Projects / Portfolio Showcase Section
 * 
 * Displays a horizontally scrollable carousel of project cards using GSAP
 * ScrollTrigger for the horizontal scroll animation. Each card shows the
 * project name, category, detailed description, tech stack, and an optional
 * external link (website or GitHub). Projects without links hide the arrow icon.
 */

import { useRef, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins for scroll-driven horizontal animation
gsap.registerPlugin(useGSAP);

/**
 * Project data array — each object represents a portfolio project.
 * @property {string} name - Display name of the project
 * @property {string} category - Short category/subtitle
 * @property {string} description - Detailed project description highlighting key features
 * @property {string} tools - Comma-separated list of technologies used
 * @property {string} link - External URL (website or GitHub); empty string hides the link icon
 */
const projects = [
  {
    name: "Unicsi",
    category: "Multi-Tenant E-Commerce SaaS Platform",
    description:
      "Label generation, order management workflow, inventory, supplier, and products management modules. Built Shopify integration, product synchronization, RBAC, and scalable REST APIs.",
    tools: "Next.js, Node.js, PostgreSQL, Prisma, AWS",
    link: "https://unicsi.com",
    image: "/images/unicsi.webp",
  },
  {
    name: "Smart Orchard IoT Platform",
    category: "IoT & Agriculture Monitoring",
    description:
      "Weather, soil, and device monitoring dashboards with real-time analytics. Integrated AWS IoT Core, MQTT, Lambda, irrigation automation, disease recommendations, and alert notifications.",
    tools: "React.js, Next.js, Node.js, PostgreSQL, AWS IoT",
    link: "https://dev.gongulos.applekul.com",
    image: "/images/project2.webp",
  },
  {
    name: "Enterprise HRMS SaaS Platform",
    category: "Human Resource Management System",
    description:
      "Employee, attendance, leave, payroll, organization, and role management modules. Built onboarding, subscription plans, approval workflows, analytics dashboards, and employee self-service.",
    tools: "Next.js, NestJS, PostgreSQL, Prisma, Redis, AWS",
    link: "https://github.com/ishfaqmir",
    image: "/images/placeholder.webp",
  },
  {
    name: "POS & Inventory Management",
    category: "Point of Sale & Inventory System",
    description:
      "POS billing, inventory, sales, customer, invoice, and reporting modules. Built analytics dashboards, stock management, and sales reporting features.",
    tools: "React.js, Next.js, Node.js, PostgreSQL",
    link: "https://kash-x.netlify.app",
    image: "/images/pos-inventory%20management.webp",
  },
  {
    name: "YouTube Clone",
    category: "Video Streaming Platform",
    description:
      "Full-featured video streaming platform with user authentication, video upload, search, comments, likes, and subscriptions. Built with modern React architecture and RESTful APIs.",
    tools: "React.js, Next.js, Node.js, Express.js, MongoDB, JWT, TypeScript",
    link: "",
    image: "/images/placeholder.webp",
  },
  {
    name: "E-Commerce Web App",
    category: "Online Shopping Platform",
    description:
      "Complete e-commerce solution with product catalog, shopping cart, checkout flow, payment integration, order tracking, and admin dashboard for inventory management.",
    tools: "React.js, Next.js, Redux Toolkit, Node.js, Express.js, TypeScript",
    link: "",
    image: "/images/placeholder.webp",
  },
  {
    name: "Smart Farmer Guide",
    category: "Agriculture Advisory Platform",
    description:
      "Smart agriculture advisory system providing crop recommendations, weather forecasts, pest alerts, and fertilizer suggestions based on soil data and regional analytics.",
    tools: "React.js, Next.js, Node.js, MongoDB, APIs, TypeScript",
    link: "",
    image: "/images/placeholder.webp",
  },
];

/**
 * Work component — Renders the projects section with horizontal scroll.
 * Uses GSAP ScrollTrigger to pin the section and translate the flex container
 * horizontally as the user scrolls, creating a carousel-like browsing experience.
 */
const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Animate the GSAP timeline to a given progress value.
   * This slides the cards horizontally WITHOUT scrolling the page.
   * Uses a smooth tween with activeIndex tracking.
   */
  const animateToProgress = (targetProgress: number) => {
    const tl = timelineRef.current;
    if (!tl) return;
    gsap.to(tl, {
      progress: targetProgress,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        const idx = Math.round(tl.progress() * (projects.length - 1));
        setActiveIndex(Math.min(idx, projects.length - 1));
      },
    });
  };

  /**
   * Initialize GSAP horizontal scroll animation.
   * Calculates the total scroll distance based on the number of project cards
   * and their container width, then creates a pinned scroll-triggered animation
   * that translates .work-flex horizontally.
   */
  useGSAP(() => {
    // Mobile: skip GSAP animation, use native scroll-snap instead
    if (window.innerWidth < 768) {
      // Track active card on mobile via native scroll
      const flex = document.querySelector(".work-flex");
      const onScroll = () => {
        const cards = document.querySelectorAll(".work-box");
        let newIndex = 0;
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          if (rect.left < window.innerWidth / 2) newIndex = i;
        });
        setActiveIndex(newIndex);
      };
      flex?.addEventListener("scroll", onScroll, { passive: true });
      return () => flex?.removeEventListener("scroll", onScroll);
    }

    // Calculate total horizontal scroll distance needed to show all project cards
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      // Total translate = (card width * card count) - (visible area width) + padding adjustment
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    // Create GSAP timeline with ScrollTrigger for pinned horizontal scroll
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 0.5,          // Link animation progress to scroll position with slight smoothing
        pin: true,            // Pin the section while scrolling through cards
        id: "work",
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (projects.length - 1));
          setActiveIndex(Math.min(idx, projects.length - 1));
        },
      },
    });

    timelineRef.current = timeline;

    // Animate the flex container to the left by the calculated distance
    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up GSAP instances on unmount to prevent memory leaks
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
      timelineRef.current = null;
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-cards-wrapper">
          {/* Left side arrow overlay */}
          <span className={`work-nav-arrow work-nav-left ${activeIndex <= 0 ? "arrow-disabled" : ""}`} onClick={() => {
            const progress = Math.max(0, (activeIndex - 2) / (projects.length - 1));
            animateToProgress(progress);
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </span>
          <div className="work-flex">
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Description</h4>
                  <p>{project.description}</p>
                  <h4 style={{ marginTop: 10 }}>Tools & features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.name}
                  link={project.link}
                />
              </div>
            ))}
          </div>
          {/* Right side arrow overlay */}
          <span className={`work-nav-arrow work-nav-right ${activeIndex >= projects.length - 2 ? "arrow-disabled" : ""}`} onClick={() => {
            const progress = Math.min(1, (activeIndex + 2) / (projects.length - 1));
            animateToProgress(progress);
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
        </div>
        {/* Below cards: Progress dots indicator */}
        <div className="work-scroll-indicator">
          {projects.map((_, i) => {
            const isDesktop = window.innerWidth > 768;
            const dotIndex = isDesktop ? Math.floor(i / 2) : i;
            const currentDot = isDesktop ? Math.floor(activeIndex / 2) : activeIndex;
            if (isDesktop && i % 2 !== 0) return null;
            return (
              <span
                key={i}
                className={`work-scroll-dot ${currentDot === dotIndex ? "active" : ""}`}
                data-index={i}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    // Mobile: native scroll to card
                    const cards = document.querySelectorAll(".work-box");
                    if (cards[i]) {
                      cards[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
                    }
                  } else {
                    const progress = i / (projects.length - 1);
                    animateToProgress(progress);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
