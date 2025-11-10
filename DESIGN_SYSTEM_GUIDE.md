# Design System Guide

## Overview

The Pixelated Empathy design system combines elements from four design philosophies:
- **Mizu (20%)**: Generous spacing, fluid animations
- **Flabbergasted (20%)**: Asymmetric layouts, bold personality
- **Antfu (20%)**: Minimal aesthetic, clean borders
- **AstroMaxx (40%)**: Glassmorphism, dark mode focus

## Color Palette

### Primary Colors
- **Emerald**: `#10b981` - Success, primary actions
- **Cyan**: `#06b6d4` - Links, secondary actions

### Accent Colors
- **Red**: `#ef4444` - Errors, critical alerts
- **Pink**: `#ec4899` - Special features
- **Blue**: `#3b82f6` - Information
- **Purple**: `#a855f7` - Premium features
- **Orange**: `#f59e0b` - Warnings

### Backgrounds
- **Black**: `#000000` - Main background
- **Black/40**: `rgba(0,0,0,0.4)` - Card backgrounds
- **White/5**: `rgba(255,255,255,0.05)` - Subtle overlays
- **White/10**: `rgba(255,255,255,0.1)` - Borders

## Typography

### Font Scale
```
text-xs:   0.75rem (12px)
text-sm:   0.875rem (14px)
text-base: 1rem (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem (36px)
text-5xl:  3rem (48px)
text-6xl:  3.75rem (60px)
```

### Font Weights
- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

## Spacing System

### Section Padding
- Small: `py-16` (4rem / 64px)
- Medium: `py-24` (6rem / 96px)
- Large: `py-32` (8rem / 128px)

### Container Widths
- `max-w-4xl`: 56rem (896px)
- `max-w-5xl`: 64rem (1024px)
- `max-w-6xl`: 72rem (1152px)
- `max-w-7xl`: 80rem (1280px)

### Gap Spacing
- `gap-4`: 1rem (16px)
- `gap-6`: 1.5rem (24px)
- `gap-8`: 2rem (32px)
- `gap-12`: 3rem (48px)

## Animation Guidelines

### Transitions
- Default: `transition-all duration-300`
- Fast: `transition-all duration-200`
- Slow: `transition-all duration-500`

### Hover Effects
- Cards: `hover:border-emerald-500/30`
- Buttons: `hover:scale-105`
- Links: `hover:text-emerald-300`

### Fade-in
- Timing: 0.8s
- Easing: ease-out

## Component Patterns

### Glassmorphism Cards
```css
bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl
```

### Gradient Buttons
```css
bg-gradient-to-r from-emerald-500 to-cyan-500
hover:from-emerald-600 hover:to-cyan-600
```

### Status Badges
```css
px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 
rounded-full text-emerald-400 text-xs font-medium
```

## Best Practices

1. **Always use glassmorphism** for cards and overlays
2. **Maintain consistent spacing** using the spacing system
3. **Use gradient for primary CTAs** only
4. **Apply hover effects** to all interactive elements
5. **Keep animations smooth** with consistent timing
6. **Use semantic colors** (emerald for success, red for errors)
7. **Ensure responsive layouts** with proper grid breakpoints
8. **Add proper focus states** for accessibility

## Theme Influences

### Mizu Elements
- Generous whitespace
- Fluid animations
- Soft transitions

### Flabbergasted Elements
- Asymmetric card layouts
- Bold typography
- Personality in micro-interactions

### Antfu Elements
- Clean borders
- Minimal aesthetic
- Subtle shadows

### AstroMaxx Elements (Primary)
- Glassmorphism throughout
- Dark mode optimized
- Backdrop blur effects
- Gradient accents
