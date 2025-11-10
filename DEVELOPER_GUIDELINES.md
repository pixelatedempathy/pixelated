# Developer Guidelines

## Adding New Components

### 1. Create Component File
Place in `/src/components/ui/ComponentName.astro`

### 2. Follow Naming Convention
- PascalCase for component names
- Descriptive, clear names
- Suffix with component type if needed (Card, Button, etc.)

### 3. Use Design Tokens
```astro
---
interface Props {
  title: string
  color?: 'emerald' | 'cyan' | 'purple'
}

const { title, color = 'emerald' } = Astro.props
---

<div class={`bg-${color}-500/20 border border-${color}-500/30`}>
  {title}
</div>
```

### 4. Add TypeScript Types
Always define Props interface for type safety.

### 5. Include Slots
Allow flexible content composition:
```astro
<div class="card">
  <slot />
</div>
```

## Updating Existing Pages

### Migration Checklist
- [ ] Replace custom hero with `<PageHero>`
- [ ] Wrap sections in `<ContentSection>`
- [ ] Replace custom cards with design system cards
- [ ] Update forms to use `FormInput`, `FormTextarea`, etc.
- [ ] Apply glassmorphism to all cards
- [ ] Ensure consistent button styling
- [ ] Add hover effects
- [ ] Test responsive layout

### Before/After Example

**Before:**
```astro
<section class="py-20">
  <div class="container">
    <h1>Title</h1>
    <p>Description</p>
  </div>
</section>
```

**After:**
```astro
<PageHero
  title="Title"
  subtitle="Description"
  gradient={true}
/>
```

## Code Review Checklist

### Design System Compliance
- [ ] Uses PageHero for page headers
- [ ] Wraps content in ContentSection
- [ ] Cards use glassmorphism pattern
- [ ] Buttons follow hierarchy (gradient primary, outline secondary)
- [ ] Forms use FormInput components
- [ ] Colors match design tokens
- [ ] Spacing uses system values
- [ ] Hover effects applied

### Accessibility
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

### Performance
- [ ] Images lazy loaded
- [ ] No unnecessary re-renders
- [ ] Proper code splitting
- [ ] Minimal bundle size

### Responsive Design
- [ ] Mobile (375px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1440px+) tested
- [ ] Touch targets 44x44px minimum

## Common Patterns

### Page Structure
```astro
<Layout title="Page Title">
  <PageHero
    badge="Badge"
    title="Title"
    subtitle="Subtitle"
    gradient={true}
  />
  
  <ContentSection>
    <!-- Main content -->
  </ContentSection>
  
  <ContentSection diagonal={true}>
    <!-- Alternate section -->
  </ContentSection>
</Layout>
```

### Dashboard Page
```astro
<DashboardLayout title="Dashboard Title">
  <div class="space-y-8">
    <h1 class="text-3xl font-bold text-white">Title</h1>
    
    <StatsGrid stats={stats} columns={4} />
    
    <DashboardCard title="Card Title">
      <!-- Content -->
    </DashboardCard>
  </div>
</DashboardLayout>
```

### Form Page
```astro
<ContentSection>
  <div class="max-w-2xl mx-auto">
    <div class="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <form class="space-y-6">
        <FormInput label="Name" name="name" type="text" />
        <FormTextarea label="Message" name="message" />
        <button type="submit" class="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold rounded-lg">
          Submit
        </button>
      </form>
    </div>
  </div>
</ContentSection>
```

## Testing Requirements

### Unit Tests
- Test component props
- Test slot content
- Test conditional rendering

### Integration Tests
- Test page navigation
- Test form submissions
- Test user interactions

### Visual Regression
- Screenshot key pages
- Compare against baseline
- Flag visual changes

## Anti-Patterns to Avoid

❌ **Don't:**
- Mix custom styling with design system
- Use inline styles
- Hardcode colors outside design tokens
- Skip responsive testing
- Ignore accessibility
- Create one-off components
- Use inconsistent spacing

✅ **Do:**
- Use design system components
- Follow spacing system
- Use design tokens
- Test all breakpoints
- Include ARIA labels
- Reuse existing components
- Maintain consistency
