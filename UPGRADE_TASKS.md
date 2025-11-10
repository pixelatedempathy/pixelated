# Pixelated Empathy - Website Upgrade Tasks

**Created:** 2025-11-07  
**Status:** In Progress  
**Priority Order:** Critical → High → Medium → Low

---

## INTEGRITY RULE
**NEVER present fake data, metrics, testimonials, or contact information as real.**
- ✅ Build real working functionality when possible
- ✅ Use clear placeholders ("--", "Coming soon", "[Placeholder]") when not implemented
- ❌ Never fabricate historical data, uptime metrics, customer testimonials, or contact details
- ❌ Never present non-functional features as working (fake email subscriptions, etc.)

---

## Phase 1: Critical Missing Pages (Blocking User Journeys)

### 1.1 Pricing Page
- [x] Create `/src/pages/pricing.astro`
- [x] Design 3-tier pricing structure (Free Trial, Professional, Enterprise)
- [x] Add feature comparison table
- [x] Include FAQ section for pricing questions
- [x] Add "Start Free Trial" and "Contact Sales" CTAs

### 1.2 Demos Page
- [x] Create `/src/pages/demos.astro`
- [x] Embed video demo or interactive walkthrough
- [x] Add "Schedule Live Demo" calendar integration placeholder
- [x] Include demo scenario examples (crisis intervention, trauma response)
- [x] Add testimonial quotes from demo participants

### 1.3 Team Page
- [x] Create `/src/pages/team.astro`
- [x] Design team member card component
- [x] Add placeholder profiles (CEO, CTO, Clinical Director, etc.)
- [x] Include LinkedIn/social links
- [x] Add "Join Our Team" CTA linking to careers

---

## Phase 2: High Priority Visual Enhancements

### 2.1 Navigation Active States
- [x] Update `Header.astro` to detect current page
- [x] Add active state styling (gradient underline or color change)
- [x] Ensure accessibility with `aria-current="page"`

### 2.2 Hero Chat Simulation Enhancement
- [x] Increase chat bubble shadow depth (from `shadow-lg` to custom stronger shadow)
- [x] Add subtle pulse animation to "Live AI Simulation" badge
- [x] Improve contrast on chat text (increase opacity or add text-shadow)
- [x] Add typing indicator animation between messages

### 2.3 Animated Stats Counters
- [x] Create `AnimatedCounter.astro` component with Intersection Observer
- [x] Apply to homepage stats (10K+, 95%, 24/7)
- [x] Apply to features page stats (500+, 135K+, 98%, 24/7)
- [x] Add easing function for smooth count-up effect

### 2.4 Feature Card Icon Upgrades
- [x] Increase icon container size from 40px to 56px
- [x] Add subtle hover scale animation (scale-105)
- [x] Add gradient glow effect on hover
- [x] Consider icon rotation or bounce on hover

### 2.5 Footer Social Icon Enhancement
- [x] Add hover states with brand gradient colors
- [x] Increase icon size slightly for better touch targets
- [x] Add smooth transition animations
- [x] Consider adding tooltip labels on hover

---

## Phase 3: Content & Credibility

### 3.1 Testimonials Section
- [x] Create `Testimonial.astro` component
- [x] Add testimonials section to homepage (after features, before CTA)
- [x] Include 3-4 quotes with names, titles, institutions
- [x] Add profile photos or institution logos (placeholder)
- [x] Implement carousel/slider for multiple testimonials

### 3.2 Case Studies Page
- [x] Create `/src/pages/case-studies.astro`
- [x] Design case study card layout
- [x] Write 2-3 placeholder case studies (anonymized)
- [x] Include metrics: training hours, satisfaction scores, outcomes
- [x] Add "Download Full Case Study" CTA (PDF placeholder)

### 3.3 Blog Setup
- [x] Create `/src/pages/blog/index.astro`
- [x] Create blog post layout template
- [x] Add 3-5 placeholder blog posts
- [x] Implement blog post listing with pagination
- [x] Add categories/tags filtering

### 3.4 Careers Page
- [x] Create `/src/pages/careers.astro`
- [x] Add company culture section
- [x] Create job listing component
- [x] Add 3-5 placeholder job postings
- [x] Include application form or "Apply via Email" CTA

---

## Phase 4: Medium Priority Functionality

### 4.1 Contact Form Validation & Feedback
- [x] Add client-side validation to contact form
- [x] Create error state styling for invalid fields
- [x] Add success message/modal after submission
- [x] Implement loading state on submit button
- [x] Add email format validation

### 4.2 Documentation Page
- [x] Create `/src/pages/docs/index.astro`
- [x] Design docs navigation sidebar
- [x] Add getting started guide
- [x] Include API documentation placeholder
- [x] Add search functionality placeholder

### 4.3 Support Page
- [x] Create `/src/pages/support.astro`
- [x] Add FAQ accordion component
- [x] Include common troubleshooting guides
- [x] Add "Submit Support Ticket" form
- [x] Include live chat widget placeholder

### 4.4 Status Page
- [x] Create `/src/pages/status.astro`
- [x] Design system status indicators (API, Training Engine, Database)
- [x] Add uptime percentage display
- [x] Include incident history timeline
- [x] Add "Subscribe to Updates" email signup

---

## Phase 5: Button & CTA Hierarchy

### 5.1 Secondary Button Styling
- [x] Create distinct secondary button variant (outline or ghost style)
- [x] Apply to "Watch Demo", "Schedule Demo", "Contact Support" buttons
- [x] Ensure clear visual hierarchy (primary = solid, secondary = outline)
- [x] Add hover states that maintain hierarchy

### 5.2 CTA Optimization
- [x] Audit all CTAs for clarity and action-oriented copy
- [x] Ensure consistent CTA placement across pages
- [x] Add urgency elements where appropriate ("Start Free Trial - No Credit Card")
- [x] A/B test copy variations (document in comments)

---

## Phase 6: Technical & Accessibility

### 6.1 Accessibility Audit
- [x] Run axe DevTools on all pages
- [x] Ensure all interactive elements have focus states
- [x] Verify color contrast ratios (WCAG AA minimum)
- [x] Add ARIA labels to icon-only buttons
- [x] Test keyboard navigation flow
- [x] Add skip-to-content link

### 6.2 Mobile Responsiveness
- [x] Test all pages on mobile viewport (375px, 414px)
- [x] Fix any layout breaks or overflow issues
- [x] Ensure touch targets are minimum 44x44px
- [x] Optimize hero text sizing for mobile
- [x] Test hamburger menu functionality (if implemented)

### 6.3 Performance Optimization
- [x] Run Lighthouse audit on all pages
- [x] Optimize image loading (lazy load below fold)
- [x] Minimize JavaScript bundle size
- [x] Add preload hints for critical assets
- [ ] Implement service worker for offline support (optional)

### 6.4 SEO Enhancements
- [x] Add unique meta descriptions to all pages
- [x] Implement Open Graph tags for social sharing
- [x] Add structured data (Organization, Product schema)
- [x] Create sitemap.xml
- [x] Add robots.txt

---

## Phase 7: Advanced Features (Nice-to-Have)

### 7.1 Interactive Demo
- [x] Build interactive product tour component
- [x] Add step-by-step walkthrough with tooltips
- [x] Include "Try It Yourself" sandbox mode
- [x] Add progress indicator for demo steps

### 7.2 Video Integration
- [x] Record or create product demo video
- [x] Add video player component with custom controls
- [x] Embed on homepage hero or demos page
- [x] Add video thumbnails with play button overlay

### 7.3 Newsletter Signup
- [x] Create newsletter signup component
- [x] Add to footer or as modal popup
- [x] Integrate with email service (placeholder)
- [x] Add privacy policy link and consent checkbox

### 7.4 Dark/Light Mode Toggle
- [x] Implement theme switcher component
- [x] Create light mode color palette
- [x] Add theme persistence (localStorage)
- [x] Ensure all components work in both modes

### 7.5 Search Functionality
- [x] Add global search component to header
- [x] Implement search across pages, docs, blog
- [x] Add keyboard shortcut (Cmd/Ctrl + K)
- [x] Design search results page

---

## Progress Tracking

**Phase 1:** 5/5 tasks complete (100%) ✅  
**Phase 2:** 5/5 tasks complete (100%) ✅  
**Phase 3:** 4/4 tasks complete (100%) ✅  
**Phase 4:** 4/4 tasks complete (100%) ✅  
**Phase 5:** 2/2 tasks complete (100%) ✅  
**Phase 6:** 4/4 tasks complete (100%) ✅  
**Phase 7:** 5/5 tasks complete (100%) ✅  

**Overall Progress:** 29/29 major tasks complete (100%) 🎉

---

## Notes

- Update this file after completing each task
- Mark tasks with `[x]` when complete
- Add implementation notes or blockers as needed
- Estimated time: 2-3 weeks for Phases 1-6, 1 week for Phase 7
- Prioritize user-facing features over internal tooling

---

**Last Updated:** 2025-11-07
