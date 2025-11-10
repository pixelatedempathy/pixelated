# Pixelated Empathy - Website Upgrade Tasks

**Created:** 2025-11-07  
**Status:** In Progress  
**Priority Order:** Critical → High → Medium → Low

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
- [ ] Add client-side validation to contact form
- [ ] Create error state styling for invalid fields
- [ ] Add success message/modal after submission
- [ ] Implement loading state on submit button
- [ ] Add email format validation

### 4.2 Documentation Page
- [ ] Create `/src/pages/docs/index.astro`
- [ ] Design docs navigation sidebar
- [ ] Add getting started guide
- [ ] Include API documentation placeholder
- [ ] Add search functionality placeholder

### 4.3 Support Page
- [ ] Create `/src/pages/support.astro`
- [ ] Add FAQ accordion component
- [ ] Include common troubleshooting guides
- [ ] Add "Submit Support Ticket" form
- [ ] Include live chat widget placeholder

### 4.4 Status Page
- [ ] Create `/src/pages/status.astro`
- [ ] Design system status indicators (API, Training Engine, Database)
- [ ] Add uptime percentage display
- [ ] Include incident history timeline
- [ ] Add "Subscribe to Updates" email signup

---

## Phase 5: Button & CTA Hierarchy

### 5.1 Secondary Button Styling
- [ ] Create distinct secondary button variant (outline or ghost style)
- [ ] Apply to "Watch Demo", "Schedule Demo", "Contact Support" buttons
- [ ] Ensure clear visual hierarchy (primary = solid, secondary = outline)
- [ ] Add hover states that maintain hierarchy

### 5.2 CTA Optimization
- [ ] Audit all CTAs for clarity and action-oriented copy
- [ ] Ensure consistent CTA placement across pages
- [ ] Add urgency elements where appropriate ("Start Free Trial - No Credit Card")
- [ ] A/B test copy variations (document in comments)

---

## Phase 6: Technical & Accessibility

### 6.1 Accessibility Audit
- [ ] Run axe DevTools on all pages
- [ ] Ensure all interactive elements have focus states
- [ ] Verify color contrast ratios (WCAG AA minimum)
- [ ] Add ARIA labels to icon-only buttons
- [ ] Test keyboard navigation flow
- [ ] Add skip-to-content link

### 6.2 Mobile Responsiveness
- [ ] Test all pages on mobile viewport (375px, 414px)
- [ ] Fix any layout breaks or overflow issues
- [ ] Ensure touch targets are minimum 44x44px
- [ ] Optimize hero text sizing for mobile
- [ ] Test hamburger menu functionality (if implemented)

### 6.3 Performance Optimization
- [ ] Run Lighthouse audit on all pages
- [ ] Optimize image loading (lazy load below fold)
- [ ] Minimize JavaScript bundle size
- [ ] Add preload hints for critical assets
- [ ] Implement service worker for offline support (optional)

### 6.4 SEO Enhancements
- [ ] Add unique meta descriptions to all pages
- [ ] Implement Open Graph tags for social sharing
- [ ] Add structured data (Organization, Product schema)
- [ ] Create sitemap.xml
- [ ] Add robots.txt

---

## Phase 7: Advanced Features (Nice-to-Have)

### 7.1 Interactive Demo
- [ ] Build interactive product tour component
- [ ] Add step-by-step walkthrough with tooltips
- [ ] Include "Try It Yourself" sandbox mode
- [ ] Add progress indicator for demo steps

### 7.2 Video Integration
- [ ] Record or create product demo video
- [ ] Add video player component with custom controls
- [ ] Embed on homepage hero or demos page
- [ ] Add video thumbnails with play button overlay

### 7.3 Newsletter Signup
- [ ] Create newsletter signup component
- [ ] Add to footer or as modal popup
- [ ] Integrate with email service (placeholder)
- [ ] Add privacy policy link and consent checkbox

### 7.4 Dark/Light Mode Toggle
- [ ] Implement theme switcher component
- [ ] Create light mode color palette
- [ ] Add theme persistence (localStorage)
- [ ] Ensure all components work in both modes

### 7.5 Search Functionality
- [ ] Add global search component to header
- [ ] Implement search across pages, docs, blog
- [ ] Add keyboard shortcut (Cmd/Ctrl + K)
- [ ] Design search results page

---

## Progress Tracking

**Phase 1:** 5/5 tasks complete (100%) ✅  
**Phase 2:** 5/5 tasks complete (100%) ✅  
**Phase 3:** 4/4 tasks complete (100%) ✅  
**Phase 4:** 0/4 tasks complete (0%)  
**Phase 5:** 0/2 tasks complete (0%)  
**Phase 6:** 0/4 tasks complete (0%)  
**Phase 7:** 0/5 tasks complete (0%)  

**Overall Progress:** 14/29 major tasks complete (48%)

---

## Notes

- Update this file after completing each task
- Mark tasks with `[x]` when complete
- Add implementation notes or blockers as needed
- Estimated time: 2-3 weeks for Phases 1-6, 1 week for Phase 7
- Prioritize user-facing features over internal tooling

---

**Last Updated:** 2025-11-07
