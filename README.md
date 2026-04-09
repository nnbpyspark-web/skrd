# Sri Kanugonda Raya Swami Temple Website

Official website for the Sri Kanugonda Raya Swami Temple, built with Next.js, TailwindCSS, and deployed as a static progressive web app (PWA).

## Features

- **Bilingual:** English and Telugu language support without routing changes.
- **Fast & SEO Friendly:** Fully static architecture optimized for Core Web Vitals.
- **PWA Ready:** Installable on mobile devices with offline support.
- **Modern UI:** Tailwind CSS, Framer Motion animations.
- **Live Darshan:** YouTube live stream integration.

## How to Run Locally

1. **Prerequisites:** Make sure you have Node.js (v18+) installed.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open browser:** Navigate to [http://localhost:3000](http://localhost:3000)

## How to Update Content (For Temple Management)

All content is driven by local configuration files. You don't need to know React to change text or prices. Simply edit the files in the `data/` directory:

- **`data/live.ts`**: Update the YouTube live URL or turn live streaming on/off.
- **`data/donations.ts`**: Update bank details or UPI ID.
- **`data/sevas.ts`**: Add or modify poojas, prices, and timings.
- **`data/festivals.ts`**: Update upcoming festival dates and information.
- **`data/gallery.ts`**: Add new images to the gallery by putting images in `public/images/gallery/` and referencing them here.
- **`data/templeInfo.ts`**: Update phone numbers, WhatsApp, or typical Darshan timings.

*Tip: Before committing changes, test them locally to ensure everything works.*

## Deployment

This app is configured to be exported as a static HTML application (`output: 'export'` in Next config).

### Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/), create a new project, and select the repository.
3. Add the following Environment Variable:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` (Your Google Analytics ID)
4. Click Deploy. Vercel automatically detects Next.js and builds the static site.

### AWS S3 + CloudFront
1. Build the static site: `npm run build`
2. The output will be in the `/out` directory.
3. Sync the `/out` directory to an S3 bucket configured for website hosting.
4. Set up CloudFront to point to your S3 bucket and issue an SSL certificate via AWS Certificate Manager.

### Custom Domain
Configure your DNS records (A record or CNAME) to point to your hosting provider's IP/URL (e.g., Vercel's nameservers). Wait for propagation, and the site will be live on your custom domain.

