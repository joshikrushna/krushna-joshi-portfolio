import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Award,
  Briefcase,
  ChevronDown,
  Code2,
  ExternalLink,
  Eye,
  FolderGit2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import { useActor } from "./hooks/useActor";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Positions", href: "#positions" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const experiences = [
  {
    company: "iStudio",
    role: "Software Engineer Intern",
    period: "May 2025 – Aug 2025",
    location: "Pune",
    bullets: [
      "Completed a Software Testing Internship at iStudio, gaining hands-on experience in manual testing, test case creation, and defect reporting.",
      "Worked closely with development teams to identify and document 20+ critical bugs using Jira, ensuring software quality standards.",
    ],
    color: "from-emerald-500/20 to-teal-500/10",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
];

const positions = [
  {
    role: "Software Engineer Intern",
    org: "Walmart Advanced Software Engineering Virtual Experience Program",
    period: "Jan 2025",
  },
  {
    role: "Junior Data Analyst",
    org: "Mastercard – Security Awareness Virtual Experience Program",
    period: "Dec 2024",
  },
];

const achievements = [
  {
    text: "Google Cloud Arcade Participant 2025: Completed hands-on GCP labs to build practical skills in cloud services.",
    link: "https://www.cloudskillsboost.google/public_profiles/79aebfe4-6ebe-4f28-92e4-cc95fd6ce8c1",
    linkLabel: "Google Cloud Arcade Facilitator",
    icon: "star",
  },
  {
    text: "Improved software quality and deployment by 50%, integrating automated test suites into CI/CD pipelines.",
    icon: "zap",
  },
  {
    text: "Built a sign language-to-speech communication interface with 95% accuracy.",
    icon: "trophy",
  },
];

const projects = [
  {
    title:
      "Automated Cold Email Generation System Utilizing Llama 3.1 Framework",
    year: "2025",
    tech: ["LangChain", "Streamlit", "GR-OQ", "Llama 3.1"],
    bullets: [
      "Led development of a Cold Email Generator using GR-OQ, LangChain and Streamlit. Allows users to input a company's careers page URL.",
      "Generated 100 personalized emails in under 5 minutes, leading to a 35% response rate.",
    ],
    impact: "35% response rate",
  },
  {
    title: "AI-Assisted Python Development for Software Engineering",
    year: "2024",
    tech: ["Python", "AI Debugging", "Banking Systems"],
    bullets: [
      "Engineered a withdrawal feature significantly enhancing user interface for seamless banking transactions.",
      "Utilized AI-assisted debugging to streamline development, reducing error rates by 40%.",
    ],
    impact: "40% fewer errors",
  },
  {
    title: "Communication Translation Interface for ISL Interpretation",
    year: "2023",
    tech: ["Computer Vision", "Speech Synthesis", "Python", "ML"],
    bullets: [
      "Developed a prototype communication interface for conversion of sign language to speech.",
      "Achieved an accuracy rate of 95% for sign language to speech translation.",
    ],
    impact: "95% accuracy",
  },
];

const virtualInternships = [
  {
    title: "Junior Data Analyst",
    org: "Mastercard Cybersecurity Virtual Experience Program",
    period: "Dec 2024",
    bullets: [
      "Executed a job simulation as an analyst on Mastercard's Security Awareness Team.",
      "Implemented training that reduced phishing incidents by 30%.",
      "Analyzed, identified and reported security threats, including phishing attacks.",
    ],
    color: "from-orange-500/20 to-red-500/10",
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  {
    title: "Software Engineer Intern",
    org: "Walmart USA Advanced Software Engineering Virtual Experience Program",
    period: "Jan 2025",
    bullets: [
      "Performed the Advanced Software Engineering Job Simulation solving difficult technical projects for Walmart.",
      "Architected a novel version of a heap data structure in Java for Walmart's shipping department.",
      "Designed a UML class diagram for a data processor, considering different operating modes and database connections.",
    ],
    color: "from-blue-500/20 to-cyan-500/10",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    title: "Data Analyst Intern",
    org: "Accenture North America Data Analytics and Visualization Job Simulation",
    period: "Nov 2024",
    bullets: [
      "Accomplished a simulation project advising a hypothetical social media client as a Data Analyst at Accenture.",
      "Simulated data cleaning, modeling, and analysis on seven datasets to extract actionable insights into content trends, enabling data-driven strategic decision-making.",
    ],
    color: "from-violet-500/20 to-purple-500/10",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
];

const technicalSkills = [
  { label: "Python", category: "lang" },
  { label: "Java", category: "lang" },
  { label: "C++", category: "lang" },
  { label: "JavaScript", category: "lang" },
  { label: "Machine Learning", category: "ai" },
  { label: "Artificial Intelligence", category: "ai" },
  { label: "Google Cloud", category: "cloud" },
  { label: "AWS", category: "cloud" },
  { label: "Vertex AI Studio", category: "cloud" },
  { label: "SQL", category: "db" },
  { label: "MongoDB", category: "db" },
  { label: "PostgreSQL", category: "db" },
  { label: "Google BigQuery", category: "db" },
  { label: "Data Structures & Algorithms", category: "cs" },
  { label: "Large-Scale System Design", category: "cs" },
  { label: "LangChain", category: "ai" },
  { label: "Streamlit", category: "tools" },
  { label: "Manual Testing", category: "tools" },
  { label: "Jira", category: "tools" },
];

const softSkills = [
  "Problem Solving & Critical Thinking",
  "Data-Driven Decision Making",
  "Software Development Life Cycle (SDLC)",
  "Agile Methodology",
  "Cross-functional Collaboration",
  "Software Testing",
];

const certifications = [
  {
    name: "Google Cloud Cybersecurity",
    issuer: "Google",
    url: "https://coursera.org/verify/professional-cert/I2ULAIKCLIZ4",
  },
  {
    name: "Software Engineering Specialization",
    issuer: "HKU",
    url: "https://coursera.org/verify/specialization/DKZMJX11ISY1",
  },
  {
    name: "Software Development, Linux and Git",
    issuer: "Linux Foundation",
    url: "https://coursera.org/verify/specialization/93XVUGVTAISN",
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    url: "https://coursera.org/verify/professional-cert/8K2F5GOCXXG0",
  },
  {
    name: "Full Stack Data Science and AI",
    issuer: "Industry",
    url: "https://drive.google.com/file/d/1nSKNrM8q9vtOU21QYYfpvACiy9ocfbEJ/view?usp=sharing",
  },
  {
    name: "Working with BigQuery",
    issuer: "Google",
    url: "https://coursera.org/verify/FPEO1I4Z5CVR",
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    url: "https://coursera.org/verify/QRX3EKEL1N5P",
  },
  {
    name: "Vertex AI Studio",
    issuer: "Google",
    url: "https://coursera.org/verify/XPQBCEXDXEG5",
  },
  {
    name: "IBM AI Product Manager Professional Certificate",
    issuer: "IBM",
    url: "",
  },
  { name: "Google Project Management", issuer: "Google", url: "" },
];

const skillCategoryColors: Record<string, string> = {
  lang: "border-chart-1 text-chart-1 bg-chart-1/10",
  ai: "border-accent text-accent bg-accent/10",
  cloud: "border-primary text-primary bg-primary/10",
  db: "border-chart-3 text-chart-3 bg-chart-3/10",
  cs: "border-chart-4 text-chart-4 bg-chart-4/10",
  tools: "border-chart-2 text-chart-2 bg-chart-2/10",
};

/* ─── 3D Scene Components ─────────────────────────────────────────────── */

function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3, 0.5, -2]}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.25}
          emissive="#7c3aed"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

function RotatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.z += delta * 0.14;
    }
  });
  return (
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[3, -0.5, -3]}>
        <torusKnotGeometry args={[1, 0.3, 80, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.2}
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

const PARTICLE_DATA = Array.from({ length: 28 }, (_, idx) => ({
  id: `particle-${idx}`,
  x: (Math.random() - 0.5) * 14,
  y: (Math.random() - 0.5) * 8,
  z: (Math.random() - 0.5) * 6 - 2,
  speed: 0.3 + Math.random() * 0.5,
  offset: Math.random() * Math.PI * 2,
  colorIndex: idx % 3,
  size: 0.04 + Math.random() * 0.06,
}));

function FloatingParticles() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const p = PARTICLE_DATA[i];
        mesh.position.y = p.y + Math.sin(t * p.speed + p.offset) * 0.3;
      }
    });
  });

  return (
    <>
      {PARTICLE_DATA.map((pos, i) => (
        <mesh
          key={pos.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={[pos.x, pos.y, pos.z]}
        >
          <sphereGeometry args={[pos.size, 8, 8]} />
          <meshStandardMaterial
            color={
              pos.colorIndex === 0
                ? "#7c3aed"
                : pos.colorIndex === 1
                  ? "#06b6d4"
                  : "#a855f7"
            }
            emissive={
              pos.colorIndex === 0
                ? "#7c3aed"
                : pos.colorIndex === 1
                  ? "#06b6d4"
                  : "#a855f7"
            }
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.0}>
      <mesh ref={meshRef} position={[0, 2, -4]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.18}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 3]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 4, -2]} intensity={0.6} color="#a855f7" />
      <RotatingIcosahedron />
      <RotatingTorusKnot />
      <FloatingOctahedron />
      <FloatingParticles />
    </>
  );
}

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/* ─── Section Heading ─────────────────────────────────────────────────────── */
function SectionHeading({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-4">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest">
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-3 mx-auto h-px w-16 bg-gradient-to-r from-primary to-accent" />
    </motion.div>
  );
}

/* ─── Floating Particle Dots ────────────────────────────────────────────── */
const MAX_SECTION_DOTS = 10;
const SECTION_DOT_DATA = Array.from({ length: MAX_SECTION_DOTS }, (_, i) => ({
  id: `sd-${10 + ((i * 11) % 80)}-${5 + ((i * 17) % 90)}`,
  width: 3 + (i % 3) * 2,
  left: `${10 + ((i * 11) % 80)}%`,
  top: `${5 + ((i * 17) % 90)}%`,
  duration: 3 + (i % 4),
  delay: i * 0.4,
}));

function SectionParticles({ count = 8 }: { count?: number }) {
  const dots = SECTION_DOT_DATA.slice(0, count);
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: dot.width,
            height: dot.width,
            left: dot.left,
            top: dot.top,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────────────────────────── */
export default function App() {
  const [visitorCount, setVisitorCount] = useState<bigint | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { actor, isFetching } = useActor();

  /* visitor count */
  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .incrementVisitorCount()
      .then((count) => setVisitorCount(count))
      .catch(() => setVisitorCount(null));
  }, [actor, isFetching]);

  /* sticky navbar shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body relative">
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-card"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => scrollTo("#hero")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-lg font-bold text-gradient bg-transparent border-0 cursor-pointer"
          >
            KJ<span className="text-primary">.</span>
          </motion.button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              data-ocid="navbar.linkedin_link"
              href="http://www.linkedin.com/in/krushna-joshi-a36b97244"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="ml-2 p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </motion.a>
            <motion.a
              data-ocid="navbar.github_link"
              href="https://github.com/joshikrushna"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.55 } }}
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="flex flex-col px-4 py-3 gap-1">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                    onClick={() => scrollTo(link.href)}
                    className="text-left px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex gap-2 pt-2 border-t border-border mt-1">
                  <a
                    data-ocid="navbar.linkedin_link"
                    href="http://www.linkedin.com/in/krushna-joshi-a36b97244"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    data-ocid="navbar.github_link"
                    href="https://github.com/joshikrushna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-md hover:bg-primary/10 transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      >
        {/* 3D Canvas Background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: 0.85 }}
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 7], fov: 60 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        </div>

        {/* Gradient orb 1 */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {/* Gradient orb 2 */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Gradient orb 3 */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-violet-500/4 blur-[90px] pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        {/* Gradient orb 4 */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/4 blur-[80px] pointer-events-none"
          animate={{ x: [0, -25, 0], y: [0, 15, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-px w-8 bg-primary" />
                <span className="font-mono text-xs text-primary uppercase tracking-widest">
                  Available for hire
                </span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3"
              >
                Hi, I'm <span className="text-gradient">Krushna</span>{" "}
                <span className="text-gradient">Joshi</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mb-5">
                <span className="font-mono text-sm text-primary/80 tracking-widest uppercase">
                  &lt; Certified Software Engineer /&gt;
                </span>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-base leading-relaxed max-w-lg mb-8"
              >
                Aspiring Software Engineer with expertise in software
                development, data analytics, and AI. Proficient in Python, Java,
                and C++. Passionate about building accessible technologies and
                solving real-world challenges.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 mb-8"
              >
                <Button
                  data-ocid="hero.view_work_button"
                  onClick={() => scrollTo("#experience")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 shadow-glow transition-all duration-300 hover:shadow-glow-sm"
                >
                  View My Work
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollTo("#contact")}
                  className="border-border hover:border-primary/60 hover:text-primary transition-all duration-300"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Contact Me
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  India
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  krishnajoshi1258@gmail.com
                </span>
              </motion.div>
            </motion.div>

            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 animate-pulse-glow" />
                <div className="absolute inset-0 rounded-full border border-accent/10 scale-125" />

                {/* Hex decoration */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border border-primary/40 rotate-45" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 border border-accent/40 rotate-12" />

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary/30 shadow-glow bg-card"
                >
                  <img
                    src="/assets/generated/profile-avatar-transparent.dim_400x400.png"
                    alt="Krushna Joshi"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-6 top-8 bg-card border border-primary/30 rounded-xl px-3 py-2 shadow-card"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      10+ Certs
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-6 bottom-8 bg-card border border-accent/30 rounded-xl px-3 py-2 shadow-card"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold text-foreground">
                      4+ Internships
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.5 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-1 text-muted-foreground/50"
          >
            <span className="text-xs font-mono">scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── About ────────────────────────────────────────────────────── */}
        <section id="about" className="py-24">
          <SectionHeading icon={User} label="01 — About" title="Who I Am" />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-card border-border shadow-card overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
                <p className="text-muted-foreground leading-relaxed text-base pl-6">
                  Aspiring Software Engineer with expertise in software
                  development, data analytics, and AI, proficient in Python,
                  Java, and C++. Specialized in large-scale system design and
                  implementing scalable solutions. Certified in Data Analytics
                  by Google and Software Engineering by Hong Kong University.
                  Passionate about building accessible technologies and solving
                  real-world challenges.
                </p>
                <div className="mt-6 pl-6 flex flex-wrap gap-3">
                  {["Python", "Java", "C++", "AI/ML", "Cloud", "DSA"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-primary/30 text-primary bg-primary/10 font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Experience ───────────────────────────────────────────────── */}
        <section id="experience" className="py-24 relative">
          <SectionParticles count={6} />
          <SectionHeading
            icon={Briefcase}
            label="02 — Experience"
            title="Professional Journey"
          />

          <div className="relative max-w-2xl mx-auto">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #7c3aed 20%, #06b6d4 80%, transparent)",
              }}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  data-ocid={`experience.item.${i + 1}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-5 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                  <Card
                    className={`bg-gradient-to-br ${exp.color} border-border shadow-card hover:border-primary/30 transition-all duration-300 group`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {exp.role}
                          </p>
                          {exp.location && (
                            <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs font-mono shrink-0 ${exp.badge}`}
                        >
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="space-y-2">
                        {exp.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Positions of Responsibility ──────────────────────────────── */}
        <section id="positions" className="py-24 relative">
          <SectionParticles count={5} />
          <SectionHeading
            icon={Briefcase}
            label="03 — Positions"
            title="Positions of Responsibility"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5"
          >
            {positions.map((pos, i) => (
              <motion.div
                key={pos.role}
                data-ocid={`position.item.${i + 1}`}
                variants={fadeUp}
              >
                <Card className="bg-card border-border shadow-card hover:border-primary/40 transition-all duration-300 group h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {pos.role}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {pos.org}
                    </p>
                    <div className="mt-4">
                      <Badge
                        variant="outline"
                        className="text-xs font-mono border-primary/30 text-primary bg-primary/10"
                      >
                        {pos.period}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Achievements ─────────────────────────────────────────────── */}
        <section id="achievements" className="py-24 relative">
          <SectionParticles count={7} />
          <SectionHeading
            icon={Trophy}
            label="04 — Achievements"
            title="Key Achievements"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5"
          >
            {achievements.map((ach, i) => (
              <motion.div
                key={ach.icon}
                data-ocid={`achievement.item.${i + 1}`}
                variants={fadeUp}
              >
                <Card className="bg-card border-border shadow-card hover:border-primary/40 hover:shadow-glow-sm transition-all duration-300 group h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {ach.icon === "star" && (
                        <Star className="w-5 h-5 text-primary" />
                      )}
                      {ach.icon === "zap" && (
                        <Zap className="w-5 h-5 text-accent" />
                      )}
                      {ach.icon === "trophy" && (
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {ach.text}
                    </p>
                    {ach.link && ach.linkLabel && (
                      <a
                        data-ocid={`achievement.link.${i + 1}`}
                        href={ach.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                      >
                        <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        {ach.linkLabel}
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Projects ─────────────────────────────────────────────────── */}
        <section id="projects" className="py-24 relative">
          <SectionParticles count={8} />
          <SectionHeading
            icon={FolderGit2}
            label="05 — Projects"
            title="Featured Work"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                data-ocid={`project.item.${i + 1}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card border-border shadow-card hover:border-primary/40 transition-all duration-300 group h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-primary/30 text-primary bg-primary/10"
                      >
                        {project.year}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-accent/30 text-accent bg-accent/10"
                      >
                        {project.impact}
                      </Badge>
                    </div>

                    <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                      {project.title}
                    </h3>

                    <ul className="space-y-2 mb-4 flex-1">
                      {project.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border/50">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Virtual Internship Experience subsection */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-border/50" />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                <Briefcase className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-mono font-semibold text-accent uppercase tracking-widest">
                  Virtual Internship Experience
                </span>
              </div>
              <div className="h-px flex-1 bg-border/50" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {virtualInternships.map((intern, i) => (
              <motion.div
                key={intern.title + intern.org}
                data-ocid={`virtual_internship.item.${i + 1}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`bg-gradient-to-br ${intern.color} border-border shadow-card hover:border-primary/40 transition-all duration-300 group h-full flex flex-col`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {intern.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-snug">
                          {intern.org}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs font-mono shrink-0 ${intern.badge}`}
                      >
                        {intern.period}
                      </Badge>
                    </div>

                    <ul className="space-y-2 flex-1">
                      {intern.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Skills ───────────────────────────────────────────────────── */}
        <section id="skills" className="py-24">
          <SectionHeading
            icon={Code2}
            label="06 — Skills"
            title="Technical Arsenal"
          />

          <div className="grid md:grid-cols-2 gap-10">
            {/* Technical Skills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Technical Skills
              </h3>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {technicalSkills.map((skill) => (
                  <motion.span
                    key={skill.label}
                    variants={fadeIn}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 hover:scale-105 cursor-default ${skillCategoryColors[skill.category]}`}
                  >
                    {skill.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Soft Skills
              </h3>
              <div className="space-y-3">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <span className="font-mono text-xs font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Education ────────────────────────────────────────────────── */}
        <section id="education" className="py-24">
          <SectionHeading
            icon={GraduationCap}
            label="07 — Education"
            title="Academic Background"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card border-border shadow-card hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      Bachelor's in Electronics & Telecommunication
                    </h3>
                    <p className="text-primary font-semibold text-sm mb-2">
                      PVG's College of Engineering and Technology, Pune
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-muted text-muted-foreground"
                      >
                        Aug 2019 – Jul 2023
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-primary/30 text-primary bg-primary/10"
                      >
                        B.E.
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
                      >
                        CGPA: 8.5 — Grade A+
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Certifications ───────────────────────────────────────────── */}
        <section id="certifications" className="py-24 relative">
          <SectionParticles count={6} />
          <SectionHeading
            icon={Award}
            label="08 — Certifications"
            title="Credentials & Badges"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {certifications.map((cert, i) => {
              const cardContent = (
                <Card
                  className={`bg-card border-border shadow-card transition-all duration-300 h-full ${
                    cert.url
                      ? "hover:border-primary/40 hover:shadow-glow-sm cursor-pointer hover:-translate-y-1"
                      : "opacity-80"
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug mb-2">
                      {cert.name}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono border-muted text-muted-foreground"
                      >
                        {cert.issuer}
                      </Badge>
                      {cert.url && (
                        <ExternalLink className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              return (
                <motion.div
                  key={cert.name}
                  data-ocid={`certification.item.${i + 1}`}
                  variants={fadeIn}
                  className="group"
                >
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div className="block h-full">{cardContent}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <Separator className="bg-border/50" />

        {/* ── Contact ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-24">
          <SectionHeading
            icon={Mail}
            label="09 — Contact"
            title="Get In Touch"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card border-border shadow-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />
              <CardContent className="p-8">
                <p className="text-center text-muted-foreground mb-8 text-sm leading-relaxed">
                  I'm open to new opportunities and always happy to discuss
                  projects, collaborations, or just chat about tech. Let's
                  connect!
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    data-ocid="contact.email_link"
                    href="mailto:krishnajoshi1258@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-mono">
                        Email
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        krishnajoshi1258@gmail.com
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    data-ocid="contact.phone_link"
                    href="tel:+917083111883"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        +91 7083111883
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    data-ocid="contact.linkedin_link"
                    href="http://www.linkedin.com/in/krushna-joshi-a36b97244"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">
                        LinkedIn
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        linkedin.com/in/krushna-joshi
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                  </a>

                  <a
                    data-ocid="contact.github_link"
                    href="https://github.com/joshikrushna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">
                        GitHub
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        github.com/joshikrushna
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 ml-auto shrink-0 group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card/50 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
              <span className="font-display font-bold text-gradient">
                Krushna Joshi
              </span>
              <Separator
                orientation="vertical"
                className="h-4 hidden sm:block"
              />
              <span>
                © {new Date().getFullYear()}. Built with ♥ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </span>
            </div>

            <div
              data-ocid="footer.visitor_count"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-xs">
                {visitorCount !== null
                  ? `${visitorCount.toLocaleString()} visitors`
                  : "…"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
