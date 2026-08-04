"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import SectionEffects from "@/components/SectionEffects";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import type { IconType } from "react-icons";
import { TbBrandAws, TbBrandAzure } from "react-icons/tb";
import {
  SiApache, SiApachemaven, SiCloudinary, SiCplusplus, SiDjango, SiDocker, SiExpress, SiFlask, SiFlyway, SiGit,
  SiGithubactions, SiHibernate, SiJavascript, SiJsonwebtokens, SiJunit5, SiLangchain, SiMongodb, SiNextdotjs,
  SiNodedotjs, SiOpenapiinitiative, SiOpencv, SiOpenjdk, SiPostgresql, SiPython, SiPytorch, SiReact, SiSpringboot,
  SiSwagger, SiTailwindcss, SiTensorflow, SiTypescript,
} from "react-icons/si";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Orbit,
  Send,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const navItems = ["home", "about", "experience", "projects", "skills", "education", "contact"];

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
const ImmersiveBackground = dynamic(() => import("@/components/ImmersiveBackground"), { ssr: false });

const projects = [
  { number: "01", title: "QuickServe", problem: "Customers and local service providers need one secure workflow for discovery, booking, and service management.", impact: "Built and deployed a Spring Boot, React, and PostgreSQL platform with JWT-secured APIs, Cloudinary media handling, environment-based configuration, and Agile Git delivery.", tags: ["Java", "Spring Boot", "React", "PostgreSQL", "JWT", "Cloudinary"], accent: "coral", status: "Deployed full stack", github: "https://github.com/Garvity/QuickServeLocalizedServiceAndBookingApp", demo: "https://quick-serve-localized-service-and-b-snowy.vercel.app/" },
  { number: "02", title: "LoanServ", problem: "Loan origination and servicing require reliable coordination across underwriting, disbursement, repayments, role transitions, and concurrent updates.", impact: "Architected an eight-module Spring Boot platform with JPA/Hibernate, Flyway, SOAP/JAXB, JMS, JWT security, audit trails, transaction locking, 19 automated tests, CI, and Docker Compose.", tags: ["Java", "Spring Boot", "Hibernate", "SOAP", "JMS", "Testcontainers"], accent: "blue", status: "Enterprise backend", github: "https://github.com/Garvity/LoanServ" },
  { number: "03", title: "PayRecon", problem: "Payment teams need consistent XML transformation, ingestion, ledger matching, and rapid notification when transactions do not reconcile.", impact: "Built an XSD/JAXB and Saxon XSLT pipeline with scheduled and Servlet ingestion, PostgreSQL reconciliation, Artemis notifications, XMLUnit tests, and an API-key-secured OpenAPI REST API.", tags: ["Java", "Spring Boot", "JAXB", "XSLT", "PostgreSQL", "ActiveMQ"], accent: "lime", status: "Payment platform", github: "https://github.com/Garvity/PayRecon" },
  { number: "04", title: "StatementVault", problem: "Financial statement generation and fraud monitoring must remain secure, auditable, and dependable without a full application framework.", impact: "Engineered a framework-free Servlets/JSP system using JDBC and HikariCP, cron-driven PDF and fraud batches, Oracle/PostgreSQL, and CSRF, XSS, and session-fixation defenses.", tags: ["Java", "Servlets", "JSP", "JDBC", "Oracle", "PostgreSQL"], accent: "coral", status: "Secure Java system", github: "https://github.com/Garvity/Statement-Vault" },
  { number: "05", title: "InfraRAG", problem: "Production RAG systems need controlled agent reasoning, safe retrieval, resilient model access, and measurable answer quality.", impact: "Architected a cyclic Planner-Retriever-Responder LangGraph pipeline with persistent memory, NeMo Guardrails, Qdrant and FlashRank retrieval, Portkey model fallback and caching, Gemini embeddings, and six-metric RAGAS evaluation.", tags: ["Python", "FastAPI", "LangGraph", "Qdrant", "NeMo Guardrails", "RAGAS"], accent: "blue", status: "Agentic RAG", github: "https://github.com/Garvity/InfraRAG" },
  { number: "06", title: "GarvisAI", problem: "Users need one reliable platform for routing complex requests across specialized AI capabilities, data sources, sessions, and paid services.", impact: "Developed a five-service FastAPI platform with a LangGraph intent router coordinating eight agents, PDF RAG, multi-provider LLM routing, Firebase auth, Redis sessions, MongoDB, Razorpay billing, S3 delivery, and Docker.", tags: ["Python", "FastAPI", "Microservices", "LangGraph", "Qdrant", "Docker"], accent: "lime", status: "Multi-agent platform", github: "https://github.com/Garvity/GarvisAI" },
  { number: "07", title: "MedAssist AI", problem: "Medical assistance requires guarded reasoning, reliable evidence retrieval, deterministic tools, and dependable medication reminders.", impact: "Built a React and FastAPI medical RAG platform with LangGraph, NeMo Guardrails, hybrid Qdrant and BM25 retrieval, FlashRank, Portkey/Groq inference, Firebase auth, and a PostgreSQL-locked reminder service with retries and observability.", tags: ["React", "FastAPI", "LangGraph", "Hybrid RAG", "PostgreSQL", "Logfire"], accent: "coral", status: "Medical RAG", github: "https://github.com/Garvity/Medex" },
  {
    number: "08",
    title: "Autonomous GitHub Issue Resolver",
    problem: "Maintainers lose time to repetitive issue triage and small fixes.",
    impact: "An autonomous agent that reads issues, plans fixes, edits code, and opens pull requests.",
    tags: ["Python", "LangGraph", "LLM Agents", "GitHub API", "RAG"],
    accent: "coral",
    status: "In development",
    github: "https://github.com/garvity",
  },
  {
    number: "09",
    title: "LLM Evaluation CI/CD Pipeline",
    problem: "LLM regressions can ship silently without automated evaluation gates.",
    impact: "Runs evaluation suites on every change and blocks regressions before deployment.",
    tags: ["Python", "LLM Evals", "CI/CD", "GitHub Actions"],
    accent: "blue",
    status: "In development",
    github: "https://github.com/garvity",
  },
  {
    number: "10",
    title: "Health Intelligence Agent",
    problem: "Medical report analysis needed a secure, multi-model approach for meaningful insights.",
    impact: "Enables secure PDF ingestion and personalized recommendations through cascading LLMs.",
    tags: ["Python", "Streamlit", "Groq", "LLaMA", "Supabase"],
    accent: "lime",
    status: "AI application",
    github: "https://github.com/Garvity/Health-Intelligence",
  },
  { number: "11", title: "Resume Analysis App", problem: "Job seekers need clear feedback when tailoring resumes to job descriptions.", impact: "Provides matching scores and actionable insights to optimize each application.", tags: ["Streamlit", "Python", "LangChain", "FAISS", "PyPDF2"], accent: "blue", status: "NLP application", github: "https://github.com/Garvity/Resume-Analysis-App-RAG-Pipeline-" },
  { number: "12", title: "Plant Pal", problem: "Farmers need quick disease detection without immediate access to experts.", impact: "Predicts plant diseases with confidence scores, prevention tips, and recommendations.", tags: ["Flask", "TensorFlow", "Keras", "CNN", "NLP"], accent: "lime", status: "ML application", github: "https://github.com/garvity/Done-Projects/tree/main/Plant%20AI%20Disease%20Classification" },
  { number: "13", title: "Amazon Price Tracker", problem: "Shoppers need a simple way to monitor product price changes automatically.", impact: "Tracks boAt product prices and sends instant email alerts when prices drop.", tags: ["Python", "BeautifulSoup", "SMTP", "HTMLParser"], accent: "coral", status: "Automation", github: "https://github.com/garvity/Done-Projects/tree/main/Amazon%20Price%20Tracker" },
  { number: "14", title: "Desktop Assistant", problem: "Common desktop actions should be accessible without manual input.", impact: "Enables hands-free desktop automation through natural voice commands.", tags: ["Python", "SpeechRecognition", "pyttsx3", "OS"], accent: "blue", status: "Voice automation", github: "https://github.com/garvity/Done-Projects/tree/main/Desktop%20Assistant" },
  { number: "15", title: "Doctor Appointment System", problem: "Healthcare providers need a reliable digital booking and management flow.", impact: "Streamlines doctor-patient scheduling with secure user authentication.", tags: ["React", "Redux", "Node.js", "Express", "MongoDB"], accent: "lime", status: "Full stack", github: "https://github.com/garvity/Done-Projects/tree/main/Doctor-Appointment-System" },
  { number: "16", title: "Smart File Organizer", problem: "Unstructured file systems quickly become difficult to search and maintain.", impact: "Automates file categorization and records every operation in detailed logs.", tags: ["Python", "OS", "Shutil", "Logging"], accent: "coral", status: "Automation", github: "https://github.com/garvity/Done-Projects/tree/main/File%20Organiser" },
  { number: "17", title: "Stock Price Prediction", problem: "Investors need visual tools to explore patterns in historical stock data.", impact: "Generates LSTM-based forecasts with clear historical data visualization.", tags: ["TensorFlow", "Keras", "Pandas", "LSTM"], accent: "blue", status: "Deep learning", github: "https://github.com/garvity/Done-Projects/tree/main/Stock%20Price%20Prediction/stock%20predict%20price%20prediction" },
  { number: "18", title: "AI Virtual Keyboard", problem: "Touchless interfaces need accurate, intuitive gesture-based input.", impact: "Enables contactless typing by detecting and translating hand gestures in real time.", tags: ["OpenCV", "Python", "Cvzone", "NumPy"], accent: "lime", status: "Computer vision", github: "https://github.com/garvity/Done-Projects/tree/main/AI%20Virtual%20Keyboard" },
];

const experience = [
  {
    year: "Dec 2025 — Present",
    role: "Java Full Stack Intern",
    company: "Infosys Springboard 6.0",
    detail: "Developing Localized Quick Services with a React frontend and Java and Spring Boot backend, applying full-stack fundamentals to a real service platform.",
    stack: ["React", "Java", "Spring Boot"],
  },
  {
    year: "May 2025 — Aug 2025",
    role: "Python Developer Intern",
    company: "Infotact Solutions",
    detail: "Built a logged smart file organizer and an automated Amazon price tracker using BeautifulSoup, HTMLParser, and SMTP email alerts.",
    stack: ["Python", "BeautifulSoup", "Automation", "SMTP"],
  },
  {
    year: "May 2025 — Jun 2025",
    role: "Open Source Hackathon",
    company: "IEEE Summer of Code · 5th place",
    detail: "Contributed to open-source projects in a collaborative hackathon environment and secured fifth place while strengthening practical Git and teamwork skills.",
    stack: ["Open Source", "Git", "Collaboration"],
  },
  {
    year: "Dec 2024 — Jan 2025",
    role: "AI/ML Intern",
    company: "Infosys Springboard 5.0",
    detail: "Built an end-to-end plant disease application using a deep-learning CNN image classifier and a chatbot interface for accessible guidance.",
    stack: ["Python", "CNN", "TensorFlow", "Flask"],
  },
];

type Skill = { name: string; category: "Languages" | "Java Stack" | "Web Development" | "Cloud" | "Technology" | "Libraries"; icon: IconType; color: string };
const skills: Skill[] = [
  { name: "Java", category: "Languages", icon: SiOpenjdk, color: "#e76f00" }, { name: "Python", category: "Languages", icon: SiPython, color: "#3776ab" },
  { name: "C++", category: "Languages", icon: SiCplusplus, color: "#659ad2" }, { name: "JavaScript", category: "Languages", icon: SiJavascript, color: "#f7df1e" }, { name: "TypeScript", category: "Languages", icon: SiTypescript, color: "#3178c6" },
  { name: "React", category: "Web Development", icon: SiReact, color: "#61dafb" }, { name: "Node.js", category: "Web Development", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "Next.js", category: "Web Development", icon: SiNextdotjs, color: "#8b8b8b" }, { name: "Express", category: "Web Development", icon: SiExpress, color: "#8b8b8b" },
  { name: "Flask", category: "Web Development", icon: SiFlask, color: "#8b8b8b" }, { name: "Django", category: "Web Development", icon: SiDjango, color: "#0c4b33" },
  { name: "Tailwind", category: "Web Development", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Spring Boot", category: "Java Stack", icon: SiSpringboot, color: "#6db33f" }, { name: "Hibernate", category: "Java Stack", icon: SiHibernate, color: "#bcae79" },
  { name: "Maven", category: "Java Stack", icon: SiApachemaven, color: "#c71a36" }, { name: "Flyway", category: "Java Stack", icon: SiFlyway, color: "#cc0200" },
  { name: "JUnit 5", category: "Java Stack", icon: SiJunit5, color: "#25a162" }, { name: "JWT", category: "Java Stack", icon: SiJsonwebtokens, color: "#d63aff" },
  { name: "OpenAPI", category: "Java Stack", icon: SiOpenapiinitiative, color: "#6ba539" }, { name: "Swagger", category: "Java Stack", icon: SiSwagger, color: "#85ea2d" },
  { name: "ActiveMQ Artemis", category: "Java Stack", icon: SiApache, color: "#d22128" },
  { name: "AWS", category: "Cloud", icon: TbBrandAws, color: "#ff9900" }, { name: "Microsoft Azure", category: "Cloud", icon: TbBrandAzure, color: "#0089d6" },
  { name: "Git", category: "Technology", icon: SiGit, color: "#f05032" }, { name: "Docker", category: "Technology", icon: SiDocker, color: "#2496ed" },
  { name: "MongoDB", category: "Technology", icon: SiMongodb, color: "#47a248" }, { name: "PostgreSQL", category: "Technology", icon: SiPostgresql, color: "#4169e1" },
  { name: "Cloudinary", category: "Technology", icon: SiCloudinary, color: "#3448c5" }, { name: "GitHub Actions", category: "Technology", icon: SiGithubactions, color: "#2088ff" },
  { name: "TensorFlow", category: "Libraries", icon: SiTensorflow, color: "#ff6f00" }, { name: "PyTorch", category: "Libraries", icon: SiPytorch, color: "#ee4c2c" },
  { name: "LangChain", category: "Libraries", icon: SiLangchain, color: "#65a30d" }, { name: "OpenCV", category: "Libraries", icon: SiOpencv, color: "#5c3ee8" },
];
const skillFilters = ["All", "Languages", "Java Stack", "Web Development", "Cloud", "Technology", "Libraries"] as const;

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [active, setActive] = useState("home");
  const [skillFilter, setSkillFilter] = useState<(typeof skillFilters)[number]>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light") setDark(false);
    const timer = window.setTimeout(() => setLoading(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55%" });
    navItems.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  const themeClass = dark ? "theme-dark" : "theme-light";
  const year = useMemo(() => new Date().getFullYear(), []);
  const filteredSkills = skillFilter === "All" ? skills : skills.filter((skill) => skill.category === skillFilter);
  const toggleTheme = () => {
    setDark((value) => {
      window.localStorage.setItem("theme", value ? "light" : "dark");
      return !value;
    });
  };
  const navigateTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (id !== "contact") {
      setMenuOpen(false);
      return;
    }
    event.preventDefault();
    setMenuOpen(false);
    const heading = document.querySelector<HTMLElement>("#contact .section-heading");
    if (heading) {
      window.history.replaceState(null, "", "#contact");
      window.scrollTo({ top: heading.getBoundingClientRect().top + window.scrollY - 92, behavior: "smooth" });
    }
  };

  return (
    <main className={themeClass}>
      <ImmersiveBackground dark={dark} />
      <SectionEffects />
      {loading && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="loader-inner"><span className="loader-mark"><Terminal size={18} /></span><span>initializing portfolio</span><i /></div></motion.div>}
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Garv home"><span className="brand-mark"><Code2 size={16} /></span><span>garv<span className="brand-dot">.</span>dev</span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => <a key={item} href={`#${item}`} className={active === item ? "active" : ""} onClick={navigateTo(item)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <a className="header-cta" href="#contact" onClick={navigateTo("contact")}>Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="menu-btn icon-btn" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <section id="home" className="hero section-shell">
        <motion.div className="hero-copy" style={{ y: heroY }}>
          <div className="availability"><span className="pulse-dot" /> Available for work <span className="availability-arrow">↗</span></div>
          <p className="hero-kicker">Java developer · Full stack developer · AI engineer</p>
          <h1>I turn complex ideas<br /><em>into useful systems.</em></h1>
          <p className="hero-intro">I&apos;m Garv R Changrani — a final-year Computer Science student building secure Java backends, full-stack products, and practical AI/ML systems.</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">View projects <ArrowDownRight size={16} /></a><a className="button button-ghost" href="mailto:garvity375@gmail.com">Contact me <Mail size={16} /></a><a className="button button-ghost" href="/Resume-GarvRC.pdf" target="_blank" rel="noreferrer" aria-label="Open Garv's resume">Resume <Download size={16} /></a><a className="hero-social" href="https://github.com/garvity" target="_blank" rel="noreferrer" aria-label="Visit Garv's GitHub profile" title="GitHub"><Github size={19} /></a><a className="hero-social" href="https://linkedin.com/in/garvrc" target="_blank" rel="noreferrer" aria-label="Visit Garv's LinkedIn profile" title="LinkedIn"><Linkedin size={19} /></a></div>
          <div className="hero-meta"><span>Currently building with <strong>Java · Spring Boot · React</strong></span><span className="meta-divider" /><a href="mailto:garvity375@gmail.com">garvity375@gmail.com <ArrowUpRight size={13} /></a></div>
        </motion.div>

        <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} aria-label="Interactive orbital network illustration">
          <div className="art-grid" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <HeroScene />
          <div className="core-label"><BrainCircuit size={20} strokeWidth={1.3} /><span>build<br /><b>intelligently</b></span></div>
          <span className="orbit-label label-one">01 / intelligence</span><span className="orbit-label label-two">02 / systems</span><span className="orbit-label label-three">03 / craft</span>
          <div className="floating-chip chip-one"><Sparkles size={13} /> ML systems</div><div className="floating-chip chip-two"><Network size={13} /> APIs that last</div><div className="floating-chip chip-three"><Zap size={13} /> curious by default</div>
        </motion.div>
        <div className="hero-scroll"><span>Scroll to explore</span><span className="scroll-line" /></div>
      </section>

      <section id="about" className="section-shell about-section">
        <Reveal><SectionHeading eyebrow="01 / About me" title="Curious by nature. Practical by choice." copy="I’m a final-year B.Tech CSE student focused on Java full-stack and backend engineering, with additional experience building AI/ML applications that solve tangible problems." /></Reveal>
        <div className="about-grid"><Reveal className="about-card about-story"><span className="card-index">01</span><p>I enjoy turning business workflows into secure, testable systems—from Spring Boot APIs, databases, messaging, and XML integrations to responsive React interfaces and intelligent applications.</p><div className="signature">g<span>.</span></div></Reveal><Reveal delay={0.1} className="about-card about-stats"><div className="stat"><strong>18</strong><span>projects across<br />Java, web, and AI</span></div><div className="stat"><strong>32+</strong><span>technologies<br />in my toolkit</span></div><div className="stat"><strong>05</strong><span>open-source<br />hackathon place</span></div></Reveal><Reveal delay={0.2} className="about-note"><span className="eyebrow">Beyond the code</span><ul><li><Check size={14} /> Open source contributor</li><li><Check size={14} /> Agile team collaboration</li><li><Check size={14} /> Google AI/ML virtual internship</li><li><Check size={14} /> Software virtual internship</li></ul></Reveal></div>
      </section>

      <section id="experience" className="section-shell experience-section">
        <Reveal><SectionHeading eyebrow="02 / Where I&apos;ve learned" title="Small teams. Real constraints. Better instincts." copy="Every experience has been a chance to get closer to how software works in the wild — with users, trade-offs, and teammates in the room." /></Reveal>
        <div className="timeline">{experience.map((item, i) => <Reveal key={item.year} delay={i * 0.08} className="timeline-item"><div className="timeline-year">{item.year}</div><div className="timeline-marker"><span /></div><div className="timeline-content"><div className="timeline-top"><div><h3>{item.role}</h3><p>{item.company}</p></div><ArrowUpRight size={17} /></div><p className="timeline-detail">{item.detail}</p><div className="tag-row">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div></Reveal>)}</div>
      </section>

      <section id="projects" className="section-shell projects-section"><Reveal><SectionHeading eyebrow="03 / Selected work" title="Projects built around real problems." copy="Java platforms, full-stack applications, AI experiments, and developer tools—designed around secure APIs, reliable data, testing, and useful outcomes." /></Reveal><div className="projects-list">{projects.map((project, i) => <Reveal key={project.number} delay={(i % 3) * 0.08} className={`project-card ${project.accent}`}><div className="project-card-top"><span className="visual-no">{project.number}</span><span className="project-status"><i />{project.status}</span><div className="project-symbol">{i < 4 || i % 2 !== 0 ? <Code2 size={32} /> : <BrainCircuit size={32} />}</div></div><div className="project-copy"><span className="project-type">Problem</span><h3>{project.title}</h3><p>{project.problem}</p><span className="project-type impact-label">Impact</span><p>{project.impact}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a className="project-link" href={project.github} target="_blank" rel="noreferrer"><Github size={14} /><span>GitHub</span><ArrowUpRight size={15} /></a>{project.demo && <a className="project-link demo-link" href={project.demo} target="_blank" rel="noreferrer"><span>Live demo</span><ArrowUpRight size={15} /></a>}</div></div></Reveal>)}</div></section>

      <section id="skills" className="section-shell skills-section"><Reveal><SectionHeading eyebrow="04 / Technical toolkit" title="Technologies I build with." copy="A Java-centered toolkit spanning Spring backend engineering, databases, messaging, security, testing, CI/CD, modern web development, and AI/ML." /></Reveal><Reveal delay={0.1} className="skills-panel"><div className="skill-filters" role="tablist" aria-label="Filter skills">{skillFilters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={skillFilter === filter} className={skillFilter === filter ? "active" : ""} onClick={() => setSkillFilter(filter)}>{filter}</button>)}</div><motion.div layout className="skills-grid"><AnimatePresence mode="popLayout">{filteredSkills.map((skill) => { const Icon = skill.icon; return <motion.div layout key={skill.name} className="tech-card" initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.86 }} whileHover={{ y: -7 }} transition={{ duration: 0.3 }}><span className="tech-icon" style={{ color: skill.color }}><Icon /></span><strong>{skill.name}</strong><small>{skill.category}</small></motion.div>; })}</AnimatePresence></motion.div></Reveal></section>

      <section id="education" className="section-shell education-section"><Reveal><SectionHeading eyebrow="05 / Education" title="Fundamentals that keep compounding." copy="My academic path has built the base for the systems, software, and machine-learning work I explore today." /></Reveal><div className="timeline education-timeline"><Reveal className="timeline-item"><div className="timeline-year">2022 — 2026</div><div className="timeline-marker"><span /></div><div className="timeline-content"><div className="timeline-top"><div><h3>B.Tech in Computer Science & Engineering</h3><p>Dhanekula Institute of Engineering & Technology · JNTU Kakinada</p></div><GraduationCap size={22} /></div><p className="timeline-detail">Bachelor of Technology with a Computer Science focus, building the foundation for Java backend engineering, full-stack development, and AI/ML systems.</p><div className="tag-row"><span>CGPA 8.38 / 10</span><span>Computer Science</span></div></div></Reveal><Reveal delay={0.1} className="timeline-item"><div className="timeline-year">2020 — 2022</div><div className="timeline-marker"><span /></div><div className="timeline-content"><div className="timeline-top"><div><h3>Intermediate</h3><p>Sri Chaitanya Junior College</p></div><GraduationCap size={22} /></div><p className="timeline-detail">Main stream in Mathematics, Physics, and Chemistry.</p><div className="tag-row"><span>Mathematics</span><span>Physics</span><span>Chemistry</span></div></div></Reveal></div></section>

      <section id="contact" className="section-shell contact-section"><div className="contact-glow" /><Reveal><SectionHeading eyebrow="06 / Start a conversation" title={<>Let&apos;s build something<br /><em>useful together.</em></>} copy="I’m always open to discussing new projects, creative ideas in tech, and opportunities to be part of your vision." /></Reveal><Reveal delay={0.1} className="contact-grid"><div className="contact-links"><a href="mailto:garvity375@gmail.com"><span className="contact-icon"><Mail size={17} /></span><span><small>Email</small>garvity375@gmail.com</span><ArrowUpRight size={16} /></a><a href="https://github.com/garvity" target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={17} /></span><span><small>GitHub</small>github.com/garvity</span><ArrowUpRight size={16} /></a><a href="https://linkedin.com/in/garvrc" target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={17} /></span><span><small>LinkedIn</small>linkedin.com/in/garvrc</span><ArrowUpRight size={16} /></a><div className="contact-location"><MapPin size={16} /> India · open to opportunities</div></div><form className="contact-form" onSubmit={(e) => e.preventDefault()}><div className="form-row"><label>Your name<input type="text" placeholder="Jane Smith" /></label><label>Email address<input type="email" placeholder="jane@company.com" /></label></div><label>What can I help with?<textarea placeholder="A role, a project, or just a hello..." rows={4} /></label><button className="button button-primary" type="submit">Send message <Send size={15} /></button></form></Reveal></section>

      <footer className="site-footer"><div className="footer-top"><a className="brand" href="#home"><span className="brand-mark"><Code2 size={16} /></span><span>garv<span className="brand-dot">.</span>dev</span></a><p>Built with curiosity, intention, and clean code.</p><a className="back-top" href="#home">Back to top <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {year} Garv R Changrani</span><span className="footer-status"><i /> Available for new opportunities</span><span>Java · Spring Boot · Full Stack · AI/ML</span></div></footer>
    </main>
  );
}
