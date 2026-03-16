# Implementation Plan: Portfolio Website

## Overview

Build a single self-contained `index.html` file with inline CSS and JavaScript. Tasks progress from scaffolding through each section, then the animation system, then tests. Each task builds on the previous so there is no orphaned code.

## Tasks

- [x] 1. Scaffold project structure and test infrastructure
  - Create `index.html` with `<!DOCTYPE html>`, `<html lang="en">`, `<head>`, and `<body>` stubs
  - Add HTML comment separators for each major section: HEAD, NAV, HERO, ABOUT, EXPERIENCE, PROJECTS, EDUCATION, CONTACT, STYLE, SCRIPT
  - Create `tests/` directory with `package.json` declaring `vitest`, `fast-check`, `cheerio`, and `css` as dev dependencies
  - Create `tests/setup.js` that reads and parses `index.html` with cheerio, exporting the `$` instance and raw HTML string for reuse across test files
  - _Requirements: 1.1, 1.4_

- [x] 2. Implement `<head>` block
  - Add `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<meta name="description">`, and Open Graph tags
  - Add the single Google Fonts `<link>` tag (Inter, weights 300/400/500/600/700)
  - Open the `<style>` block with CSS custom properties (design tokens): `--bg: #FBFBFD`, `--text: #1D1D1F`, `--secondary: #6E6E73`, `--accent: #0071E3`, `--card-bg: #FFFFFF`, `--border: #E5E5E7`, `--tag-bg: #F5F5F7`
  - Add CSS reset: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }`
  - Add base typography rules using the heading font stack and body font stack from Requirement 2.1–2.3
  - Set `html { scroll-behavior: smooth }` and `body { background: var(--bg); color: var(--text) }`
  - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 3. Implement global layout and spacing CSS
  - Add `.container` class: `max-width: 980px; margin: 0 auto; padding: 0 24px`
  - Add `section` base rule: `padding: 80px 0` (mobile-first)
  - Add `@media (min-width: 1024px)` rule overriding section padding to `120px 0`
  - Add section divider rule: `border-top: 1px solid var(--border)` on sections (excluding hero)
  - Add accent color rule for divider lines using `#0071E3`
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 4. Implement navigation component
  - Add `<header>` containing `<nav>` with `position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px)`
  - Add site name as `<a href="#hero">Mohammed Kaif Ahmed</a>` left-aligned
  - Add `<ul>` of anchor links (About, Experience, Projects, Education, Contact) hidden on mobile via CSS
  - Add `<button class="hamburger" aria-label="Toggle menu" aria-expanded="false">` visible only on `<768px`
  - Add `@media (min-width: 768px)` rule showing the `<ul>` and hiding the hamburger
  - Add `.nav-links` dropdown styles for mobile: vertical list, full-width, shown when `.nav-open` class is present on nav
  - Add JS in `<script>` block: hamburger click toggles `.nav-open` on nav and flips `aria-expanded`; nav link clicks close the menu and smooth-scroll to target
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

- [x] 5. Implement Hero section
  - Add `<main>` and `<section id="hero">` with top padding sufficient to clear the fixed nav (~100px)
  - Add `<h1>` with exact text: "Supply Chain Intelligence. Procurement Analytics. Data Engineering."
  - Add `<p>` subheadline in `var(--secondary)` color with exact text from Requirement 5.2
  - Add contact row `<p>` with inline `<a>` links: `mailto:kaifahmed6864@gmail.com`, `tel:+353894120412`, LinkedIn (`https://linkedin.com/in/kaif-ahmed-bb972421a`), GitHub (`https://github.com/Kaif198`), each with `target="_blank" rel="noopener noreferrer"`
  - Separate contact items with ` | ` text nodes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 6. Implement About section
  - Add `<section id="about">` with `<h2>About</h2>`
  - Add two `<p>` body text paragraphs as specified in the brief
  - Add `<div class="tags">` containing 14 `<span class="tag">` elements for all competency tags
  - Add `.tag` CSS: `background: var(--tag-bg); border-radius: 20px; padding: 6px 14px; font-size: 13px; display: inline-block`
  - Add `.tags` CSS: `display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px`
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 7. Implement Experience section
  - Add `<section id="experience">` with `<h2>Experience</h2>`
  - Add three `<article>` elements (most recent first), each containing:
    - `<div class="role-header">` with `<h3>` job title, `<span>` company + location, `<span class="date">` date range
    - `<div class="role-body">` with `<p>` description paragraphs, `padding-left: 1rem`
    - `<p class="impact">` impact line in `var(--accent)` color with `font-weight: 500` (only for roles that have one)
  - Add `.role-header` CSS: `display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 4px`
  - Add `@media (min-width: 768px)` rule keeping date right-aligned; on mobile it wraps below company name
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Implement Projects section
  - Add `<section id="projects">` with `<h2>Projects</h2>` and `<p class="section-subtitle">` with exact subtitle text from Requirement 8.1
  - Add `<div class="projects-grid">` CSS: `display: grid; grid-template-columns: 1fr; gap: 24px` (mobile-first)
  - Add `@media (min-width: 768px)` rule: `grid-template-columns: repeat(2, 1fr)`
  - Add 13 `<article class="project-card">` elements (01–12, 12b, 13), each with:
    - `border-left: 3px solid <brand-color>` (use `var(--accent)` as default)
    - `<h3>` title, `<p class="card-context">` in secondary color, `<p>` description, `<p class="tech-stack">` in monospace small text
    - `<div class="card-links">` with only the links that have URLs (Live Demo, GitHub, Tableau Public)
  - Add `.project-card` CSS: `background: var(--card-bg); box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 24px; border-radius: 8px`
  - Ensure all card links have `target="_blank" rel="noopener noreferrer"`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [x] 9. Implement Education section
  - Add `<section id="education">` with `<h2>Education</h2>`
  - Add two `<article>` elements for degree entries, each with `<h3>` degree name, `<p>` institution + date range, `<p>` focus areas
  - Add `<div class="tags">` with 9 `<span class="tag">` certification tags (reusing the same `.tag` style from About)
  - _Requirements: 9.1, 9.2, 9.3_

- [x] 10. Implement Contact / Footer section
  - Close `<main>` after Education
  - Add `<footer id="contact">` with `<h2>Let's Connect</h2>`
  - Add body paragraph as specified in the brief
  - Add `<address>` with `<a href="mailto:...">`, `<a href="tel:...">`, LinkedIn and GitHub links (all with `target="_blank" rel="noopener noreferrer"`)
  - Add location, relocation openness, language proficiencies, and availability as `<p>` or `<dl>`/`<dt>`/`<dd>` pairs
  - Add `<p class="footer-line">Mohammed Kaif Ahmed — 2026</p>` with `text-align: center; font-size: 13px; color: var(--secondary)`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Implement scroll animation system
  - In the `<script>` block, after the hamburger logic, add the Intersection Observer setup:
    - Query all `section` elements excluding `#hero`, assign class `.fade-target` and inline `opacity: 0; transform: translateY(20px); transition: opacity 600ms ease, transform 600ms ease`
    - Create `IntersectionObserver` with `threshold: 0.1`; on intersection add class `.fade-in` setting `opacity: 1; transform: translateY(0)`
  - Add `typeof IntersectionObserver !== 'undefined'` guard; if absent, loop over `.fade-target` elements and set them visible immediately
  - Add `.fade-in` CSS rule: `opacity: 1 !important; transform: translateY(0) !important`
  - Verify nav and hero are excluded from `.fade-target` assignment
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 12. Responsive polish and accessibility
  - Add `:focus-visible` CSS rules for `a` and `button`: visible outline using `var(--accent)`, do not set `outline: none` without an alternative
  - Verify all `<img>` elements (if any) have `alt` attributes
  - Add `aria-label` or `aria-expanded` attributes to the hamburger button (already in task 4; verify here)
  - Verify color contrast: `#1D1D1F` on `#FBFBFD` passes 4.5:1 (computed: ~18.1:1 — passes)
  - Test layout at 320px, 768px, and 1024px breakpoints by reviewing CSS rules
  - _Requirements: 3.4, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 13. Checkpoint — verify structure before writing tests
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Write unit tests
  - [x] 14.1 Write unit tests for content and configuration
    - Test exact `<h1>` text matches Requirement 5.1
    - Test exact subheadline text matches Requirement 5.2
    - Test all contact link `href` values (mailto, tel, LinkedIn, GitHub)
    - Test count of `.tag` elements in `#about` equals 14
    - Test count of `.tag` elements in `#education` equals 9
    - Test count of `.project-card` elements equals 13
    - Test CSS contains `#FBFBFD`, `#1D1D1F`, `#6E6E73`, `#0071E3`
    - Test CSS contains `max-width: 980px`, `backdrop-filter: blur(20px)`, `position: fixed`
    - Test section padding values: `80px` base, `120px` at `min-width: 1024px`
    - Test IntersectionObserver fallback code path exists in inline `<script>`
    - Test `#hero` and `<nav>` are not assigned `.fade-target` in the script
    - _Requirements: 1.1, 2.4–2.7, 3.1–3.3, 4.1–4.2, 5.1–5.4, 6.4, 8.7, 9.3, 11.4–11.5_

- [ ] 15. Write property-based tests
  - [ ]* 15.1 Write property test for Property 1: no external CSS or JS dependencies
    - Parse all `<script src>` and `<link rel="stylesheet">` tags; assert none point to external hosts except `fonts.googleapis.com`
    - **Property 1: No external CSS or JavaScript dependencies**
    - **Validates: Requirements 1.2, 12.1**

  - [ ]* 15.2 Write property test for Property 2: semantic HTML5 landmark elements present
    - Assert at least one each of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` exists
    - **Property 2: Semantic HTML5 landmark elements present**
    - **Validates: Requirements 1.3**

  - [ ]* 15.3 Write property test for Property 3: no gradient fills in CSS
    - Use fast-check to generate indices over extracted CSS rules; for each rule assert no `linear-gradient`, `radial-gradient`, or `conic-gradient`
    - **Property 3: No gradient fills in CSS**
    - **Validates: Requirements 2.10**

  - [ ]* 15.4 Write property test for Property 4: no emoji in rendered text
    - Use fast-check to generate indices over all text nodes; for each assert no Unicode emoji code points (U+1F300–U+1FAFF)
    - **Property 4: No emoji characters in rendered text**
    - **Validates: Requirements 2.11**

  - [ ]* 15.5 Write property test for Property 5: mobile-first min-width media queries
    - Parse all `@media` rules from inline CSS; use fast-check to generate indices; for each assert condition uses `min-width` not `max-width`
    - **Property 5: Mobile-first CSS uses only min-width media queries**
    - **Validates: Requirements 3.5**

  - [ ]* 15.6 Write property test for Property 6: external links use correct href schemes
    - Use fast-check to generate indices over all `<a>` elements; for each assert `mailto:` for email, `tel:` for phone, `https://` for external URLs
    - **Property 6: All external links use correct href schemes**
    - **Validates: Requirements 5.4, 10.3**

  - [ ]* 15.7 Write property test for Property 7: tag pill styling
    - Use fast-check to generate indices over all `.tag` elements; for each assert `border-radius` ≥ 16px and horizontal padding present in CSS
    - **Property 7: Competency and certification tags have pill styling**
    - **Validates: Requirements 6.3, 9.3**

  - [ ]* 15.8 Write property test for Property 8: experience role article structure
    - For each `<article>` in `#experience`, assert presence of `<h3>`, company/date elements, and a paragraph with left-indent style
    - **Property 8: Each experience role article has required structural elements**
    - **Validates: Requirements 7.2, 7.3**

  - [ ]* 15.9 Write property test for Property 9: project card required fields
    - Use fast-check to generate indices over `.project-card` elements; for each assert `<h3>`, `.card-context`, description `<p>`, and `.tech-stack` are present
    - **Property 9: Each project card has all required fields**
    - **Validates: Requirements 8.4**

  - [ ]* 15.10 Write property test for Property 10: project card conditional links
    - For each project card, assert "Live Demo" link exists iff a demo URL is in the HTML, "GitHub" iff a repo URL, "Tableau Public" iff a Tableau URL
    - **Property 10: Project card links only rendered when URL provided**
    - **Validates: Requirements 8.5**

  - [ ]* 15.11 Write property test for Property 11: external link security attributes
    - Use fast-check to generate indices over all `<a href="https://...">` elements; for each assert `target="_blank"` and `rel="noopener noreferrer"`
    - **Property 11: All external links have security attributes**
    - **Validates: Requirements 8.6, 12.6**

  - [ ]* 15.12 Write property test for Property 12: img alt attributes
    - For each `<img>` element assert `alt` attribute is present (value may be empty)
    - **Property 12: All img elements have alt attributes**
    - **Validates: Requirements 12.2**

  - [ ]* 15.13 Write property test for Property 13: ARIA landmark roles
    - For each `<header>`, `<nav>`, `<main>`, `<footer>` assert correct implicit or explicit ARIA role
    - **Property 13: ARIA landmark roles consistent with semantic structure**
    - **Validates: Requirements 12.3**

  - [ ]* 15.14 Write property test for Property 14: interactive elements have focus styles
    - Parse inline CSS `:focus` and `:focus-visible` rules; assert `a` and `button` selectors have non-empty focus declarations that do not set `outline: none` without an alternative
    - **Property 14: All interactive elements have focus style**
    - **Validates: Requirements 12.4**

- [x] 16. Final checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` with minimum 100 iterations per property
- Unit tests use `vitest` + `cheerio` for DOM querying against the static HTML file
- The `<style>` and `<script>` blocks grow incrementally across tasks — each task appends to the relevant block
