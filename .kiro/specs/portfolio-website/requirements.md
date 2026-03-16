# Requirements Document

## Introduction

A single-page portfolio website for Mohammed Kaif Ahmed, a Business Analyst with 4+ years of experience across FMCG, retail, and e-commerce. The site presents professional experience, projects, education, and contact information using an Apple-inspired design language: clean typography, generous whitespace, subtle animations, and zero visual clutter. The deliverable is a single self-contained HTML file with inline CSS and JavaScript.

## Glossary

- **Portfolio_Site**: The single HTML file that constitutes the complete portfolio website
- **Nav**: The fixed top navigation bar
- **Hero**: The first full-width section containing the primary headline and contact links
- **About**: The section describing professional philosophy and competency tags
- **Experience**: The section listing professional roles in reverse chronological order
- **Projects**: The section displaying the grid of 13+ project cards
- **Education**: The section listing academic qualifications and certifications
- **Contact**: The footer section with contact details and availability
- **Project_Card**: An individual card within the Projects grid
- **Competency_Tag**: A pill-shaped label used in the About and Education sections
- **Intersection_Observer**: The browser API used to trigger scroll-based fade-in animations
- **Viewport**: The visible area of the browser window at any given time

---

## Requirements

### Requirement 1: Single-File Delivery

**User Story:** As a developer deploying the portfolio, I want the entire site contained in one HTML file, so that I can host it anywhere without a build step or dependency management.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL be delivered as a single `.html` file with all CSS and JavaScript inline.
2. THE Portfolio_Site SHALL load all fonts via a single Google Fonts `<link>` tag and load no other external dependencies.
3. THE Portfolio_Site SHALL use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
4. THE Portfolio_Site SHALL include HTML comments clearly separating each major section of the code.

---

### Requirement 2: Typography and Color System

**User Story:** As a visitor, I want the site to use a consistent, premium typographic and color system, so that the visual presentation feels polished and professional.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL apply the font stack `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif` to all headings.
2. THE Portfolio_Site SHALL apply the same font family at lighter weights to all body text.
3. THE Portfolio_Site SHALL apply `"SF Mono", "JetBrains Mono", "Fira Code", monospace` to any monospace text elements.
4. THE Portfolio_Site SHALL use `#FBFBFD` as the page background color.
5. THE Portfolio_Site SHALL use `#1D1D1F` as the primary text color.
6. THE Portfolio_Site SHALL use `#6E6E73` as the secondary text color.
7. THE Portfolio_Site SHALL use `#0071E3` as the accent color, applied only to links, hover states, and section dividers.
8. THE Portfolio_Site SHALL use `#FFFFFF` with `box-shadow: 0 2px 12px rgba(0,0,0,0.06)` for card and elevated surface backgrounds.
9. THE Portfolio_Site SHALL use `1px solid #E5E5E7` for section divider lines.
10. THE Portfolio_Site SHALL contain no gradient fills except where a gradient is imperceptibly subtle (opacity below 0.05).
11. THE Portfolio_Site SHALL contain no emoji characters anywhere in the rendered output.

---

### Requirement 3: Layout and Spacing

**User Story:** As a visitor on any device, I want the content to be well-spaced and readable, so that I can consume information without visual fatigue.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL constrain all content to a maximum width of 980px, horizontally centered.
2. THE Portfolio_Site SHALL apply 120px top and bottom padding to each section on viewports 1024px wide and above.
3. THE Portfolio_Site SHALL apply 80px top and bottom padding to each section on viewports below 1024px.
4. THE Portfolio_Site SHALL be fully responsive across mobile (320px+), tablet (768px+), and desktop (1024px+) viewport widths.
5. THE Portfolio_Site SHALL use a mobile-first CSS approach, with desktop styles applied via `min-width` media queries.

---

### Requirement 4: Navigation

**User Story:** As a visitor, I want a persistent navigation bar that lets me jump to any section, so that I can navigate the page without scrolling manually.

#### Acceptance Criteria

1. THE Nav SHALL remain fixed at the top of the viewport during scrolling.
2. THE Nav SHALL display a translucent white background with `backdrop-filter: blur(20px)` and `background: rgba(255,255,255,0.85)`.
3. THE Nav SHALL display the text "Mohammed Kaif Ahmed" left-aligned.
4. THE Nav SHALL display the links About, Experience, Projects, Education, and Contact right-aligned on viewports 768px wide and above.
5. WHEN a Nav link is clicked, THE Portfolio_Site SHALL smooth-scroll to the corresponding section.
6. WHEN the viewport width is below 768px, THE Nav SHALL replace the right-aligned links with a hamburger menu icon.
7. WHEN the hamburger icon is tapped, THE Nav SHALL display the navigation links in a vertical dropdown menu.
8. WHEN a link in the mobile dropdown is tapped, THE Nav SHALL close the dropdown and smooth-scroll to the corresponding section.

---

### Requirement 5: Hero Section

**User Story:** As a visitor landing on the page, I want to immediately understand who Mohammed Kaif Ahmed is and how to contact him, so that I can decide whether to read further.

#### Acceptance Criteria

1. THE Hero SHALL display the headline "Supply Chain Intelligence. Procurement Analytics. Data Engineering." as the largest typographic element on the page.
2. THE Hero SHALL display the subheadline "Business Analyst with 4+ years across FMCG, retail, and e-commerce. I build tools that solve real operational problems — from demand forecasting models to procurement intelligence platforms." in the secondary text color at a smaller font size than the headline.
3. THE Hero SHALL display a single row of contact links: Dublin, Ireland | kaifahmed6864@gmail.com | +353 894120412 | LinkedIn | GitHub, separated by vertical bar characters.
4. THE Hero SHALL render the email address as a `mailto:` link, the phone number as a `tel:` link, LinkedIn as a link to `https://linkedin.com/in/kaif-ahmed-bb972421a`, and GitHub as a link to `https://github.com/Kaif198`, each opening in a new tab.
5. THE Hero SHALL contain no profile photograph and no background image.

---

### Requirement 6: About Section

**User Story:** As a recruiter or hiring manager, I want to read a concise professional narrative and see a summary of technical competencies, so that I can quickly assess fit.

#### Acceptance Criteria

1. THE About SHALL display the section title "About".
2. THE About SHALL render two distinct paragraphs of body text as specified in the brief.
3. THE About SHALL display competency tags as pill-shaped labels with a light gray background, no border, and small text, in a wrapping flex-row layout.
4. THE About SHALL display all 14 competency tags specified in the brief.

---

### Requirement 7: Experience Section

**User Story:** As a recruiter, I want to review professional experience in a clean, scannable format, so that I can assess career progression and impact.

#### Acceptance Criteria

1. THE Experience SHALL display the section title "Experience".
2. THE Experience SHALL render each role with: job title as a bold heading, company and location in secondary text on the same line, and date range right-aligned on desktop or below the company on mobile.
3. THE Experience SHALL render role descriptions as clean paragraph blocks with a slight left indent, without bullet-point characters.
4. THE Experience SHALL display an impact line for each role that has one, styled distinctly (e.g., slightly bolder or in accent color) to draw the eye.
5. THE Experience SHALL render all three roles specified in the brief in reverse chronological order (most recent first).

---

### Requirement 8: Projects Section

**User Story:** As a technical evaluator, I want to browse Mohammed Kaif Ahmed's projects in a structured grid, so that I can quickly identify relevant work and access live demos or source code.

#### Acceptance Criteria

1. THE Projects SHALL display the section title "Projects" and the subtitle "12 live projects. Each one deployed, clickable, and built to demonstrate how I think about problems." in secondary text.
2. THE Projects SHALL render Project_Cards in a 2-column grid on viewports 768px wide and above, and a 1-column layout on narrower viewports.
3. WHEN a project has a brand color specified, THE Project_Card SHALL display a 3px left border or a small colored dot in that brand color.
4. THE Project_Card SHALL display: project title in bold, one-line company context in secondary text, a 2–3 sentence description, tech stack as small inline text, and text links for available demo or repository URLs.
5. THE Project_Card SHALL render "Live Demo", "GitHub", and "Tableau Public" links only for projects where those URLs are provided in the brief.
6. ALL external links within Project_Cards SHALL open in a new tab.
7. THE Projects SHALL render all 13 projects specified in the brief (Projects 01–13, including 12b).

---

### Requirement 9: Education Section

**User Story:** As a recruiter, I want to see academic qualifications and certifications in a clean layout, so that I can verify educational background at a glance.

#### Acceptance Criteria

1. THE Education SHALL display the section title "Education".
2. THE Education SHALL render both degree entries with: degree name, institution name, date range, and focus areas.
3. THE Education SHALL render all 9 certifications specified in the brief as Competency_Tags in a wrapping flex-row layout, using the same pill-shaped style as the About section tags.

---

### Requirement 10: Contact Section

**User Story:** As a recruiter or collaborator, I want to find Mohammed Kaif Ahmed's contact details and availability in one place, so that I can reach out without searching the page.

#### Acceptance Criteria

1. THE Contact SHALL display the section title "Let's Connect".
2. THE Contact SHALL display the body paragraph as specified in the brief.
3. THE Contact SHALL display email as a `mailto:` link, phone as a `tel:` link, LinkedIn and GitHub as external links opening in new tabs.
4. THE Contact SHALL display location, relocation openness, language proficiencies, and availability as specified in the brief.
5. THE Contact SHALL display a footer line "Mohammed Kaif Ahmed — 2026" in small, centered, secondary-color text.

---

### Requirement 11: Scroll Animations

**User Story:** As a visitor scrolling through the page, I want sections to fade in smoothly as they enter the viewport, so that the experience feels polished and modern.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use the Intersection_Observer API to detect when each section enters the Viewport.
2. WHEN a section enters the Viewport, THE Portfolio_Site SHALL apply a fade-in and subtle upward translate animation (e.g., `opacity: 0 → 1`, `translateY(20px) → translateY(0)`) over 600ms.
3. THE Portfolio_Site SHALL apply the fade-in animation to each major section independently.
4. WHEN the Intersection_Observer API is unavailable in the browser, THE Portfolio_Site SHALL display all sections as fully visible without animation.
5. THE Portfolio_Site SHALL not apply scroll animations to the Nav or Hero section, which SHALL be visible immediately on page load.

---

### Requirement 12: Performance and Accessibility

**User Story:** As a visitor on any device or network, I want the page to load quickly and be navigable, so that I have a good experience regardless of my setup.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL load no external JavaScript libraries or CSS frameworks.
2. THE Portfolio_Site SHALL include `alt` attributes on all `<img>` elements (if any are used).
3. THE Portfolio_Site SHALL use ARIA landmark roles consistent with the semantic HTML5 structure.
4. THE Portfolio_Site SHALL ensure all interactive elements (links, buttons) have a visible focus state.
5. THE Portfolio_Site SHALL ensure color contrast between primary text (`#1D1D1F`) and background (`#FBFBFD`) meets a minimum contrast ratio of 4.5:1.
6. ALL external links SHALL include `target="_blank"` and `rel="noopener noreferrer"`.
