import fs from 'fs';
import path from 'path';

const dir = 'public/assets/images/svg-tech';

const brandColors = {
  'kotlin-original.svg': ['#7F52FF'],
  'matlab-original.svg': ['#49D9FD', '#D95319', '#A2142F'],
  'ruby-original.svg': ['#CC342D', '#A80D00', '#E57252', '#871101', '#BD0012', '#C81F11', '#79130D'],
  'dot-net-original.svg': ['#512BD4', '#176AD4', '#00ADEF', '#124379'],
  'angular-original.svg': ['#DD0031', '#C3002F', '#1A1A1A'],
  'bootstrap-original.svg': ['#7952B3', '#1A1A1A'],
  'filezilla-original.svg': ['#BF0000', '#1A1A1A'],
  'trello-original.svg': ['#0079BF', '#1A1A1A'],
  'vitejs-original.svg': ['#646CFF', '#FFD83D'],
  'visualstudio-original.svg': ['#5C2D91', '#1A1A1A'],
  'vscode-original.svg': ['#007ACC', '#0065A9', '#1F9CF0'],
  'powershell-original.svg': ['#5391FE', '#2C5591', '#1A1A1A'],
  'apache-original.svg': ['#D22128', '#251F5B', '#4D478A'],
  'json-original.svg': ['#404040', '#808080'],
  'grafana-original.svg': ['#F47A20', '#FCEE0A'],
  'chrome-original.svg': ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
  'visualbasic-original.svg': ['#004E8C', '#1A1A1A'],
  'flutter-original.svg': ['#02569B', '#0175C2', '#13B9FD'],
  'eclipse-original.svg': ['#2C2255', '#F7941E', '#473788'],
  'intellij-original.svg': ['#FE2857', '#1A1A1A', '#087CFA', '#1A1A1A'],
  'phpstorm-original.svg': ['#B74AF7', '#1A1A1A', '#6B57FF', '#1A1A1A'],
  'pycharm-original.svg': ['#21D789', '#1A1A1A', '#FCF84A', '#1A1A1A'],
  'jetbrains-original.svg': ['#1A1A1A', '#FE2857', '#FDB60D', '#1A1A1A']
};

Object.keys(brandColors).forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) return;
  let text = fs.readFileSync(filePath, 'utf8');

  const colors = brandColors[f];
  let idx = 0;

  text = text.replace(/fill="url\(#[^"]+\)"/gi, () => {
    const c = colors[idx % colors.length];
    idx++;
    return 'fill="' + c + '"';
  });

  if (['jetbrains-original.svg', 'intellij-original.svg', 'phpstorm-original.svg', 'pycharm-original.svg', 'visualbasic-original.svg', 'bootstrap-original.svg', 'filezilla-original.svg', 'trello-original.svg', 'angular-original.svg', 'powershell-original.svg', 'visualstudio-original.svg'].includes(f)) {
    text = text.replace(/fill="(#fff|#ffffff|white)"/gi, 'fill="#1A1A1A"');
  }

  text = text.replace(/<defs[\s\S]*?<\/defs>/gi, '');
  text = text.replace(/<mask[\s\S]*?<\/mask>/gi, '');
  text = text.replace(/filter="[^"]*"/gi, '');
  text = text.replace(/mask="[^"]*"/gi, '');

  fs.writeFileSync(filePath, text, 'utf8');
  console.log('Processed SVG:', f);
});
