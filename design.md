# Design System — casantiago.com

Reference document for UI consistency across all sections and components.

---

## Colors

| Role             | Tailwind token         | Hex       |
|------------------|------------------------|-----------|
| Page background  | `bg-slate-50`          | #f8fafc   |
| Card background  | `bg-white`             | #ffffff   |
| Heading primary  | `text-slate-800`       | #1e293b   |
| Body text        | `text-slate-500`       | #64748b   |
| Meta / subtitle  | `text-slate-400`       | #94a3b8   |
| Card border      | `border-slate-200`     | #e2e8f0   |
| Accent (primary) | `text-indigo-600` / `bg-indigo-600` | #4f46e5 |
| Accent hover     | `hover:text-indigo-800` / `hover:bg-indigo-700` | |
| Secondary link   | `text-slate-500` → `hover:text-slate-800` | |
| Tag background   | `bg-slate-100`         | #f1f5f9   |
| Tag border       | `border-slate-200`     | #e2e8f0   |
| Tag text         | `text-slate-500`       | #64748b   |

> **Accent color** is `indigo-600` — used for primary buttons, CTAs, active links and focus rings.  
> The legacy `#1da1f3` blue (`.bg-accent` / `.color-accent`) is used only in the hero section.

---

## Typography

| Element          | Classes                                            |
|------------------|----------------------------------------------------|
| Section title    | `font-bold text-slate-800 text-3xl`                |
| Section subtitle | `text-slate-400 mt-2 text-sm`                      |
| Card title       | `font-bold text-base text-slate-800 leading-snug`  |
| Body / description | `text-sm text-slate-500 leading-relaxed`         |
| Label            | `text-sm font-medium text-slate-700`               |
| Small meta text  | `text-xs text-slate-400`                           |
| Accent link      | `text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors` |

---

## Section Layout

Every section follows this structure:

```jsx
<section id="section-name" className="scroll-m-14 w-full bg-slate-50 pb-20">
  {/* Header */}
  <div className="text-center pt-12 md:pt-16">
    <a href="#section-name">
      <h3 className="font-bold text-slate-800 text-3xl">Section Title</h3>
    </a>
    <p className="text-slate-400 mt-2 text-sm">Short subtitle</p>
  </div>

  {/* Content */}
  <div className="max-w-5xl mx-auto px-4 md:px-8 mt-10">
    {/* ... */}
  </div>
</section>
```

- Background alternates between `bg-slate-50` and `bg-white` between consecutive sections.
- Narrow content (forms, single-column) uses `max-w-lg`.
- Wide content (grids) uses `max-w-5xl`.
- Horizontal padding: `px-4 md:px-8`.

---

## Cards

```jsx
<div className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
```

| Property   | Value                                  |
|------------|----------------------------------------|
| Border     | `border border-slate-200`              |
| Radius     | `rounded-xl`                           |
| Shadow     | `shadow-sm` → `hover:shadow-lg`        |
| Hover lift | `hover:-translate-y-1`                 |
| Transition | `transition-all duration-300`          |
| Padding    | `p-5` (content area)                   |

**Dividers inside cards:** `border-t border-slate-100 pt-4`

---

## Grid Layout (Projects-style)

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

Responsive breakpoints: 1 col → 2 col (sm) → 3 col (lg).

---

## Buttons

### Primary
```jsx
<button className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
```

### Link-style (inline)
```jsx
<a className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
```

### Secondary link (icon + label)
```jsx
<a className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
```

---

## Form Inputs

```jsx
<input className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors" />
```

- Background: `bg-slate-50`
- Border: `border-slate-200` → `focus:border-indigo-400`
- Focus ring: `focus:ring-2 focus:ring-indigo-100`
- Text: `text-slate-700`
- Placeholder: `placeholder-slate-400`

---

## Tags / Skill Chips

```jsx
<span className="rounded-full px-3 py-1 bg-slate-100 text-xs font-medium text-slate-500 border border-slate-200">
  Tag
</span>
```

---

## Notifications / Banners

```jsx
<div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 flex items-center gap-3">
  <span className="text-xl">📨</span>
  <p className="text-slate-700 font-medium text-sm">...</p>
</div>
```

Use `indigo-50` / `indigo-100` for informational; adapt color for warnings or errors.

---

## Spacing Tokens

| Purpose                       | Classes                    |
|-------------------------------|----------------------------|
| Section top padding           | `pt-12 md:pt-16`           |
| Section bottom padding        | `pb-20`                    |
| Content gap after header      | `mt-10`                    |
| Gap between form fields       | `gap-4` / `gap-1.5`        |
| Gap between cards             | `gap-6`                    |
| Gap between inline items      | `gap-3`                    |

---

## Transitions

- Color changes: `transition-colors`
- Cards / layout: `transition-all duration-300`

---

## External Links

Always include `target="_blank" rel="noopener noreferrer"` on links that open in a new tab.
