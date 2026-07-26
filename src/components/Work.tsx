/**
 * Work.tsx — Projects / Portfolio Showcase Section
 * 
 * Displays a horizontally scrollable carousel of project cards using GSAP
 * ScrollTrigger for the horizontal scroll animation. Each card shows the
 * project name, category, detailed description, tech stack, and an optional
 * external link (website or GitHub). Projects without links hide the arrow icon.
 */

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
  },
  {
    name: "Smart Orchard IoT Platform",
    category: "IoT & Agriculture Monitoring",
    description:
      "Weather, soil, and device monitoring dashboards with real-time analytics. Integrated AWS IoT Core, MQTT, Lambda, irrigation automation, disease recommendations, and alert notifications.",
    tools: "React.js, Next.js, Node.js, PostgreSQL, AWS IoT",
    link: "https://dev.gongulos.applekul.com",
  },
  {
    name: "Enterprise HRMS SaaS Platform",
    category: "Human Resource Management System",
    description:
      "Employee, attendance, leave, payroll, organization, and role management modules. Built onboarding, subscription plans, approval workflows, analytics dashboards, and employee self-service.",
    tools: "Next.js, NestJS, PostgreSQL, Prisma, Redis, AWS",
    link: "https://github.com/ishfaqmir",
  },
  {
    name: "POS & Inventory Management",
    category: "Point of Sale & Inventory System",
    description:
      "POS billing, inventory, sales, customer, invoice, and reporting modules. Built analytics dashboards, stock management, and sales reporting features.",
    tools: "React.js, Next.js, Node.js, PostgreSQL",
    link: "https://kash-x.netlify.app",
  },
  {
    name: "YouTube Clone",
    category: "Video Streaming Platform",
    description:
      "Full-featured video streaming platform with user authentication, video upload, search, comments, likes, and subscriptions. Built with modern React architecture and RESTful APIs.",
    tools: "React.js, Next.js, Node.js, Express.js, MongoDB, JWT, TypeScript",
    link: "",
  },
  {
    name: "E-Commerce Web App",
    category: "Online Shopping Platform",
    description:
      "Complete e-commerce solution with product catalog, shopping cart, checkout flow, payment integration, order tracking, and admin dashboard for inventory management.",
    tools: "React.js, Next.js, Redux Toolkit, Node.js, Express.js, TypeScript",
    link: "",
  },
  {
    name: "Smart Farmer Guide",
    category: "Agriculture Advisory Platform",
    description:
      "Smart agriculture advisory system providing crop recommendations, weather forecasts, pest alerts, and fertilizer suggestions based on soil data and regional analytics.",
    tools: "React.js, Next.js, Node.js, MongoDB, APIs, TypeScript",
    link: "",
  },
];

/**
 * Work component — Renders the projects section with horizontal scroll.
 * Uses GSAP ScrollTrigger to pin the section and translate the flex container
 * horizontally as the user scrolls, creating a carousel-like browsing experience.
 */
const Work = () => {
  /**
   * Initialize GSAP horizontal scroll animation.
   * Calculates the total scroll distance based on the number of project cards
   * and their container width, then creates a pinned scroll-triggered animation
   * that translates .work-flex horizontally.
   */
  useGSAP(() => {
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
        scrub: true,         // Link animation progress to scroll position
        pin: true,            // Pin the section while scrolling through cards
        id: "work",
      },
    });

    // Animate the flex container to the left by the calculated distance
    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up GSAP instances on unmount to prevent memory leaks
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
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
              {/* WorkImage renders the project thumbnail with optional link icon */}
              <WorkImage
                image="/images/placeholder.webp"
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
