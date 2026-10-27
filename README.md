# Fieldnotes / Eco — E-Waste & Environmental Management Portfolio

A React + TypeScript + Vite portfolio with a muted green eco-digital aesthetic, a short illustrated Earth introduction, an About section, course details, a searchable/filterable submission archive, artwork credits, and locally included assignment files.

## Portfolio contents

The website organizes **14 assignment entries** into **5 ISA activities, 7 ESE activities and 2 Extras**. There are **15 local files**: the campus awareness poster and comic/storyboard are grouped as one campaign entry. The Karnataka state tracker entry also links to the supplied interactive dashboard.

See [`ASSIGNMENT_MAP.md`](./ASSIGNMENT_MAP.md) for the file-by-file content map and grouping notes.

## Start locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. To create a production build:

```bash
npm run build
npm run preview
```

## Personalize student/course details

Edit `src/data/siteConfig.ts` to update the student name, roll number, class/division, institute, course name/code, faculty, semester, academic year, and About copy.

## Edit the submission archive

All assignment metadata is in `src/data/submissions.ts`. Each entry contains:

- `id` — unique assignment ID
- `title` — displayed assignment title
- `category` — `ISA`, `ESE` or `Extras`
- `description` — short factual summary
- `tags` — searchable topic tags
- `attachments` — one or more document, image, video, spreadsheet or external-link records

The archive filters, search and count badges are derived from this data. Related deliverables are grouped under one card by placing several attachments in the same record.

### Add a file later

1. Put the new file inside the appropriate assignment folder under `public/submissions/`.
2. Add or update an `attachments` item in `src/data/submissions.ts`.
3. Use a URL path beginning with `/submissions/`, for example:

```ts
{
  label: 'Open report',
  url: '/submissions/isa-01-toxic-trail/class-writeup.pdf',
  fileType: 'PDF',
  fileSize: '1.6 MB',
}
```

For an external website or dashboard, add `external: true`. For multiple files belonging to the same assignment, add multiple entries to its `attachments` array instead of creating unrelated assignment cards.

## Notes about data provenance

- **Karnataka tracker:** its own source-notes worksheet says some collection estimates, compliance records, hotspot status, health-monitoring details and outreach records are illustrative because verified KSPCB/CPCB records were unavailable. The workbook also labels its calculated state score as a demonstration until those fields are replaced. The portfolio description preserves that caveat.
- **LEED workbook:** the building scoring template does not contain earned category points. The workbook cautions against inferring an exact score from a building's reported rating label.
- **Manufacturer analysis:** the report summarizes general regulatory applicability and explicitly does not establish the individual registration status or exact covered equipment categories for the named manufacturers.
- **Cryptography paper:** this is a cross-disciplinary research paper, not an e-waste report; it is included under Extras because that matches the supplied portfolio structure.

## Artwork and image sourcing

The website's decorative artwork is not AI-generated and has source/credit notes in `src/data/artworkSources.ts`. The supplied poster, comic and process infographic are preserved as submitted files. For any new Pinterest-discovered artwork, follow the Pin to the creator's original source and verify reuse permission before downloading or redistributing it.

## Technical notes

- No custom backend, login, database or cloud upload service is configured. Assignment files are served as static files from `public/submissions/`.
- The intro provides a skip control and respects reduced-motion settings.
- The filter/search controls work together, and assignment cards can display more than one attachment.

## Deploy to GitHub Pages (recommended for GitHub hosting)

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`. It builds the Vite app and deploys the `dist/` folder when you push to `main` or `master`. The Vite base path and local submission-file links are configured for GitHub Pages repository URLs.

1. Create a **public** GitHub repository named `eco-fieldnotes-portfolio` (GitHub Free requires a public repository for Pages).
2. Extract this ZIP, open a terminal in the `eco-fieldnotes-portfolio` folder, and run:

   ```bash
   git init
   git add .
   git commit -m "Add Eco Fieldnotes portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/eco-fieldnotes-portfolio.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your GitHub username. If Git asks you to sign in, complete the browser authentication.
3. On GitHub, open the repository and go to **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the **Actions** tab and watch the `Deploy to GitHub Pages` workflow. When it succeeds, the site will be available at `https://YOUR-USERNAME.github.io/eco-fieldnotes-portfolio/`.
5. Future pushes to `main` will automatically rebuild and publish the site.

**Public visibility:** GitHub Pages websites and all files deployed with them are publicly accessible. Do not commit private documents, API keys, passwords, or information you do not want published.

## Deploy to Netlify

### Fastest method (manual deploy)

1. Extract the complete project ZIP so that you have the project folder containing `package.json`, `index.html`, `src/`, `public/`, and `netlify.toml`.
2. Sign in at https://app.netlify.com/drop.
3. Drag the **extracted project folder** into the deploy area. While signed in, Netlify can detect the Vite project and run its build. The included `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Node.js to 22.
4. Wait for Netlify's build to finish, then open the generated site URL.
5. If you see a build failure, open the deploy log and check that the build command is `npm run build` and the publish directory is `dist`.

### Recommended for ongoing updates

Push this project to a GitHub repository, then in Netlify choose **Add new project → Import an existing project**, select the repository, and deploy. Netlify will rebuild the site whenever you push updates to the production branch.

### Updating assignment files later

Keep the existing paths under `public/submissions/` and update `src/data/submissions.ts` when changing submission titles or links. Redeploy the project (or push the change to GitHub) after edits. Every file linked by the site must exist at its referenced path.
