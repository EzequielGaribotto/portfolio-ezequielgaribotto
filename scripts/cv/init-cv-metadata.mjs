import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..', '..');
const cvDirectory = path.join(projectRoot, 'public', 'cv');
const metadataPath = path.join(cvDirectory, 'cv-metadata.json');

// CV files to check
const cvFiles = {
  es: path.join(cvDirectory, 'CV_ES_EzequielGaribotto.pdf'),
  en: path.join(cvDirectory, 'CV_EN_EzequielGaribotto.pdf'),
  en_ats: path.join(cvDirectory, 'CV_EN_EzequielGaribotto_ATS.pdf')
};

function initializeMetadata() {
  // Get modification times for each CV file
  const lastUpdated = {};
  let latestModified = new Date(0);
  let existingCount = 0;
  
  for (const [key, filePath] of Object.entries(cvFiles)) {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      lastUpdated[key] = stat.mtime.toISOString();
      if (stat.mtime > latestModified) {
        latestModified = stat.mtime;
      }
      existingCount++;
    }
  }
  
  if (existingCount === 0) {
    console.log('⚠️  No CV files found. Please add your CV files to the public/cv directory:');
    console.log('   - CV_ES_EzequielGaribotto.pdf');
    console.log('   - CV_EN_EzequielGaribotto.pdf');
    console.log('   - CV_EN_EzequielGaribotto_ATS.pdf');
    return;
  }

  const version = latestModified.toISOString().split('T')[0].replace(/-/g, '.');

  const metadata = {
    lastUpdated,
    version: version,
    notes: {
      es: `Inicialización automática basada en archivos CV existentes`,
      en: `Automatic initialization based on existing CV files`
    }
  };

  // Ensure directory exists
  if (!fs.existsSync(cvDirectory)) {
    fs.mkdirSync(cvDirectory, { recursive: true });
  }

  try {
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('✅ CV metadata initialized successfully!');
    console.log(`   Found ${existingCount} CV file(s)`);
    console.log(`   Version: ${version}`);
    for (const [key, timestamp] of Object.entries(lastUpdated)) {
      console.log(`   ${key}: ${new Date(timestamp).toLocaleString()}`);
    }
  } catch (error) {
    console.error('❌ Error initializing CV metadata:', error);
  }
}

// Run initialization
initializeMetadata();
