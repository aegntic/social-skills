# Soft Industrial Clay — DESIGN.md

> Portable design system. Soft claymation tactility + industrial mechanical intent + cool geometric glassmorphism.
> Softness is the surface treatment. Industrial structure is the underlying logic.

---

## 1. Theme Identity

**Name:** Soft Industrial Clay  
**Version:** v1  
**Core Tension:** Soft plasticine surface × Industrial mechanical form × Cool navy-cyan temperature

Never purely cute. Never purely hard.

---

## 2. Color Tokens

```css
:root {
  /* Backgrounds */
  --bg-primary:        #F0F5FA;
  --bg-secondary:      #E4EDF7;
  --surface:           #FFFFFF;
  --surface-elevated:  #F7FBFF;

  /* Core Palette */
  --navy-900:          #0A1628;
  --navy-800:          #0F1F35;
  --navy-700:          #162A45;

  --cyan-500:          #00D4FF;
  --cyan-400:          #33DDFF;
  --cyan-300:          #66E6FF;

  --teal-500:          #00C4B4;
  --teal-400:          #26D4C4;

  --indigo-400:        #7B8CFF;
  --indigo-300:        #A3B0FF;

  /* Text */
  --text-primary:      #0A1628;
  --text-secondary:    #3A4F6A;
  --text-tertiary:     #6B7F99;
}
```

**Rules**
- Never introduce warm browns, oranges, beige, or pure black.
- Cyan and teal are accent/energy colors only.
- Navy carries structure and weight.

---

## 3. Radius Scale

```css
--radius-sm:   12px;
--radius-md:   16px;
--radius-lg:   24px;
--radius-xl:   32px;
--radius-full: 9999px;
```

Default philosophy: large soft radii (24–32px). Sharp geometry is forbidden on primary surfaces.

---

## 4. Shadow System

```css
--shadow-sm:   0 2px 8px -2px rgba(10, 22, 40, 0.06),
               0 1px 3px rgba(0, 212, 255, 0.04);

--shadow-md:   0 8px 24px -6px rgba(10, 22, 40, 0.08),
               0 4px 12px -4px rgba(0, 212, 255, 0.06);

--shadow-lg:   0 16px 40px -10px rgba(10, 22, 40, 0.12),
               0 8px 20px -6px rgba(0, 196, 180, 0.08);

--shadow-clay: 0 12px 32px -8px rgba(10, 22, 40, 0.12),
               0 4px 16px -4px rgba(0, 196, 180, 0.08);
```

- Blur values are intentionally large (8–40px) for soft diffusion.
- Always include a secondary cyan/teal-tinted layer.
- Never use pure black or hard 0-blur shadows.

---

## 5. Form & Material Language

- All primary forms are rounded and soft.
- Industrial intent is expressed through segmentation, panel lines, mechanical proportions, and purposeful asymmetry — never through sharp edges.
- Surface: matte-to-satin plasticine / soft elastomer feel.
- Visible but subtle texture (gentle fingerprints, soft tool marks).
- Glassmorphism allowed only as translucent cyan-indigo panels with low roughness.

---

## 6. Character Rules

### Primary Character — Camera-Head Mech Robot
- Always rendered in soft clay style.
- Oversized rectangular camera housing head.
- Large central circular glass lens.
- Multiple small sensor dots.
- Thick rounded mechanical arms and short dense legs.
- Body: black-to-cyan gradient clay with teal accents.
- Compact bipedal proportions, low center of gravity.

### Human Figures
- When present, always wear a grey / white / black leather patchwork hoodie.
- Also sculpted in matching soft clay style.

No alternative robot designs are permitted.

---

## 7. Typography

- Rounded geometric sans (Nunito, Plus Jakarta Sans, Satoshi, or equivalent).
- Prefer Medium (500) and SemiBold (600).
- Generous line-height.
- Slightly negative tracking on large display text.
- Avoid Thin and Black weights as primary.

---

## 8. Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (soft, slightly elastic)
- Duration: 280–400ms for most interactions
- Prefer scale + opacity + soft shadow changes
- Motion should feel like pressing into clay

---

## 9. Absolute Constraints

- No warm color drift
- No sharp primary edges
- No hard-surface metal or glossy plastic as dominant material
- No alternative robot designs
- Human figures always in the specified hoodie when shown
- Softness is surface treatment; industrial structure is never abandoned

---

## 10. Application Guide

| Domain              | How Soft Industrial Clay Manifests                                      |
|---------------------|-------------------------------------------------------------------------|
| UI / Web / App      | Large radii, soft shadows, cool palette, camera-head as empty-state     |
| 3D / Product Design | Soft elastomer or clay-like surfaces on industrial forms                |
| Soft Robotics Viz   | PneuNets and actuators rendered with soft clay tactility + cool palette |
| Branding / Print    | Navy + cyan system, soft mechanical iconography                         |
| Illustration        | Claymation rendering of mechanical subjects                             |
| Physical Objects    | Matte soft-touch materials, rounded industrial geometry                 |

---

## 11. Master Generation Prompt

**Positive**
```
Soft Industrial Clay theme, soft claymation 3D render, everything sculpted from rounded tactile plasticine clay with visible soft surface texture, gentle fingerprints and subtle tool marks, matte-to-satin finish, strict color palette: deep navy #0A1628, electric cyan #00D4FF, teal #00C4B4, soft indigo, pure cool white background, muted cyan-blue soft shadows only, large soft radii, no sharp edges, no hard metal, no glossy plastic, primary character is the Soft Industrial Clay camera-head mech robot: compact bipedal form, oversized rectangular camera housing head with large central circular glass lens, multiple small sensor dots, thick rounded mechanical arms and short dense legs made of soft clay segments, body in black-to-cyan gradient clay with teal accents, human figure when present always wears a grey / white / black leather patchwork hoodie and is also sculpted in matching soft clay, soft layered shadows with large blur, cool diffused studio lighting, clean composition, pure Soft Industrial Clay aesthetic
```

**Negative**
```
hard surface, metal, sharp edges, glossy plastic, realistic materials, warm colors, brown, beige, orange, pure black background, neon, cartoon 2D, low detail, deformed, human without the leather patchwork hoodie, alternative robot designs, thin limbs, elegant proportions, high contrast hard shadows
```

---

**This document is the single source of truth.**  
Any new asset must pass all sections before it is considered on-theme.
```
