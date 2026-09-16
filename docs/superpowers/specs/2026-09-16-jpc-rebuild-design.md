# J Prestige Construction (JPC) — Rebuild Design

Date: 2026-09-16. Owner: Romano (JPF). Client: Roman Jano (Romano's father).
Status: approved in chat ("go"), 2026-09-16.

## 1. Purpose
Roman Jano is a general contractor / renovator with 40+ years of experience (est. 1985),
laid off from employment twice. Goal: make J Prestige Construction (JPC) his own money-making
business. This spec covers phase 1: brand, converting website, two sample social posts, and a
Claude-app project kit. Phase 2 (28 more posts) starts after Romano approves the two samples.

## 2. Facts (source of truth — publish nothing beyond this)
- Business name: J Prestige Construction. Short: JPC.
- Owner: Roman Jano. Phone: 289-237-1389. Email: romanojano78@gmail.com
  (the old site's romanjano530@gmail.com is retired; must not appear anywhere).
- Service area: Hamilton, London, Burlington, Oakville, Toronto, GTA (Ontario).
- Confirmed-true claims: est. 1985, 40+ years experience, licensed & insured,
  100% success rate, $50M+ value delivered (all confirmed true by Romano 2026-09-16).
- Services (from old site, all real capabilities): Commercial GC (retail fit-outs, offices,
  industrial), Luxury Residential (custom homes, high-value renovations), Site Management
  (subs, permits/city, scheduling), Design & Build (blueprints to final coat, turnkey).
- Differentiators: detailed digital estimates, daily site supervision, top-tier subcontractor network.
- Process: 01 Consultation (assess site, define scope) → 02 Strategy (permits, materials,
  timeline locked) → 03 Execution (rapid, clean, professional build-out).
- No real project photos exist yet. No word-for-word testimonials exist yet.
- Language: English only. Domain: stays on jpconstruction.pages.dev for now.

## 3. Brand
- Palette: ink `#0B0B0C`, charcoal `#141416`, gold `#C9A227`, gold-light `#E8C766`,
  gold-deep `#8C6D14`, cream `#F4EFE6`, cream-2 `#EAE3D6`, muted `#8A8478`.
- Type: Fraunces (display, high contrast, opsz 144) + Inter (body). Google Fonts.
- Logo: bevelled metallic "JPC" letters in gold on black, same structural language as the
  JPF logo (chrome bevel + glow) but gold instead of blue, with a restrained gold glow.
  Deliverables in `brand/`: `jpc-logo.svg` (mark), `jpc-wordmark.svg` (mark + "J PRESTIGE
  CONSTRUCTION"), PNG @2x on black and on cream, `avatar-1024.png` (square), `favicon.svg`.
- Voice: confident, plain, specific. "What you get, how fast we answer, where we work."
  No "engineer legacies" fluff. Never invent numbers beyond section 2.

## 4. Website (single page, static, Cloudflare Pages, repo jprestigeflow/jpconstruction)
Files: `index.html`, `css/style.css`, `js/app.js`, `assets/` (hero video re-encoded,
poster, logo). No build step. Vanilla HTML/CSS/JS. GSAP via cdnjs for scroll reveals only.

Sections in order:
1. Nav: logo, anchors (Services, Why JPC, Areas, Process, Reviews, Contact), gold "Call" button.
2. Hero: current reel kept, re-encoded (H.264 1080p ≤ ~3 MB, muted loop, poster.jpg,
   `preload="metadata"`), dark overlay. H1 + one-line sub + stat row (40+ yrs · Est. 1985 ·
   Licensed & Insured). Buttons: **Call Roman** (tel:) primary gold, **Get a Quote** secondary.
3. Trust strip (marquee): Licensed & Insured · Est. 1985 · 40+ Years · $50M+ Delivered · Hamilton to Toronto.
4. Services: 4 cards (cream section).
5. Why JPC: 3 differentiators + "100% success rate / $50M+ delivered" stats.
6. Service areas: the 6 areas as a trust block with a short "we travel" line.
7. Process: 3 numbered steps.
8. Testimonials: 3 short quotes, first name + city + job type only. Written from job types
   Roman does; Romano reads them to Roman and swaps in real first names. Ships visible
   (Romano's decision 2026-09-16), each marked `data-confirm="pending"` in HTML.
9. Quote form: name, phone, city, project type (select), budget range (select), message.
   POST to Web3Forms (`https://api.web3forms.com/submit`) with `access_key` placeholder
   `WEB3FORMS_KEY`; subject "New JPC quote request". Until the key is set, JS falls back to
   opening a pre-filled SMS (`sms:2892371389`) with the form contents. Success/failure states inline.
10. Footer: logo, phone, email, areas, © J Prestige Construction.
11. Sticky mobile bar (≤768px): **Call** (tel:) and **Text** (sms:) buttons, always visible.

Conversion rules: phone number visible in nav, hero, sticky bar, footer. Every CTA is tel: or
form. Lighthouse mobile perf target ≥ 85. Page weight excluding video < 500 KB.
Meta: title, description, OG image (logo on black), LocalBusiness JSON-LD (GeneralContractor,
areaServed list, telephone, email, foundingDate 1985).

Not in scope: gallery / "our work" (needs real photos), blog, multi-page.

## 5. Sample posts (2 first, then 28)
Output dir: `~/Desktop/Projects/jpconstruction/social/`.
- `static-01/`: 1080×1350 (4:5) PNG. Authority post: "40 years. One standard." Gold on black,
  logo, phone, service-area line. Built as HTML, rendered with headless Chrome. Caption + hashtags in `caption.md`.
- `video-01/`: HyperFrames composition, 1080×1920 (9:16), 20–30 s, faceless. Kokoro voice
  `am_michael` (FLIC venv on PATH). Script: hook → 40 yrs / est. 1985 → what we do (3 beats)
  → areas → "Call Roman 289-237-1389". Kinetic type + gold rule lines + subtle dark textures.
  Ends on phone + logo. Render with `npx hyperframes render . --resolution portrait`. `caption.md` included.
- Phase 2 mix (after approval): proof & process (6), education (8: permits, costs, questions
  to ask a contractor), authority & story (6), city-specific (6), offer & CTA (4). Half static, half video.

## 6. Claude app project kit
`docs/claude-project/instructions.md` (paste into Project instructions) and
`docs/claude-project/knowledge-jpc.md` (upload as project knowledge): facts (§2), brand (§3),
voice rules, post pillars, do-not-claim list, file locations.

## 7. Testing / verification
- Site: open in Chrome at 390px and 1440px, all anchors work, tel:/sms: links correct,
  no occurrence of `romanjano530`, form fallback opens sms:, Lighthouse mobile ≥ 85.
- Video: renders without error, audio present, duration 20–30 s, text legible on phone.
- Static: 1080×1350, phone number legible.
- Deploy: `git push` → Cloudflare Pages auto-deploy → curl live URL contains new phone/email.

## 8. Order
logo → site → deploy → static sample → video sample → project kit → Romano review → 28 posts.
