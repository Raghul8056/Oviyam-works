const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      replaceInFiles(fullPath);
    } else if (file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      
      // Replace Playfair Display
      if (content.includes("'Playfair Display', Georgia, serif")) {
        content = content.replace(/'Playfair Display', Georgia, serif/g, 'var(--font-heading)');
        modified = true;
      }
      
      // Replace Inter
      if (content.includes("'Inter', sans-serif")) {
        content = content.replace(/'Inter', sans-serif/g, 'var(--font-body)');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInFiles(path.join(__dirname, 'src'));
