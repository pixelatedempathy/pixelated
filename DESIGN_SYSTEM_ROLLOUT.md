# Design System Rollout Plan

**Created:** 2025-11-10  
**Status:** In Progress (14% Complete)  
**Priority:** High

---

## Overview

Systematic rollout of unified design system across all pages and components, incorporating:
- **Mizu** (20%): Generous spacing, fluid animations
- **Flabbergasted** (20%): Asymmetric layouts, bold personality
- **Antfu** (20%): Minimal aesthetic, clean borders
- **AstroMaxx** (20%): Glassmorphism, dark mode

---

## Phase 1: Core Components ✅ COMPLETE

### 1.1 Base Layout Components
- [x] PageHero.astro - Consistent hero sections
- [x] ContentSection.astro - Section spacing and layout
- [x] FeatureCard.astro - Feature/benefit cards
- [x] Document component APIs and usage

### 1.2 Foundation Pages
- [x] Homepage (index.astro) - Custom hero with all themes
- [x] About page (about.astro) - PageHero + ContentSection
- [x] Features page (features.astro) - Offset cards
- [x] Contact page (contact.astro) - Glass form
- [x] 404 page (404.astro) - Centered layout

---

## Phase 2: Additional Components (5/14 Complete)

### 2.1 Card Components
- [x] Create StatsGrid.astro component
  - [x] Animated counter integration
  - [x] Responsive grid layout
  - [x] Color accent options
  - [x] Icon support
- [x] Create TestimonialCard.astro component
  - [x] Quote styling
  - [x] Author info layout
  - [x] Photo/logo support
  - [x] Rating display option
- [x] Create PricingCard.astro component
  - [x] Tier highlighting
  - [x] Feature list styling
  - [x] CTA button integration
  - [x] Badge for "Popular" tier
- [x] Create BlogCard.astro component
  - [x] Image thumbnail
  - [x] Category tags
  - [x] Read time display
  - [x] Hover effects
- [x] Create DashboardCard.astro component
  - [x] Metric display
  - [x] Chart integration placeholder
  - [x] Status indicators
  - [x] Action buttons

### 2.2 Form Components
- [ ] Create FormInput.astro component
  - [ ] Label styling
  - [ ] Error state
  - [ ] Success state
  - [ ] Helper text
- [ ] Create FormTextarea.astro component
  - [ ] Consistent with FormInput
  - [ ] Auto-resize option
  - [ ] Character counter
- [ ] Create FormSelect.astro component
  - [ ] Custom dropdown styling
  - [ ] Search functionality
  - [ ] Multi-select option
- [ ] Create FormCheckbox.astro component
  - [ ] Custom checkbox design
  - [ ] Label positioning
  - [ ] Indeterminate state

### 2.3 Navigation Components
- [ ] Create Breadcrumbs.astro component
  - [ ] Separator styling
  - [ ] Active state
  - [ ] Truncation for long paths
- [ ] Create Pagination.astro component
  - [ ] Page number display
  - [ ] Previous/Next buttons
  - [ ] Jump to page input
- [ ] Create Tabs.astro component
  - [ ] Active tab styling
  - [ ] Underline animation
  - [ ] Icon support

---

## Phase 3: Public Pages (5/15 Complete)

### 3.1 Marketing Pages
- [x] Homepage (index.astro)
- [x] About (about.astro)
- [x] Features (features.astro)
- [x] Contact (contact.astro)
- [ ] Pricing (pricing.astro)
  - [ ] Apply PricingCard component
  - [ ] Update hero section
  - [ ] Add FAQ section with design system
  - [ ] Update CTA section
- [ ] Team (team.astro)
  - [ ] Apply PageHero
  - [ ] Create team member cards with glassmorphism
  - [ ] Add department sections
  - [ ] Update "Join Us" CTA
- [ ] Careers (careers.astro)
  - [ ] Apply PageHero
  - [ ] Update job listing cards
  - [ ] Add company culture section
  - [ ] Update application CTA
- [ ] Case Studies (case-studies.astro)
  - [ ] Apply PageHero
  - [ ] Update case study cards
  - [ ] Add metrics display with StatsGrid
  - [ ] Update download CTA

### 3.2 Product Pages
- [ ] Demos (demos.astro)
  - [ ] Apply PageHero
  - [ ] Update demo scenario cards
  - [ ] Add video player styling
  - [ ] Update schedule demo CTA
- [ ] Demo Hub (demo-hub.astro)
  - [ ] Apply PageHero
  - [ ] Create demo category cards
  - [ ] Add filter/search UI
  - [ ] Update navigation
- [ ] Documentation (docs/index.astro)
  - [ ] Apply PageHero
  - [ ] Update sidebar navigation
  - [ ] Style code blocks consistently
  - [ ] Add search UI

### 3.3 Support Pages
- [ ] Support (support.astro)
  - [ ] Apply PageHero
  - [ ] Update FAQ accordion styling
  - [ ] Style support ticket form
  - [ ] Add contact options cards
- [ ] Status (status.astro)
  - [ ] Apply PageHero
  - [ ] Update service status cards
  - [ ] Style incident timeline
  - [ ] Add subscription form

### 3.4 Content Pages
- [ ] Blog Index (blog/index.astro)
  - [ ] Apply PageHero
  - [ ] Use BlogCard component
  - [ ] Update category filters
  - [ ] Add Pagination component
- [ ] Blog Post Template (blog/[...slug].astro)
  - [ ] Apply PageHero for post header
  - [ ] Style article content
  - [ ] Add author card
  - [ ] Update related posts section
- [x] 404 Page (404.astro)

---

## Phase 4: Authentication Pages (0/5 Complete)

### 4.1 Auth Flow
- [ ] Login (login.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Style form container with glassmorphism
  - [ ] Update social login buttons
- [ ] Register (register.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Add password strength indicator
  - [ ] Update terms acceptance checkbox
- [ ] Forgot Password (forgot-password.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput component
  - [ ] Style success message
  - [ ] Update back to login link
- [ ] Reset Password (reset-password.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Add password requirements display
  - [ ] Update success state
- [ ] Email Verification (verify-email.astro)
  - [ ] Apply PageHero
  - [ ] Style verification status
  - [ ] Update resend button
  - [ ] Add success/error states

---

## Phase 5: Dashboard Pages (0/12 Complete)

### 5.1 Main Dashboard
- [ ] Dashboard Home (dashboard/index.astro)
  - [ ] Use DashboardCard components
  - [ ] Apply StatsGrid for metrics
  - [ ] Update chart containers
  - [ ] Style quick actions section

### 5.2 Training Pages
- [ ] Training Sessions (dashboard/training/index.astro)
  - [ ] Apply PageHero
  - [ ] Update session cards
  - [ ] Style filters and search
  - [ ] Add Pagination
- [ ] Session Detail (dashboard/training/[id].astro)
  - [ ] Apply PageHero
  - [ ] Style session timeline
  - [ ] Update feedback cards
  - [ ] Add action buttons
- [ ] Training History (dashboard/training/history.astro)
  - [ ] Apply PageHero
  - [ ] Create history timeline component
  - [ ] Style metric cards
  - [ ] Add export button

### 5.3 Analytics Pages
- [ ] Analytics Overview (dashboard/analytics/index.astro)
  - [ ] Use DashboardCard components
  - [ ] Apply StatsGrid
  - [ ] Style chart containers
  - [ ] Update date range picker
- [ ] Performance Metrics (dashboard/analytics/performance.astro)
  - [ ] Apply PageHero
  - [ ] Update metric cards
  - [ ] Style comparison charts
  - [ ] Add filter controls
- [ ] Reports (dashboard/analytics/reports.astro)
  - [ ] Apply PageHero
  - [ ] Style report cards
  - [ ] Update download buttons
  - [ ] Add schedule report form

### 5.4 Settings Pages
- [ ] Profile Settings (dashboard/settings/profile.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Style avatar upload
  - [ ] Update save button
- [ ] Account Settings (dashboard/settings/account.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Style security section
  - [ ] Update danger zone styling
- [ ] Notification Settings (dashboard/settings/notifications.astro)
  - [ ] Apply PageHero
  - [ ] Use FormCheckbox components
  - [ ] Style preference groups
  - [ ] Update save button
- [ ] Billing (dashboard/settings/billing.astro)
  - [ ] Apply PageHero
  - [ ] Use PricingCard for plan display
  - [ ] Style payment method cards
  - [ ] Update invoice list
- [ ] Team Management (dashboard/settings/team.astro)
  - [ ] Apply PageHero
  - [ ] Style team member cards
  - [ ] Update invite form
  - [ ] Add role management UI
- [ ] API Keys (dashboard/settings/api.astro)
  - [ ] Apply PageHero
  - [ ] Style API key cards
  - [ ] Update create key form
  - [ ] Add usage metrics display

---

## Phase 6: Admin Pages (0/8 Complete)

### 6.1 Admin Dashboard
- [ ] Admin Home (admin/index.astro)
  - [ ] Use DashboardCard components
  - [ ] Apply StatsGrid for system metrics
  - [ ] Style alert cards
  - [ ] Update quick actions

### 6.2 User Management
- [ ] Users List (admin/users/index.astro)
  - [ ] Apply PageHero
  - [ ] Style user table/cards
  - [ ] Update filter controls
  - [ ] Add Pagination
- [ ] User Detail (admin/users/[id].astro)
  - [ ] Apply PageHero
  - [ ] Style user info cards
  - [ ] Update activity timeline
  - [ ] Add action buttons

### 6.3 Content Management
- [ ] Content Overview (admin/content/index.astro)
  - [ ] Apply PageHero
  - [ ] Style content cards
  - [ ] Update filter/search
  - [ ] Add bulk actions
- [ ] Content Editor (admin/content/[id].astro)
  - [ ] Apply PageHero
  - [ ] Style editor interface
  - [ ] Update preview pane
  - [ ] Add publish controls

### 6.4 System Management
- [ ] System Settings (admin/settings/index.astro)
  - [ ] Apply PageHero
  - [ ] Use FormInput components
  - [ ] Style setting groups
  - [ ] Update save buttons
- [ ] Logs (admin/logs/index.astro)
  - [ ] Apply PageHero
  - [ ] Style log entries
  - [ ] Update filter controls
  - [ ] Add export button
- [ ] Monitoring (admin/monitoring/index.astro)
  - [ ] Apply PageHero
  - [ ] Use DashboardCard for metrics
  - [ ] Style alert cards
  - [ ] Update refresh controls
- [ ] Backups (admin/backups/index.astro)
  - [ ] Apply PageHero
  - [ ] Style backup cards
  - [ ] Update create backup form
  - [ ] Add restore controls

---

## Phase 7: Consistency & Polish (0/10 Complete)

### 7.1 Component Audit
- [ ] Audit all buttons for consistent styling
  - [ ] Primary buttons use gradient
  - [ ] Secondary buttons use outline
  - [ ] Disabled states consistent
  - [ ] Loading states consistent
- [ ] Audit all forms for consistent styling
  - [ ] Input fields use glassmorphism
  - [ ] Error states use red accent
  - [ ] Success states use green accent
  - [ ] Labels positioned consistently
- [ ] Audit all cards for glassmorphism
  - [ ] All cards use backdrop-blur-xl
  - [ ] Border colors consistent (white/10)
  - [ ] Hover effects applied
  - [ ] Shadow depths consistent

### 7.2 Color Consistency
- [ ] Verify primary colors (emerald/cyan) usage
  - [ ] CTAs use gradient
  - [ ] Links use cyan
  - [ ] Success states use emerald
- [ ] Verify accent colors usage
  - [ ] Errors use red/pink
  - [ ] Info uses blue
  - [ ] Warnings use orange
  - [ ] Special features use purple
- [ ] Verify background colors
  - [ ] Main backgrounds use black
  - [ ] Cards use black/40
  - [ ] Overlays use appropriate opacity

### 7.3 Responsive Testing
- [ ] Test all pages on mobile (375px)
  - [ ] Text scales appropriately
  - [ ] Cards stack properly
  - [ ] Navigation works
  - [ ] Forms are usable
- [ ] Test all pages on tablet (768px)
  - [ ] Grid layouts adjust
  - [ ] Spacing is appropriate
  - [ ] Images scale properly
- [ ] Test all pages on desktop (1440px+)
  - [ ] Max-width containers work
  - [ ] Content doesn't stretch too wide
  - [ ] Spacing is generous

### 7.4 Animation Consistency
- [ ] Verify fade-in animations
  - [ ] All sections fade in on scroll
  - [ ] Timing is consistent (0.8s)
  - [ ] Easing is smooth
- [ ] Verify hover effects
  - [ ] Cards lift on hover (-translate-y-2)
  - [ ] Buttons scale or glow
  - [ ] Transitions are smooth (300ms)

---

## Phase 8: Documentation (0/5 Complete)

### 8.1 Component Documentation
- [ ] Document all components in Storybook or similar
  - [ ] PageHero examples
  - [ ] ContentSection examples
  - [ ] FeatureCard examples
  - [ ] All new components
- [ ] Create component usage guidelines
  - [ ] When to use each component
  - [ ] Prop options and defaults
  - [ ] Common patterns
  - [ ] Anti-patterns to avoid

### 8.2 Design System Guide
- [ ] Create comprehensive design system documentation
  - [ ] Color palette with hex codes
  - [ ] Typography scale and usage
  - [ ] Spacing system
  - [ ] Animation guidelines
- [ ] Document theme influences
  - [ ] Mizu elements and usage
  - [ ] Flabbergasted elements and usage
  - [ ] Antfu elements and usage
  - [ ] AstroMaxx elements and usage

### 8.3 Developer Guidelines
- [ ] Create contribution guidelines
  - [ ] How to add new components
  - [ ] How to update existing pages
  - [ ] Code review checklist
  - [ ] Testing requirements
- [ ] Create migration guide
  - [ ] How to migrate old pages
  - [ ] Common pitfalls
  - [ ] Before/after examples

---

## Progress Tracking

**Phase 1:** 5/5 tasks complete (100%) ✅  
**Phase 2:** 5/14 tasks complete (36%)  
**Phase 3:** 5/15 tasks complete (33%)  
**Phase 4:** 0/5 tasks complete (0%)  
**Phase 5:** 0/12 tasks complete (0%)  
**Phase 6:** 0/8 tasks complete (0%)  
**Phase 7:** 0/10 tasks complete (0%)  
**Phase 8:** 0/5 tasks complete (0%)  

**Overall Progress:** 15/74 major tasks complete (20%)

---

## Component Reference

### PageHero.astro
```astro
<PageHero
  badge="Optional Badge"
  title="Page Title"
  subtitle="Page description"
  gradient={true}
/>
```

### ContentSection.astro
```astro
<ContentSection diagonal={true}>
  <!-- Content -->
</ContentSection>
```

### FeatureCard.astro
```astro
<FeatureCard
  title="Feature"
  description="Description"
  color="cyan"
  offset="up"
  icon="<svg>...</svg>"
>
  <!-- Optional slot content -->
</FeatureCard>
```

---

## Design Tokens

### Colors
```css
/* Primary */
--emerald-500: #10b981
--cyan-500: #06b6d4

/* Accents */
--red-500: #ef4444
--pink-500: #ec4899
--blue-500: #3b82f6
--purple-500: #a855f7
--orange-500: #f59e0b

/* Backgrounds */
--black: #000000
--black-40: rgba(0,0,0,0.4)
--white-5: rgba(255,255,255,0.05)
--white-10: rgba(255,255,255,0.1)
```

### Typography
```css
/* Scale */
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
--text-6xl: 3.75rem (60px)
```

### Spacing
```css
/* Section Padding */
--py-16: 4rem (64px)
--py-24: 6rem (96px)
--py-32: 8rem (128px)

/* Container */
--max-w-4xl: 56rem (896px)
--max-w-5xl: 64rem (1024px)
--max-w-6xl: 72rem (1152px)
```

---

## Notes

- Update this file after completing each task
- Mark tasks with `[x]` when complete
- Add implementation notes or blockers as needed
- Estimated time: 4-6 weeks for full rollout
- Prioritize user-facing pages over admin pages

---

**Last Updated:** 2025-11-10
