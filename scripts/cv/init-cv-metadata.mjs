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
  // Check if metadata already exists
  let existingMetadata = null;
  if (fs.existsSync(metadataPath)) {
    try {
      existingMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      console.log('📋 Existing CV metadata found');
    } catch {
      console.warn('⚠️  Could not read existing metadata, will create new');
    }
  }

  // Get modification times for each CV file
  const lastUpdated = {};
  let latestModified = new Date(0);
  let existingCount = 0;
  let hasChanges = false;
  
  for (const [key, filePath] of Object.entries(cvFiles)) {
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      const fileModTime = stat.mtime.toISOString();
      
      // If we have existing metadata, check if the file is actually newer
      if (existingMetadata && existingMetadata.lastUpdated && existingMetadata.lastUpdated[key]) {
        const existingTime = new Date(existingMetadata.lastUpdated[key]);
        const currentTime = new Date(fileModTime);
        
        // Only update if file is actually newer (with 1 second tolerance for filesystem differences)
        if (currentTime - existingTime > 1000) {
          lastUpdated[key] = fileModTime;
          hasChanges = true;
          console.log(`   ✓ ${key} has been updated`);
        } else {
          // Keep existing timestamp
          lastUpdated[key] = existingMetadata.lastUpdated[key];
        }
      } else {
        // No existing metadata for this file, use current modification time
        lastUpdated[key] = fileModTime;
        hasChanges = true;
      }
      
      const modTime = new Date(lastUpdated[key]);
      if (modTime > latestModified) {
        latestModified = modTime;
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

  // If we have existing metadata and no changes detected, keep it as is
  if (existingMetadata && !hasChanges) {
    console.log('✅ CV metadata is up to date, no changes needed');
    console.log(`   Version: ${existingMetadata.version}`);
    for (const [key, timestamp] of Object.entries(existingMetadata.lastUpdated)) {
      console.log(`   ${key}: ${new Date(timestamp).toLocaleString()}`);
    }
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
