# SEO Meta Tag Analyzer - Design Guidelines

## Design Approach: Design System (Material Design + Developer Tools Aesthetic)

**Rationale**: This is a utility-focused, information-dense application where clarity, data hierarchy, and functionality take precedence. Drawing inspiration from Google Search Console, Ahrefs, and social media debugging tools, we prioritize efficient scanning of information over visual storytelling.

## Core Design Principles

1. **Clarity First**: Every element serves to communicate SEO data clearly
2. **Visual Feedback**: Instant color-coded status indicators for tag health
3. **Scannable Hierarchy**: Users should quickly identify issues and successes
4. **Professional Utility**: Clean, trustworthy developer tool aesthetic

## Color Palette

**Dark Mode Primary**:
- Background: 222 15% 12% (deep slate)
- Surface: 222 15% 16% (card backgrounds)
- Surface Elevated: 222 15% 20% (hover states, elevated cards)

**Status Colors**:
- Success/Optimal: 142 70% 45% (vibrant green)
- Warning: 38 92% 50% (amber)
- Error/Missing: 0 72% 51% (red)
- Info: 221 83% 53% (blue)

**Accent**: 221 83% 53% (blue for interactive elements, CTAs)

**Text**:
- Primary: 0 0% 98%
- Secondary: 0 0% 71%
- Muted: 0 0% 50%

## Typography

**Fonts**: 
- Primary: Inter (via Google Fonts) - clean, modern, excellent readability for data
- Monospace: 'Fira Code' or system monospace for tag names and code snippets

**Scale**:
- Hero/H1: text-4xl font-bold (input section, main title)
- H2: text-2xl font-semibold (section headers like "Google Preview")
- H3: text-lg font-semibold (subsection titles)
- Body: text-base (analysis content)
- Small: text-sm (metadata, helper text)
- Tag labels: text-xs font-medium uppercase tracking-wide

## Layout System

**Spacing Units**: Use 4, 6, 8, 12, 16, 24 (translate to p-4, p-6, gap-8, space-y-12, py-16, mb-24)

**Container Structure**:
- Max width: max-w-6xl mx-auto
- Section padding: px-6 py-12 on mobile, px-8 py-16 on desktop
- Card padding: p-6 standard, p-8 for emphasis

**Grid System**:
- Single column on mobile (stack everything)
- 2-column split on desktop: Left (60%) = previews, Right (40%) = analysis/checklist
- 3-column grid for tag status cards (grid-cols-1 md:grid-cols-3 gap-4)

## Component Library

### A. Input Section
- Full-width search bar with rounded-lg border
- Large text input (text-lg p-4)
- Prominent "Analyze" button (bg-blue-600 hover:bg-blue-700)
- Loading state with spinner and progress indication
- Error states with clear messaging

### B. Score Dashboard
- Large circular score indicator (0-100) with color gradient based on performance
- Category breakdown cards (Title, Description, OG Tags, Twitter Cards)
- Each card shows: icon, score, status badge, quick summary
- Cards use surface color with hover elevation effect

### C. Preview Components
**Google Search Result Preview**:
- White card on dark background mimicking actual Google results
- Blue clickable title (text-xl)
- Green URL breadcrumb
- Gray description text (text-sm)
- Character count overlays showing optimal lengths

**Social Media Previews**:
- Facebook card: 1.91:1 aspect ratio preview, like/share buttons
- Twitter card: Summary card with image, title, description
- LinkedIn preview: Professional styling with company context
- Tabbed interface to switch between platforms

### D. Analysis Panel
- Accordion-style expandable sections for each tag category
- Status badges: rounded-full px-3 py-1 with status colors
- Tag presence checklist with checkmarks/x marks
- "Why this matters" explanations in muted text
- Actionable recommendations in highlighted boxes

### E. Tag Detail Cards
- Tag name in monospace font
- Current value display
- Character count with progress bar
- Best practice range indicator
- Missing tag warnings with red left border accent

### F. Navigation
- Sticky header with app name and optional secondary navigation
- Tab navigation for switching between preview types (border-b-2 active indicator)
- Smooth scroll to sections

## Visual Feedback System

**Status Indicators**:
- Success: Green dot or checkmark icon, green text
- Warning: Amber triangle icon, amber text
- Error: Red X icon, red text
- Present but suboptimal: Blue info icon

**Interactive States**:
- Buttons: Slight scale transform on hover (scale-105)
- Cards: Subtle shadow increase on hover
- Inputs: Blue border on focus (ring-2 ring-blue-500)

## Content Strategy

**Information Hierarchy**:
1. URL input (immediate action)
2. Overall score (big picture)
3. Previews (visual validation)
4. Detailed analysis (deep dive)
5. Recommendations (actionable improvements)

**Progressive Disclosure**: Show summary first, expand for details. Don't overwhelm with all data at once.

## Special Considerations

**No Hero Image**: This is a utility app that should feel like a professional tool, not a marketing page

**Responsive Behavior**:
- Mobile: Stack all previews and analysis vertically
- Tablet: Begin side-by-side layout for some sections
- Desktop: Full two-column layout with tabbed previews

**Performance Indicators**: Use skeleton loaders for fetching states, show real-time progress for HTML parsing

**Accessibility**: High contrast status colors, keyboard navigation for tabs, ARIA labels for preview cards

**Dark Mode Only**: Consistent implementation optimized for extended use by developers

This design creates a professional, efficient SEO analysis tool that clearly communicates tag status, provides realistic previews, and guides users toward optimization with a clean, modern aesthetic inspired by leading developer tools.