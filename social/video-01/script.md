# JPC video-01 — VO script & timing (30.0 s, 1080×1920)

Voice: Kokoro `am_michael` (free, local). Lines trimmed of silence, 0.3 s gaps, 0.4 s lead.

| # | Start | End | Line | Scene |
|---|------:|----:|------|-------|
| 1 | 0.40 | 2.97 | Forty years of building. One standard. | S1 hook: FORTY YEARS / OF BUILDING. / ONE STANDARD. |
| 2 | 3.27 | 9.31 | J Prestige Construction. Established 1985. Licensed and insured. | S2 logo reveal + chips EST. 1985 / LICENSED & INSURED |
| 3 | 9.61 | 14.77 | Custom homes. High-end renovations. Commercial fit-outs. Full site management. | S3 numbered list 01–04 |
| 4 | 15.08 | 20.47 | Detailed estimates. Daily supervision. And subs we've trusted for decades. | S4 three gold-rule cards |
| 5 | 20.77 | 24.00 | Hamilton to Toronto, and everywhere in between. | S5 city stack |
| 6 | 24.30 | 28.33 | Call Roman. Two eight nine. Two three seven. One three eight nine. | S6 end card: logo, 289-237-1389, GET A FREE QUOTE, jpconstruction.pages.dev |

Tail 28.33–30.00: end card holds, button pulses.

## Regenerate VO
```bash
export PATH="$HOME/FLIC/marketing/daily/.venv/bin:$PATH"
npx hyperframes tts "<line>" --voice am_michael --output assets/vo/lN.wav </dev/null
# then trim + mix (see the python in this project's history / redo with adelay+amix), timings in assets/vo/timing.json
```

## Render
```bash
cd ~/Desktop/Projects/jpconstruction/social/video-01
npx hyperframes check .
npx hyperframes render . --resolution portrait -o out/jpc-video-01.mp4
```
