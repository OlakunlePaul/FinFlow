# Background Components Documentation

## Overview
FinFlow includes several custom background components for creating engaging visual effects. These components are designed to be performant, accessible, and customizable.

---

## Available Background Components

### 1. **BackgroundBeams** (`components/ui/background-beams.tsx`)

**Description:** Animated SVG beam paths that create subtle flowing lines across the background.

**Props:**
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { BackgroundBeams } from "@/components/ui/background-beams"

<BackgroundBeams className="opacity-10" />
```

**Features:**
- 10 animated SVG beam paths
- Gradient colors using primary and accent CSS variables
- Low opacity (0.08) for subtle effect
- CSS animation: `animate-beam-path`
- Pointer-events-none for performance

**Best For:**
- Hero sections
- Landing pages
- Background decoration

---

### 2. **ParticlesBackground** (`components/ui/particles-background.tsx`)

**Description:** Interactive canvas-based particle system that responds to mouse movement.

**Props:**
- `className?: string` - Additional CSS classes
- `quantity?: number` - Number of particles (default: 30)
- `staticity?: number` - Particle resistance to movement (default: 50)
- `ease?: number` - Animation smoothness (default: 50)
- `size?: number` - Particle size (default: 0.4)
- `refresh?: boolean` - Force refresh particles
- `color?: string` - Particle color (default: "rgba(255, 255, 255, 0.1)")

**Usage:**
```tsx
import { ParticlesBackground } from "@/components/ui/particles-background"

<ParticlesBackground
  quantity={25}
  color="rgba(255, 255, 255, 0.1)"
  className="opacity-20"
/>
```

**Features:**
- Canvas-based rendering for performance
- Mouse interaction with magnetism effect
- Dynamic particle generation
- Edge detection for opacity fade
- Responsive to window resize
- Hardware-accelerated animations

**Best For:**
- Interactive backgrounds
- Hero sections
- Dashboard backgrounds

---

### 3. **FloatingOrb** (`components/ui/floating-orb.tsx`)

**Description:** A large blurred orb that follows mouse movement with spring physics.

**Props:**
- `className?: string` - Additional CSS classes
- `size?: number` - Orb size in pixels (default: 600)
- `blur?: number` - Blur radius (default: 100)
- `opacity?: number` - Orb opacity (default: 0.15)

**Usage:**
```tsx
import { FloatingOrb } from "@/components/ui/floating-orb"

<FloatingOrb
  size={800}
  blur={120}
  opacity={0.15}
/>
```

**Features:**
- Framer Motion spring physics
- Smooth mouse following (30% offset)
- Radial gradient (blue to purple)
- Fixed positioning
- Low opacity for subtle effect

**Best For:**
- Hero sections
- Landing pages
- Ambient background effects

---

### 4. **Meteors** (`components/ui/meteors.tsx`)

**Description:** Animated meteor streaks falling from top to bottom.

**Props:**
- `className?: string` - Additional CSS classes
- `number?: number` - Number of meteors (default: 20)

**Usage:**
```tsx
import { Meteors } from "@/components/ui/meteors"

<Meteors number={10} className="opacity-30" />
```

**Features:**
- Random positioning and timing
- CSS animation: `animate-meteor-effect`
- Gradient colors
- Pointer-events-none

**Best For:**
- Empty states
- Loading states
- Decorative backgrounds

---

## Shadcn UI Background Components

Shadcn UI doesn't include background components in the core library, but there are community components available:

### Available from Shadcn Community:

1. **Aurora Background** - Northern lights effect with flowing gradients
2. **Waves Background** - Interactive fluid waves responding to cursor
3. **Background Boxes** - Isometric grid with hover effects
4. **Grid Pattern** - Dot grid background pattern

### Installation:

You can add these via shadcn CLI:
```bash
npx shadcn@latest add [component-name]
```

Or manually from:
- [ui.shadcn.com](https://ui.shadcn.com)
- [reactbits.dev](https://reactbits.dev)

---

## Usage Examples

### Combined Background Effects

```tsx
<div className="relative min-h-screen">
  {/* Subtle orb for ambient lighting */}
  <FloatingOrb size={800} blur={120} opacity={0.1} />
  
  {/* Animated beams */}
  <BackgroundBeams className="opacity-5" />
  
  {/* Interactive particles */}
  <ParticlesBackground
    quantity={20}
    color="rgba(59, 130, 246, 0.1)"
    className="opacity-30"
  />
  
  {/* Your content */}
  <div className="relative z-10">
    {/* Content here */}
  </div>
</div>
```

### Performance Considerations

1. **Limit quantity:** Use fewer particles/effects for better performance
2. **Reduce opacity:** Lower opacity reduces visual weight
3. **Use `pointer-events-none`:** Prevents interaction blocking
4. **Canvas vs SVG:** Canvas (Particles) is better for many elements, SVG (Beams) for fewer paths
5. **Z-index management:** Keep backgrounds at lower z-index

---

## Customization

All components accept `className` prop for Tailwind customization:

```tsx
<BackgroundBeams className="opacity-10 blur-sm" />
<ParticlesBackground className="mix-blend-overlay" />
<FloatingOrb className="hidden md:block" />
```

---

## Accessibility

- All background components have `aria-hidden="true"`
- `pointer-events-none` prevents interaction
- Low opacity ensures text readability
- No motion for users with `prefers-reduced-motion`

---

## Animation Performance

- **BackgroundBeams:** CSS animations (GPU accelerated)
- **ParticlesBackground:** Canvas with requestAnimationFrame
- **FloatingOrb:** Framer Motion (optimized spring physics)
- **Meteors:** CSS animations (GPU accelerated)

All components are optimized for 60fps performance.

