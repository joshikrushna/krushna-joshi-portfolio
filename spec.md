# Krushna Joshi Portfolio

## Current State
Portfolio site with: hero, about, experience (Mastercard, Walmart, Accenture), projects (3 cards), skills, education, certifications (no links), contact. No Positions of Responsibility, no Achievements section, no virtual internship featured work section, limited 3D animation.

## Requested Changes (Diff)

### Add
- **iStudio internship** in Professional Journey (Experience section): Software Engineer Intern, May 2025–Aug 2025, Pune. Bullets: completed software testing internship at iStudio (manual testing, test case creation, defect reporting); worked with dev teams to identify/document 20+ critical bugs using Jira.
- **Positions of Responsibility** section (new, after Experience): Software Engineer Intern – Walmart Advanced Software Engineering Virtual Experience Program (Jan 2025); Junior Data Analyst – Mastercard Security Awareness Virtual Experience Program (Dec 2024).
- **Achievements** section (new): Google Cloud Arcade Participant 2025 (with link https://www.cloudskillsboost.google/public_profiles/79aebfe4-6ebe-4f28-92e4-cc95fd6ce8c1 labeled "Google Cloud Arcade Facilitator"); Improved software quality and deployment by 50%, integrating automated test suites into CI/CD pipelines; Built a sign language-to-speech communication interface with 95% accuracy.
- **Certification links** (update existing cards to be clickable):
  - Google Cloud Cybersecurity: https://coursera.org/verify/professional-cert/I2ULAIKCLIZ4
  - Software Engineering Specialization: https://coursera.org/verify/specialization/DKZMJX11ISY1
  - Software Development, Linux and Git: https://coursera.org/verify/specialization/93XVUGVTAISN
  - Google Data Analytics: https://coursera.org/verify/professional-cert/8K2F5GOCXXG0
  - Full Stack Data Science and AI: https://drive.google.com/file/d/1nSKNrM8q9vtOU21QYYfpvACiy9ocfbEJ/view?usp=sharing
  - Working with BigQuery: https://coursera.org/verify/FPEO1I4Z5CVR
  - Google AI Essentials: https://coursera.org/verify/QRX3EKEL1N5P
  - Vertex AI Studio: https://coursera.org/verify/XPQBCEXDXEG5
- **4th box under Featured Work** named "Virtual Internship Experience" containing:
  - Junior Data Analyst, Mastercard Cybersecurity Virtual Experience (Dec 2024): executed job simulation on Security Awareness Team; reduced phishing incidents by 30%; analyzed/identified/reported security threats.
  - Software Engineer Intern, Walmart USA Advanced Software Engineering Virtual Experience (Jan 2025): solved difficult technical projects; architected heap data structure in Java; designed UML class diagram for data processor.
  - Data Analyst Intern, Accenture North America Data Analytics and Visualization Job Simulation (Nov 2024): advised hypothetical social media client; simulated data cleaning/modeling/analysis on 7 datasets.
- **More 3D animations**: add floating 3D geometric shapes (rotating torus, icosahedron, particles) in hero background using Three.js/React Three Fiber; add parallax depth on scroll; add more animated particle/orb effects throughout sections.

### Modify
- **Professional Journey (Experience section)**: REMOVE Mastercard, Walmart, Accenture entries. REPLACE with only iStudio entry.
- **Certifications section**: make all certification cards clickable links (open in new tab) using the URLs above.
- **Navigation**: add "Positions" and "Achievements" links to navbar.

### Remove
- Mastercard, Walmart, Accenture from the Professional Journey / Experience section (they move to Virtual Internship Experience under Featured Work).

## Implementation Plan
1. Update `experiences` data array: remove old 3 entries, add iStudio entry.
2. Add `positions` data array for Positions of Responsibility section.
3. Add `achievements` data array for Achievements section.
4. Update `certifications` data array to include URLs and make cards clickable.
5. Add Virtual Internship Experience as a 4th grid card group under projects/featured work section, containing the 3 virtual internship entries.
6. Add Positions of Responsibility section between Experience and Projects.
7. Add Achievements section (with Google Cloud Arcade link).
8. Update navbar links to include new sections.
9. Install @react-three/fiber and @react-three/drei, add 3D floating geometric scene in hero background with rotating shapes and particles.
10. Add scroll-based parallax to 3D scene and more animated orbs/particles in section backgrounds.
