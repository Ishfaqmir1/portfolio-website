/**
 * Work.tsx — Projects / Portfolio Showcase Section
 *
 * Modern premium horizontal carousel with arrow navigation.
 * Desktop: 2 projects visible at a time, horizontal scroll via arrows.
 * Mobile: 1 project at a time with native scroll-snap.
 */

import { useState, useRef, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

/**
 * Project data array — each object represents a portfolio project.
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
 * Work component — Modern premium horizontal carousel for projects.
 */
const Work = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop: 2 cards per page; Mobile: 1 card per page
  const isDesktop = () => window.innerWidth >= 768;
  const cardsPerPage = () => (isDesktop() ? 2 : 1);
  const totalPages = Math.ceil(projects.length / cardsPerPage());

  /**
   * Scroll the carousel to a specific page.
   */
  const scrollToPage = useCallback(
    (page: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const card = el.querySelector(".work-box") as HTMLElement | null;
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = 0;
      const cardsPer = cardsPerPage();
      const targetIndex = page * cardsPer;
      const targetScroll = targetIndex * (cardWidth + gap);
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveIndex(targetIndex);
    },
    []
  );

  const scrollPrev = useCallback(() => {
    const cardsPer = cardsPerPage();
    const currentPage = Math.floor(activeIndex / cardsPer);
    scrollToPage(currentPage - 1);
  }, [activeIndex, scrollToPage, cardsPerPage]);

  const scrollNext = useCallback(() => {
    const cardsPer = cardsPerPage();
    const currentPage = Math.floor(activeIndex / cardsPer);
    scrollToPage(currentPage + 1);
  }, [activeIndex, scrollToPage, cardsPerPage]);

  /**
   * Track active index on scroll.
   */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardsPer = cardsPerPage();
    const scrollLeft = el.scrollLeft;
    const card = el.querySelector(".work-box") as HTMLElement | null;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const approxIndex = Math.round(scrollLeft / cardWidth);
    const snappedIndex = Math.min(
      Math.max(0, Math.floor(approxIndex / cardsPer) * cardsPer),
      projects.length - cardsPer
    );
    setActiveIndex(snappedIndex);
  }, []);

  const cardsPer = cardsPerPage();
  const currentPage = Math.floor(activeIndex / cardsPer);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= totalPages - 1;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        {/* Header */}
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="work-cards-wrapper">
          <div
            className="work-flex"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                {/* Background gradient accent */}
                <div className="work-box-accent" />

                {/* Card number */}
                <div className="work-box-number">0{index + 1}</div>

                {/* Project info */}
                <div className="work-info">
                  <div className="work-title">
                    <h4>{project.name}</h4>
                    <p className="work-category">{project.category}</p>
                  </div>
                  <p className="work-description">{project.description}</p>
                  <div className="work-tools">
                    {project.tools.split(", ").map((tool, i) => (
                      <span key={i} className="work-tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project image */}
                <WorkImage
                  image={project.image}
                  alt={project.name}
                  link={project.link}
                />
              </div>
            ))}
          </div>

          {/* Floating left arrow — previous */}
          {!isFirstPage && (
            <button
              className="work-floating-arrow work-floating-prev"
              onClick={scrollPrev}
              aria-label="Previous projects"
            >
              <span className="work-floating-arrow-icon">
                <MdChevronLeft />
              </span>
            </button>
          )}

          {/* Floating right arrow — next (circular) */}
          {!isLastPage && (
            <button
              className="work-floating-arrow work-floating-next"
              onClick={scrollNext}
              aria-label="See more projects"
            >
              <span className="work-floating-arrow-icon">
                <MdChevronRight />
              </span>
            </button>
          )}
        </div>

        {/* Progress dots indicator */}
        <div className="work-scroll-indicator">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <span
              key={pageIdx}
              className={`work-scroll-dot ${currentPage === pageIdx ? "active" : ""}`}
              onClick={() => scrollToPage(pageIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
