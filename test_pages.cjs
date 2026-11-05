const fs = require('fs');
const { execFileSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = 'file:///c:/Users/PROGRAMADOR/Desktop/reporte_rapido/index.html';
const out = 'c:\\Users\\PROGRAMADOR\\Desktop\\reporte_rapido\\test_print.pdf';

try { fs.unlinkSync(out); } catch(e) {}

try {
  execFileSync(edge, [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    `--print-to-pdf=${out}`,
    url
  ], { timeout: 30000, stdio: 'ignore' });
} catch(e) {
  // Edge sometimes exits with error but still creates the PDF
}

if (fs.existsSync(out)) {
  const pdf = fs.readFileSync(out, 'utf8');
  const pages = (pdf.match(/\/Type\s*\/Page\b/g) || []).length;
  console.log('Pages:', pages);
  fs.unlinkSync(out);
} else {
  console.log('PDF not created');
}
