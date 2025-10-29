# SilverNest · Mature Dater Profile Builder

SilverNest helps adults 40+ craft warm, confident dating profiles in minutes. This Next.js App Router project pairs a tailored prompt with the OpenAI API to produce a profile bio, prompt answers, and respectful first messages in a single click.

## Features
- ✨ Elegant, responsive UI themed for a calm, mature audience
- 🧠 AI-powered copywriting tuned for Hinge, Bumble, Match, and Tinder
- 📝 Instant copy-ready bio, prompt answers, first messages, and style notes
- 📄 Print-friendly layout that hides form controls when saving as PDF
- 🚀 Ready for Vercel deployment with `output: 'standalone'`

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.local.example` to `.env.local` and add your OpenAI key:
   ```bash
   cp .env.local.example .env.local
   # Update OPENAI_API_KEY=...
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) and start generating profiles.

## Deployment
- Push to GitHub and choose **Import Project** on Vercel.
- Ensure the `OPENAI_API_KEY` environment variable is set in the Vercel dashboard.
- Build command: `npm run build`
- Output is production-ready; default route lives at `/`, preventing 404s.

## Tech Stack
- Next.js 14 App Router + TypeScript
- TailwindCSS with custom palette and typography
- OpenAI Node SDK (`gpt-4o-mini`)

## Notes
- The API route expects meaningful `goals` and `interests` input (≥ 30 characters).
- No data is stored; the form simply posts to `/api/generate` and returns the generated copy.
- Customize the UI by editing `app/page.tsx` and the Tailwind theme in `tailwind.config.ts`.

Enjoy helping mature daters feel seen with SilverNest.
# SilverNest
