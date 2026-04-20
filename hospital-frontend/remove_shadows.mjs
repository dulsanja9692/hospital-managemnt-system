import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const regex = /(["'\s`])((?:hover:|focus:|dark:)?shadow(?:-[a-z0-9]+)?)(?=["'\s`])/g;

walk('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace with a loop to catch overlapping matches if any, though unlikely here.
    let newContent = content.replace(regex, '$1');
    // clean up double spaces inside quotes (optional, but good)
    newContent = newContent.replace(/ {2,}/g, ' ');
    
    if (original !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Cleaned: ' + filePath);
    }
  }
});
