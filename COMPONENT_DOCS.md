# Component Documentation

## Core Components

### PageHero
Hero section for page headers.

```astro
<PageHero
  badge="Optional Badge"
  title="Page Title"
  subtitle="Page description"
  gradient={true}
/>
```

### ContentSection
Wrapper for page sections with consistent spacing.

```astro
<ContentSection diagonal={true}>
  <!-- Content -->
</ContentSection>
```

### DashboardCard
Card component for dashboard layouts.

```astro
<DashboardCard 
  title="Card Title"
  action={{ label: 'View All', href: '/path' }}
>
  <!-- Content -->
</DashboardCard>
```

### StatsGrid
Grid layout for displaying statistics.

```astro
<StatsGrid 
  stats={[
    { label: 'Metric', value: '100', color: 'emerald' }
  ]} 
  columns={4} 
/>
```

### Form Components

**FormInput:**
```astro
<FormInput
  label="Label"
  name="fieldName"
  type="text"
  placeholder="Placeholder"
  required={true}
/>
```

**FormTextarea:**
```astro
<FormTextarea
  label="Label"
  name="fieldName"
  rows={6}
/>
```

**FormSelect:**
```astro
<FormSelect
  label="Label"
  name="fieldName"
  options={[
    { value: "1", label: "Option 1" }
  ]}
/>
```

### Navigation Components

**Breadcrumbs:**
```astro
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Current', href: '/current' }
]} />
```

**Pagination:**
```astro
<Pagination
  currentPage={1}
  totalPages={10}
  baseUrl="/blog/page"
/>
```

**Tabs:**
```astro
<Tabs tabs={[
  { label: 'Tab 1', active: true },
  { label: 'Tab 2', active: false }
]} />
```

### Card Components

**PricingCard:**
```astro
<PricingCard
  name="Plan Name"
  price="$99"
  period="/month"
  description="Plan description"
  features={['Feature 1', 'Feature 2']}
  cta="Sign Up"
  ctaHref="/signup"
  popular={true}
/>
```

**BlogCard:**
```astro
<BlogCard
  title="Post Title"
  description="Post description"
  image="/image.jpg"
  category="Category"
  readTime="5 min read"
  date="Nov 10, 2024"
  href="/blog/post"
/>
```

## Design Tokens

### Colors
- Primary: `emerald-500`, `cyan-500`
- Accents: `red-500`, `pink-500`, `blue-500`, `purple-500`, `orange-500`
- Backgrounds: `black`, `black/40`, `white/5`, `white/10`

### Typography
- Headings: `text-4xl`, `text-3xl`, `text-2xl`, `text-xl`
- Body: `text-base`, `text-sm`, `text-xs`
- Font weight: `font-bold`, `font-semibold`, `font-medium`

### Spacing
- Section padding: `py-16`, `py-24`, `py-32`
- Container max-width: `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl`
- Gap: `gap-4`, `gap-6`, `gap-8`, `gap-12`

### Effects
- Glassmorphism: `bg-black/40 backdrop-blur-xl border border-white/10`
- Gradient: `bg-gradient-to-r from-emerald-500 to-cyan-500`
- Hover: `hover:border-emerald-500/30 transition-all duration-300`
- Transform: `transform hover:scale-105`
