# CT Scan Protocol — Interactive Reference

A comprehensive, interactive web-based reference tool for Body CT Protocols. Built for radiologists, radiology technologists, and medical students.

## Live Demo

**[View Live →](https://talhafarooq136.github.io/ctscan_protocol/ct_scan_protocol_diagram.html)**

## Features

- **Protocol Browser** — 22 body CT protocols with full details: indications, contrast dose, scan phases, timing, and clinical notes
- **Protocol Selector** — Decision tree to quickly find the right protocol based on clinical indication
- **Execution Checklist** — Step-by-step checklist (patient prep → scanner setup → during scan → post-scan) with live progress tracking
- **Quick Reference** — CT density (HU) table, oral contrast guide, IV contrast volumes, phase timing reference
- **Phase Timeline Visualizer** — Visual timeline showing exactly when each scan phase fires after injection
- **Contrast Reaction Emergency Card** — Mild / Moderate / Severe reaction management with drug dosing
- **Dose Calculator** — IV contrast volume calculator (weight-based), oral contrast schedule generator, and renal risk / Metformin checker

## Protocols Covered

| Category | Protocols |
|----------|-----------|
| Abdomen | Routine A/P, A/P with Delay, Non-Contrast A/P, Trauma, Pancreatic Mass, Enterography IBD, Enterography GI Bleed/Tumor, Mesenteric Ischemia |
| Liver | Quad Phase, Triple Phase, Dual Phase, Liver Donor |
| Renal | Adrenal Mass, Renal Mass, Renal Stone, Renal Artery Stenosis, Renal Donor/UPJ, Renal Recipient, Urogram |
| Vascular | Aortic Dissection, AAA Pre-EVT, AAA Post-EVT, Lower Extremity Run-Off |
| Special | CT Cystography, CT Colonography, Rectal Contrast A/P, CT Pelvis |

## Source

Based on **BodyCTProtocols.pdf** — institutional Body CT Protocol reference document (30 pages).

## Tech Stack

- HTML5
- CSS3 (`styles.css`)
- Vanilla JavaScript (`script.js`)

No frameworks, no dependencies — runs entirely in the browser.

## Project Structure

```
ctscan_protocol/
├── ct_scan_protocol_diagram.html   # Main HTML file
├── styles.css                      # All styling
├── script.js                       # All JavaScript logic
└── README.md
```

## How to Run Locally

Just open `ct_scan_protocol_diagram.html` in any browser — no server or installation needed.
