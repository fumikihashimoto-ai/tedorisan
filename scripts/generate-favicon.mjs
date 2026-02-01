#!/usr/bin/env node
/**
 * ファビコン生成スクリプト
 * public/favicon-source.png から各種サイズのアイコンを生成
 */
import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const sourcePath = join(rootDir, 'public', 'favicon-source.png');
const publicDir = join(rootDir, 'public');
const appDir = join(rootDir, 'app');

async function resizeToBuffer(path, size) {
  return sharp(path)
    .resize(size, size)
    .png()
    .toBuffer();
}

async function main() {
  console.log('ファビコンを生成中...');

  // favicon.ico (16x16, 32x32, 48x48)
  const sizes16 = await resizeToBuffer(sourcePath, 16);
  const sizes32 = await resizeToBuffer(sourcePath, 32);
  const sizes48 = await resizeToBuffer(sourcePath, 48);
  const icoBuffer = await toIco([sizes16, sizes32, sizes48]);
  writeFileSync(join(appDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ app/favicon.ico');

  // icon-192.png
  const icon192 = await sharp(sourcePath).resize(192, 192).png().toBuffer();
  writeFileSync(join(publicDir, 'icon-192.png'), icon192);
  console.log('  ✓ public/icon-192.png');

  // icon-512.png
  const icon512 = await sharp(sourcePath).resize(512, 512).png().toBuffer();
  writeFileSync(join(publicDir, 'icon-512.png'), icon512);
  console.log('  ✓ public/icon-512.png');

  // apple-touch-icon.png (180x180)
  const appleIcon = await sharp(sourcePath).resize(180, 180).png().toBuffer();
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), appleIcon);
  console.log('  ✓ public/apple-touch-icon.png');

  // app/icon.png (Next.js 用、32x32)
  const appIcon = await sharp(sourcePath).resize(32, 32).png().toBuffer();
  writeFileSync(join(appDir, 'icon.png'), appIcon);
  console.log('  ✓ app/icon.png');

  // app/apple-icon.png (Next.js 用、180x180)
  const appAppleIcon = await sharp(sourcePath).resize(180, 180).png().toBuffer();
  writeFileSync(join(appDir, 'apple-icon.png'), appAppleIcon);
  console.log('  ✓ app/apple-icon.png');

  console.log('完了！');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
