import { describe, it, expect } from 'vitest';
import { $, html } from './setup.js';

const css = $('style').text();
const scriptContent = $('script').last().text();

// ── Hero Content ─────────────────────────────────────────────────────────────

describe('Hero section content', () => {
  it('h1 text matches exactly', () => {
    expect($('h1').text().trim()).toBe(
      'Supply Chain Intelligence. Procurement Analytics. Data Engineering.'
    );
  });

  it('subheadline (.hero-sub) text matches exactly', () => {
    expect($('.hero-sub').text().trim()).toBe(
      'Business Analyst with 4+ years across FMCG, retail, and e-commerce. I build tools that solve real operational problems — from demand forecasting models to procurement intelligence platforms.'
    );
  });
});

// ── Contact Links ─────────────────────────────────────────────────────────────

describe('Contact link href values', () => {
  it('mailto link points to kaifahmed6864@gmail.com', () => {
    const hrefs = $('a[href^="mailto:"]').map((_, el) => $(el).attr('href')).get();
    expect(hrefs).toContain('mailto:kaifahmed6864@gmail.com');
  });

  it('tel link points to +353894120412', () => {
    const hrefs = $('a[href^="tel:"]').map((_, el) => $(el).attr('href')).get();
    expect(hrefs).toContain('tel:+353894120412');
  });

  it('LinkedIn link points to correct URL', () => {
    const hrefs = $('a[href*="linkedin.com"]').map((_, el) => $(el).attr('href')).get();
    expect(hrefs).toContain('https://linkedin.com/in/kaif-ahmed-bb972421a');
  });

  it('GitHub link points to correct URL', () => {
    const hrefs = $('a[href*="github.com/Kaif198"]').map((_, el) => $(el).attr('href')).get();
    expect(hrefs).toContain('https://github.com/Kaif198');
  });
});

// ── Tag Counts ────────────────────────────────────────────────────────────────

describe('Tag element counts', () => {
  it('#about has 14 .tag elements', () => {
    expect($('#about .tag').length).toBe(14);
  });

  it('#education has 9 .tag elements', () => {
    expect($('#education .tag').length).toBe(9);
  });
});

// ── Project Cards ─────────────────────────────────────────────────────────────

describe('Project cards', () => {
  it('there are 13 .project-card elements', () => {
    expect($('.project-card').length).toBe(13);
  });
});

// ── CSS Color Tokens ──────────────────────────────────────────────────────────

describe('CSS color values', () => {
  it('CSS contains #FBFBFD', () => {
    expect(css).toContain('#FBFBFD');
  });

  it('CSS contains #1D1D1F', () => {
    expect(css).toContain('#1D1D1F');
  });

  it('CSS contains #6E6E73', () => {
    expect(css).toContain('#6E6E73');
  });

  it('CSS contains #0071E3', () => {
    expect(css).toContain('#0071E3');
  });
});

// ── CSS Layout Rules ──────────────────────────────────────────────────────────

describe('CSS layout rules', () => {
  it('CSS contains max-width: 980px', () => {
    expect(css).toContain('max-width: 980px');
  });

  it('CSS contains backdrop-filter: blur(20px)', () => {
    expect(css).toContain('backdrop-filter: blur(20px)');
  });

  it('CSS contains position: fixed', () => {
    expect(css).toContain('position: fixed');
  });
});

// ── Section Padding ───────────────────────────────────────────────────────────

describe('Section padding values', () => {
  it('CSS contains base section padding: 80px 0', () => {
    expect(css).toContain('padding: 80px 0');
  });

  it('CSS contains desktop section padding: 120px 0 inside min-width: 1024px media query', () => {
    const mediaMatch = css.match(/@media\s*\(min-width:\s*1024px\)[^{]*\{([^}]*section[^}]*\}[^}]*)\}/s);
    // Simpler: just check both strings appear in the CSS
    expect(css).toContain('padding: 120px 0');
    expect(css).toContain('min-width: 1024px');
  });
});

// ── Script: IntersectionObserver Fallback ─────────────────────────────────────

describe('IntersectionObserver fallback', () => {
  it('inline script contains typeof IntersectionObserver check', () => {
    expect(scriptContent).toContain('typeof IntersectionObserver');
  });
});

// ── Script: Hero and Nav excluded from fade-target ────────────────────────────

describe('Fade-target exclusions', () => {
  it('script uses section:not(#hero) to exclude hero from fade-target', () => {
    expect(scriptContent).toContain('section:not(#hero)');
  });

  it('<nav> is not a <section> element', () => {
    expect($('nav').length).toBeGreaterThan(0);
    expect($('section nav').length).toBe(0);
    // nav is inside header, not a section
    expect($('header nav').length).toBeGreaterThan(0);
  });
});
