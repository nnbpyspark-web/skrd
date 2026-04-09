const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, 'public', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient (saffron)
  const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  gradient.addColorStop(0, '#ffaa33');
  gradient.addColorStop(1, '#cc6600');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.15);
  ctx.fill();

  // Om symbol
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = `bold ${size * 0.5}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ॐ', size / 2, size / 2);

  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(outputDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Generated: ${filename}`);
}

sizes.forEach(generateIcon);
console.log('All icons generated successfully!');
