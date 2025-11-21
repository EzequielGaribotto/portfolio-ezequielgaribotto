# CV Metadata Scripts

## Manual Update
After updating any CV PDF file, run:

```bash
npm run cv:update
```

This will read the file modification times from the PDF files and update the `public/cv/cv-metadata.json` file with the correct dates.