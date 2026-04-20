import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

// Regex to capture font weights and tracking classes
const regex = /(["'\s`])(?:[a-zA-Z0-9\-\[\]=]+:)?(?:font-(?:bold|semibold|medium|black|extrabold|light|thin|extralight|normal)|tracking(?:-[a-zA-Z0-9\-\/\[\]\.]+)?)(?=["'\s`])/g;

walk('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace iteratively to catch any adjacent matches
    let newContent = content;
    let prevContent;
    do {
      prevContent = newContent;
      newContent = newContent.replace(regex, '$1');
    } while (prevContent !== newContent);
    
    if (original !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Cleaned typography from: ' + filePath);
    }
  }
});
