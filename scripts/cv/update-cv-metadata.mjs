import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define CV files to check
const projectRoot = path.join(__dirname, '..', '..');
const cvDirectory = path.join(projectRoot, 'public', 'cv');
const cvFiles = {
  es: path.join(cvDirectory, 'CV_ES_EzequielGaribotto.pdf'),
  en: path.join(cvDirectory, 'CV_EN_EzequielGaribotto.pdf'),
  en_ats: path.join(cvDirectory, 'CV_EN_EzequielGaribotto_ATS.pdf')
};

// Get modification times for each CV file
const lastUpdated = {};
let latestDate = new Date(0);

for (const [key, filePath] of Object.entries(cvFiles)) {
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    lastUpdated[key] = stat.mtime.toISOString();
    if (stat.mtime > latestDate) {
      latestDate = stat.mtime;
    }
  }
}

// Create new metadata with individual timestamps
const metadata = {
  lastUpdated,
  version: latestDate.toISOString().split('T')[0].replace(/-/g, '.'),
  notes: {
    es: "Actualización manual - " + new Date().toLocaleDateString('es-ES'),
    en: "Manual update - " + new Date().toLocaleDateString('en-US')
  }
};

// Write to public directory for static access
const metadataPath = path.join(projectRoot, 'public', 'cv', 'cv-metadata.json');

// Ensure the directory exists
const dir = path.dirname(metadataPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

console.log('CV metadata updated successfully!');
console.log('New version:', metadata.version);
console.log('Individual CV update times:');
for (const [key, timestamp] of Object.entries(lastUpdated)) {
  console.log(`  ${key}: ${new Date(timestamp).toLocaleString()}`);
}
console.log('File saved to:', metadataPath);
