const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace href="/images/ and src="/images/ with relative images/
            if (content.includes('src="/images/')) {
                content = content.replaceAll('src="/images/', 'src="images/');
                modified = true;
            }
            if (content.includes('href="/images/')) {
                content = content.replaceAll('href="/images/', 'href="images/');
                modified = true;
            }
            if (content.includes('href="/dr-vaibhavi-website/images/')) {
                content = content.replaceAll('href="/dr-vaibhavi-website/images/', 'href="images/');
                modified = true;
            }

            if (modified) {
                console.log('Fixed image paths in:', fullPath);
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

walk(path.join(__dirname, 'out'));
console.log('Post-export image path fix complete!');
