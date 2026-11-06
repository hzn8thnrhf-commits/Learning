# PDF Flow Reader

A mobile-first web app that makes large PDFs actually readable on an iPhone.
Instead of pinch-zooming a fixed page layout, it extracts the text and shows it
as **one continuous scrolling page** — like a book in an e-reader.

## Features

- **Upload large PDFs** — built for big documents (1000+ pages). Text is
  extracted once with a progress bar and cached on-device (IndexedDB), so
  reopening a document is instant and doesn't need the original file again.
- **Single-page scrolling** — no zooming or panning. Page boundaries are shown
  as subtle inline markers, and a pill shows your current page / progress.
- **Adjustable reading experience** — text size, line spacing, font
  (System / Serif / Sans) and Light / Sepia / Dark themes (the `Aa` button).
- **Highlights & notes** — select any text to highlight it in four colors or
  attach a note. Highlights can span paragraphs and pages, are stored
  per-document, and can be exported as Markdown from the notes panel.
- **Quick search** — the 🔍 button searches the entire document as you type;
  tap a result to jump straight to it (with a brief flash on the match).
- **OCR for scanned pages** — pages with no text layer are detected
  automatically, and a banner offers to recognize them with
  [Tesseract.js](https://tesseract.projectnaptha.com/) (English, on-device,
  nothing uploaded). Each scanned page also gets its own *Recognize text*
  button. Recognized text becomes regular reader text: searchable,
  highlightable, and cached like everything else.
- **Remembers where you were** — reading position is saved per document and
  restored when you reopen it from the Library (☰).
- **Installable / offline** — a service worker caches the app, and it can be
  added to the iPhone home screen (Share → *Add to Home Screen*) to run
  full-screen like a native app. Everything stays on your device; nothing is
  uploaded to a server.

## Running it

It's a fully static app — any web server works:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

For your iPhone, the easiest option is **GitHub Pages**: in this repo's
settings, enable Pages for the `main` branch (root folder), then open the
Pages URL in Safari on your phone and *Add to Home Screen*. (HTTPS from Pages
is also what enables the offline service worker.)

> Note: Safari requires HTTPS (or localhost) for service workers, but the app
> itself works fine over plain HTTP too — you just lose offline caching.

## How it works

- [PDF.js](https://mozilla.github.io/pdf.js/) (vendored in `js/vendor/`)
  parses the PDF in a web worker and returns positioned text runs per page.
- `js/app.js` groups those runs into lines and paragraphs using layout
  heuristics (vertical gaps, indentation, font-size changes, hyphenation
  repair) and renders them as plain HTML text.
- Pages use CSS `content-visibility: auto`, so even a 1000-page document only
  lays out what's near the viewport — scrolling stays smooth.
- Highlights are anchored as character offsets within (page, paragraph) pairs,
  so they survive any font-size / theme / layout change.
- Documents, extracted text, highlights and notes live in IndexedDB;
  display preferences live in localStorage.
- When a document contains scanned pages, the original PDF bytes are kept in
  IndexedDB so OCR can re-render those pages later. OCR runs in a Tesseract.js
  web worker (vendored in `js/vendor/tesseract/`, including the English model),
  page by page, with progress and cancel — you can keep reading while it runs.

## Limitations

- OCR ships with the English model only (other languages can be added by
  dropping additional `.traineddata.gz` files into `js/vendor/tesseract/` and
  passing the language code to `createWorker`). OCR speed is roughly a few
  seconds per page on a modern iPhone, so a fully scanned 1000-page book is a
  long-running job — it saves as it goes and can be cancelled and resumed.
- Complex layouts (multi-column academic papers, tables) are linearized with
  heuristics — reading order is usually right, but tables flatten into text.
- Images and figures in the PDF are not shown (text-focused by design).

## LM Academy: The Slip

The [`lm-academy/`](lm-academy/) folder holds **The Slip**, a separate installable web app that teaches London Market insurance through tappable diagrams: 15 modules and 85 lessons in which every box and arrow explains itself, 57 slider models showing cause and effect, quizzes, flashcards and mind maps, designed for the iPhone Duo. It has its own offline cache and home-screen icon. Open `/lm-academy/` on the same host and use **Share → Add to Home Screen**. Its source lives in [hzn8thnrhf-commits/london-market-insurance](https://github.com/hzn8thnrhf-commits/london-market-insurance).
