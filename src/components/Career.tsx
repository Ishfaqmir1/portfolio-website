/**
 * Career.tsx — Full Resume / Career Section
 *
 * Comprehensive resume section featuring:
 * - Professional summary with highlighted expertise
 * - Technical skills grouped by category (Frontend, Backend, Database, Cloud, Tools)
 * - Work experience timeline with detailed role descriptions
 * - Education card with degree and CGPA
 * - Certifications list with animated cards
 *
 * Uses a timeline design with animated glowing dot and gradient line.
 */

import "./styles/Career.css";

/**
 * Skills data organized by category for the skills grid section.
 * Each category renders as a labeled group of pill-shaped skill badges.
 */
const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "Tailwind CSS", "HTML5", "CSS3"],
  backend: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT Authentication", "RBAC", "Prisma ORM"],
  database: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  cloud: ["AWS (EC2, S3, IoT Core, Lambda)", "Docker", "Git", "GitHub", "CI/CD"],
  tools: ["Postman", "Swagger", "VS Code", "Vercel", "Render", "Cloudflare"],
};

/**
 * SkillBadges — Renders a row of skill pill badges for a given category.
 * Each badge has a subtle border, purple tint, and hover animation.
 */
const SkillBadges = ({ items }: { items: string[] }) => (
  <div className="skill-badges">
    {items.map((skill) => (
      <span key={skill} className="skill-badge">
        {skill}
      </span>
    ))}
  </div>
);

/**
 * Career component — Displays the full resume with summary, skills, experience,
 * education, and certifications in a visually appealing layout.
 */
const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        {/* Professional Summary */}
        <div className="career-summary">
          <h2>
            My <span>Resume</span>
          </h2>
          <p className="summary-text">
            Full Stack Software Engineer with 3+ years of experience designing
            and developing scalable SaaS applications, enterprise platforms, and
            REST APIs using React.js, Next.js, Node.js, TypeScript, PostgreSQL,
            and AWS. Skilled in building secure authentication systems,
            cloud-integrated solutions, performance optimization, and scalable
            application architecture from development to production deployment.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="skills-section">
          <h3 className="section-title">
            Technical <span>Skills</span>
          </h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <SkillBadges items={skills.frontend} />
            </div>
            <div className="skill-category">
              <h4>Backend</h4>
              <SkillBadges items={skills.backend} />
            </div>
            <div className="skill-category">
              <h4>Database</h4>
              <SkillBadges items={skills.database} />
            </div>
            <div className="skill-category">
              <h4>Cloud & DevOps</h4>
              <SkillBadges items={skills.cloud} />
            </div>
            <div className="skill-category">
              <h4>Tools & Platforms</h4>
              <SkillBadges items={skills.tools} />
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <h3 className="section-title">
          Work <span>Experience</span>
        </h3>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer (Full Stack)</h4>
                <h5>Infahs Pvt Ltd</h5>
              </div>
              <h3>2025 — Present</h3>
            </div>
            <p>
              Designed and developed scalable SaaS applications using React.js,
              Next.js, Node.js, TypeScript, PostgreSQL, and NestJS. Built secure
              authentication, RBAC, REST APIs, dashboards, and reusable backend
              modules for enterprise applications. Developed order management,
              inventory, reporting, workflow automation, and notification
              systems. Built real-time IoT dashboards integrating weather, soil
              moisture, leaf, and satellite data for orchard monitoring and
              analytics. Optimized PostgreSQL queries, API performance, and
              frontend rendering. Diagnosed and resolved production issues,
              authentication failures, database bottlenecks, sensor data
              synchronization, and deployment challenges.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Technical Engineer</h4>
                <h5>Sheen Agri Fresh Pvt Ltd</h5>
              </div>
              <h3>2023 — 2025</h3>
            </div>
            <p>
              Managed technical infrastructure, deployments, and system
              maintenance. Resolved hardware, software, and network issues to
              ensure operational continuity. Improved system reliability through
              troubleshooting, preventive maintenance, and workflow automation.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="education-section">
          <h3 className="section-title">
            <span>Education</span>
          </h3>
          <div className="education-card">
            <div className="education-header">
              <div>
                <h4>Bachelor of Engineering</h4>
                <h5>Electronics & Communication Engineering</h5>
              </div>
              <div className="education-meta">
                <span className="education-school">University of Kashmir</span>
                <span className="education-year">2019 — 2023</span>
              </div>
            </div>
            <div className="education-cgpa">
              <span className="cgpa-badge">CGPA: 7.70 / 10</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="certifications-section">
          <h3 className="section-title">
            <span>Certifications</span>
          </h3>
          <div className="certifications-list">
            <div className="cert-card">
              <span className="cert-dot"></span>
              <div>
                <h4>Full Stack Web Development with DSA</h4>
                <p>Internshala</p>
              </div>
            </div>
            <div className="cert-card">
              <span className="cert-dot"></span>
              <div>
                <h4>Embedded Systems</h4>
                <p>Prolific Technologies, Srinagar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
