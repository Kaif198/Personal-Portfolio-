# Design Document

## Overview

The portfolio website is a single self-contained HTML file that presents Mohammed Kaif Ahmed's professional profile. There is no build pipeline, no server-side rendering, and no external JavaScript or CSS framework dependencies. All styling and behavior live inline in one file that can be opened directly in a browser or dropped onto any static host.

The design language follows Apple's Human Interface Guidelines aesthetic: generous whitespace, a restrained color palette, clean sans-serif typography, and subtle motion. The goal is a page that feels premium without being flashy — content-first, with visual polish that supports rather than competes with the information.

The primary technical challenges are:

- Keeping the single-file constraint while maintaining readable, maintainable code structure through clear HTML comments
- Implementing a responsive layout (mobile-first) with no CSS framework
- Delivering smooth scroll animations via the Intersection Observer API with a graceful no-JS fallback
- Ensuring all 13 project cards, 14 competency tags, and 9 certification tags render correctly across viewport sizes

---

## Architecture

The entire site is one HTML document. Its internal structure follows a strict layering:

```
index.html
├── <head>
│   ├── Meta tags (charset, viewport, description, OG tags)
│   ├── Google Fonts <link> (Inter or system font fallback)
│   └── <style> — all CSS, mobile-first
├── <body>
│   ├── <header> / <nav>          — fixed navigation
│   ├── <main>
│   │   ├── <section id="hero">   — headline + contact row
│   │   ├── <section id="about">  — narrative + competency tags
│   │   ├── <section id="experience"> — 3 roles
│   │   ├── <section id="projects">   — 13 project cards
│   │   └── <section id="education">  — 2 degrees + 9 cert tags
│   └── <footer id="contact">     — contact details + footer line
└── <script> — all JS inline (Intersection Observer, hamburger menu, smooth scroll)
```

There are no modules, no bundler outputs, and no external script tags. The `<style>` block is organized with clear comment headers matching each section. The `<script>` block is similarly divided.

### Rendering Model

The page is purely static HTML. JavaScript enhances the experience (animations, mobile menu) but is never required for content to be visible. The no-JS fallback is handled by initializing all animated elements as visible and only applying the hidden initial state when JS runs successfully.

---

## Components and Interfaces

### Navigation (`<header>` / `<nav>`)

- Fixed position, full viewport width, `z-index: 1000`
- Background: `rgba(255,255,255,0.85)` with `backdrop-filter: blur(20px)`
- Left: site name "Mohammed Kaif Ahmed" as a `<span>` or `<a href="#hero">`
- Right: `<ul>` of anchor links on ≥768px; hamburger `<button>` on <768px
- Hamburger toggles a `.nav-open` class on `<body>` or the nav element, revealing a vertical dropdown
- Smooth scroll handled via CSS `scroll-behavior: smooth` on `<html>` plus a JS fallback for Safari

### Hero (`<section id="hero">`)

- No fixed height — content-driven, with generous top padding to clear the fixed nav
- Headline: `<h1>` — largest text on page, ~56px desktop / 36px mobile
- Subheadline: `<p>` — secondary color, ~18px
- Contact row: `<p>` or `<div>` with inline `<a>` elements separated by ` | ` text nodes
- No image, no background image, no gradient

### About (`<section id="about">`)

- Section title `<h2>`
- Two `<p>` elements for body text
- Competency tags: `<div class="tags">` containing 14 `<span class="tag">` elements
- Tag style: `background: #F5F5F7`, `border-radius: 20px`, `padding: 6px 14px`, `font-size: 13px`

### Experience (`<section id="experience">`)

- Section title `<h2>`
- Each role: `<article>` containing:
  - `<div class="role-header">`: job title `<h3>` + company/location `<span>` + date range `<span class="date">`
  - `<div class="role-body">`: one or more `<p>` elements with `padding-left: 1rem` (the "slight left indent")
  - `<p class="impact">`: impact line styled in accent color `#0071E3`, slightly bolder weight
- Date range is right-aligned on desktop via flexbox, drops below company name on mobile

### Projects (`<section id="projects">`)

- Section title `<h2>` + subtitle `<p class="section-subtitle">`
- Grid: `display: grid; grid-template-columns: 1fr` on mobile, `repeat(2, 1fr)` on ≥768px, `gap: 24px`
- Each card: `<article class="project-card">` with:
  - Left border: `border-left: 3px solid <brand-color>` (or `#0071E3` as default)
  - `<h3>` project title
  - `<p class="card-context">` company context in secondary color
  - `<p>` description (2–3 sentences)
  - `<p class="tech-stack">` tech stack in small monospace text
  - `<div class="card-links">` with `<a>` elements for demo/repo/tableau where available
- All card links: `target="_blank" rel="noopener noreferrer"`

### Education (`<section id="education">`)

- Section title `<h2>`
- Two degree entries: `<article>` each with degree name `<h3>`, institution + date `<p>`, focus areas `<p>`
- Certifications: same `.tags` / `.tag` pattern as About section, 9 tags

### Contact (`<footer id="contact">`)

- Section title `<h2>` "Let's Connect"
- Body paragraph
- Contact details: `<address>` element with `<a>` links for email, phone, LinkedIn, GitHub
- Location, relocation, languages, availability as `<p>` or `<dl>` / `<dt>` / `<dd>` pairs
- Footer line: `<p class="footer-line">` — small, centered, secondary color

### Scroll Animation System

- On DOM ready, JS queries all `section` elements (excluding `#hero`) and the nav
- Each qualifying element gets class `.fade-target` and initial style `opacity: 0; transform: translateY(20px)`
- An `IntersectionObserver` with `threshold: 0.1` watches each `.fade-target`
- On intersection, adds class `.fade-in` which applies `opacity: 1; transform: translateY(0); transition: opacity 600ms ease, transform 600ms ease`
- If `IntersectionObserver` is not available, a fallback immediately makes all `.fade-target` elements visible

---

## Data Models

The site has no runtime data store. All content is hardcoded in HTML. The logical data structures are described below for reference when writing the markup.

### PersonalInfo

```
name:        "Mohammed Kaif Ahmed"
location:    "Dublin, Ireland"
email:       "kaifahmed6864@gmail.com"
phone:       "+353 894120412"
linkedin:    "https://linkedin.com/in/kaif-ahmed-bb972421a"
github:      "https://github.com/Kaif198"
```

### Role

```
title:       string          // e.g. "Business Analyst"
company:     string
location:    string
dateRange:   string          // e.g. "Jan 2022 – Present"
paragraphs:  string[]        // body text blocks
impact:      string | null   // accent-colored impact line
```

Roles (3 total, reverse chronological):
1. Current/most recent role
2. Second role
3. Third role

### ProjectCard

```
id:          string          // "01" through "13" (including "12b")
title:       string
context:     string          // one-line company/context
description: string          // 2–3 sentences
techStack:   string[]
brandColor:  string | null   // CSS color value for left border
demoUrl:     string | null
githubUrl:   string | null
tableauUrl:  string | null
```

13 cards total (01–12, 12b, 13).

### Tag

```
label: string
```

Used for both competency tags (14 in About) and certification tags (9 in Education). Rendered identically.

### DegreeEntry

```
degree:      string
institution: string
dateRange:   string
focusAreas:  string
```

Two entries total.

---
## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: No external CSS or JavaScript dependencies

*For any* valid build of the Portfolio_Site, parsing all `<script>` and `<link>` tags in the document should find zero tags that load external JavaScript files or external CSS stylesheets. The only permitted external resource tag is a single `<link>` pointing to `fonts.googleapis.com`.

**Validates: Requirements 1.2, 12.1**

---

### Property 2: Semantic HTML5 landmark elements are present

*For any* valid build of the Portfolio_Site, the document should contain at least one each of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, and `<article>` elements.

**Validates: Requirements 1.3**

---

### Property 3: No gradient fills in CSS

*For any* CSS rule in the Portfolio_Site's inline stylesheet, the rule should not contain a `linear-gradient`, `radial-gradient`, or `conic-gradient` value (except where opacity is below 0.05).

**Validates: Requirements 2.10**

---

### Property 4: No emoji characters in rendered text

*For any* text node in the Portfolio_Site's HTML, the text content should contain no Unicode emoji code points (ranges U+1F300–U+1FAFF and related blocks).

**Validates: Requirements 2.11**

---

### Property 5: Mobile-first CSS uses only min-width media queries

*For any* `@media` rule in the Portfolio_Site's inline stylesheet, the media condition should use `min-width` (not `max-width`), confirming a mobile-first approach.

**Validates: Requirements 3.5**

---

### Property 6: All external links use correct href schemes

*For any* `<a>` element in the Portfolio_Site that links to an email address, the `href` should begin with `mailto:`. *For any* `<a>` element that links to a phone number, the `href` should begin with `tel:`. *For any* `<a>` element that links to an external website, the `href` should begin with `https://`.

**Validates: Requirements 5.4, 10.3**

---

### Property 7: Competency and certification tags have pill styling

*For any* element with the tag/pill class in the Portfolio_Site (in both the About and Education sections), the computed CSS should include a `border-radius` value of at least 16px, a light background color, and padding on the left and right axes.

**Validates: Requirements 6.3, 9.3**

---

### Property 8: Each experience role article has required structural elements

*For any* role `<article>` in the Experience section, the article should contain: a heading element (`<h3>`) for the job title, at least one element containing the company name and location in secondary color, a date range element, and at least one body paragraph with a left indent style.

**Validates: Requirements 7.2, 7.3**

---

### Property 9: Each project card has all required fields

*For any* project card `<article>` in the Projects section, the card should contain: a bold title heading, a context line in secondary color, a description paragraph, and a tech stack element using monospace text.

**Validates: Requirements 8.4**

---

### Property 10: Project card links are only rendered when a URL is provided

*For any* project card in the Portfolio_Site, a "Live Demo" link should appear if and only if a demo URL is specified for that project; a "GitHub" link should appear if and only if a repository URL is specified; a "Tableau Public" link should appear if and only if a Tableau URL is specified.

**Validates: Requirements 8.5**

---

### Property 11: All external links have security attributes

*For any* `<a>` element in the Portfolio_Site whose `href` begins with `http://` or `https://`, the element should have both `target="_blank"` and `rel="noopener noreferrer"` attributes.

**Validates: Requirements 8.6, 12.6**

---

### Property 12: All img elements have alt attributes

*For any* `<img>` element in the Portfolio_Site, the element should have a non-missing `alt` attribute (the value may be empty for decorative images, but the attribute must be present).

**Validates: Requirements 12.2**

---

### Property 13: ARIA landmark roles are consistent with semantic structure

*For any* landmark element (`<header>`, `<nav>`, `<main>`, `<footer>`) in the Portfolio_Site, the element should either carry the correct implicit ARIA role by virtue of its tag name or have an explicit `role` attribute that matches the expected landmark role.

**Validates: Requirements 12.3**

---

### Property 14: All interactive elements have a focus style

*For any* `<a>` or `<button>` element in the Portfolio_Site, the inline CSS should define a `:focus` or `:focus-visible` rule that provides a visible outline or other focus indicator (i.e., the rule should not set `outline: none` without providing an alternative).

**Validates: Requirements 12.4**

---

## Error Handling

Because the site is static HTML with no server interaction, error handling is limited to browser-environment edge cases:

**JavaScript unavailable or disabled**
- All content is in HTML and visible without JS
- The `<noscript>` tag (or equivalent CSS) ensures animated sections start fully visible
- The Intersection Observer fallback explicitly sets all `.fade-target` elements to `opacity: 1; transform: none` if `IntersectionObserver` is not defined

**IntersectionObserver not supported**
- Checked with `typeof IntersectionObserver !== 'undefined'` before instantiation
- If absent, a single loop makes all animated sections immediately visible

**Hamburger menu state**
- If JS fails mid-execution, the mobile menu defaults to hidden (CSS default)
- The hamburger button has `aria-expanded` toggled by JS; if JS fails, the attribute stays `false` which is the correct default state

**External links**
- All external links use `rel="noopener noreferrer"` to prevent tab-napping and avoid leaking referrer information
- No fetch/XHR calls are made, so network errors are not applicable

**Font loading failure**
- The font stack includes system font fallbacks (`-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `Arial`) so the page remains readable if Google Fonts fails to load

---

## Testing Strategy

### Dual Testing Approach

Testing a static HTML file requires a combination of structural/content verification (unit-style tests) and universal property checks (property-based tests). Both are necessary:

- Unit tests verify specific content, exact values, and integration points (e.g., "the h1 contains the exact headline text")
- Property tests verify universal rules that must hold across all elements of a given type (e.g., "every external link has rel=noopener noreferrer")

### Recommended Tooling

- **HTML parsing**: `node-html-parser` or `cheerio` (Node.js) for querying the DOM in tests
- **CSS parsing**: `css` npm package or regex-based extraction for verifying inline style rules
- **Property-based testing**: `fast-check` (TypeScript/JavaScript) — minimum 100 iterations per property test
- **Test runner**: `vitest` or `jest`

Since the deliverable is a single HTML file, tests load the file, parse it, and make assertions against the parsed structure. No browser automation is required for structural tests; browser-based tests (e.g., Playwright) can be added for interaction tests (hamburger menu, smooth scroll).

### Unit Tests

Focus on specific content and configuration:

- Exact headline and subheadline text in Hero
- Exact href values for all contact links (mailto, tel, LinkedIn, GitHub)
- Presence of all 14 competency tags in About (count assertion)
- Presence of all 9 certification tags in Education (count assertion)
- Presence of all 13 project cards (count assertion)
- Exact CSS color values: `#FBFBFD`, `#1D1D1F`, `#6E6E73`, `#0071E3`
- Exact CSS values: `max-width: 980px`, `backdrop-filter: blur(20px)`, `position: fixed` on nav
- Section padding values: 80px base, 120px at 1024px+
- Color contrast ratio between `#1D1D1F` and `#FBFBFD` ≥ 4.5:1 (computed via WCAG formula)
- IntersectionObserver fallback code path exists in inline script
- Nav and Hero excluded from `.fade-target` assignment

### Property-Based Tests

Each property test uses `fast-check` to generate inputs and verify universal rules. Minimum 100 runs per test.

**Property Test 1: No external CSS or JavaScript dependencies**
Tag: `Feature: portfolio-website, Property 1: no external CSS or JS dependencies`
Generate: N/A (single file, deterministic) — parse all script/link tags and assert none load external JS/CSS

**Property Test 2: Semantic HTML5 landmark elements present**
Tag: `Feature: portfolio-website, Property 2: semantic HTML5 landmark elements present`
Assert each required semantic element appears at least once

**Property Test 3: No gradient fills in CSS**
Tag: `Feature: portfolio-website, Property 3: no gradient fills in CSS`
Use fast-check to generate CSS rule indices; for each rule, assert no gradient function is present

**Property Test 4: No emoji in rendered text**
Tag: `Feature: portfolio-website, Property 4: no emoji in rendered text`
Use fast-check to generate text node indices; for each node, assert no emoji code points

**Property Test 5: Mobile-first min-width media queries**
Tag: `Feature: portfolio-website, Property 5: mobile-first CSS uses only min-width media queries`
Parse all @media rules; for each, assert condition uses min-width

**Property Test 6: External links use correct href schemes**
Tag: `Feature: portfolio-website, Property 6: all external links use correct href schemes`
Use fast-check to generate link indices; for each link, assert href scheme matches link type

**Property Test 7: Tag pill styling**
Tag: `Feature: portfolio-website, Property 7: competency and certification tags have pill styling`
Use fast-check to generate tag element indices; for each, assert border-radius ≥ 16px and padding present

**Property Test 8: Role article structure**
Tag: `Feature: portfolio-website, Property 8: each experience role article has required structural elements`
For each role article, assert presence of h3, company/date elements, and indented paragraph

**Property Test 9: Project card required fields**
Tag: `Feature: portfolio-website, Property 9: each project card has all required fields`
For each project card, assert title, context, description, and tech stack elements are present

**Property Test 10: Project card conditional links**
Tag: `Feature: portfolio-website, Property 10: project card links only rendered when URL provided`
For each project card, assert link presence matches the content specification

**Property Test 11: External link security attributes**
Tag: `Feature: portfolio-website, Property 11: all external links have security attributes`
Use fast-check to generate external link indices; for each, assert target="_blank" and rel="noopener noreferrer"

**Property Test 12: img alt attributes**
Tag: `Feature: portfolio-website, Property 12: all img elements have alt attributes`
For each img element, assert alt attribute exists

**Property Test 13: ARIA landmark roles**
Tag: `Feature: portfolio-website, Property 13: ARIA landmark roles consistent with semantic structure`
For each landmark element, assert correct implicit or explicit ARIA role

**Property Test 14: Interactive element focus styles**
Tag: `Feature: portfolio-website, Property 14: all interactive elements have focus style`
Parse CSS :focus/:focus-visible rules; assert a, button selectors have non-empty focus declarations
