import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const inboxDir = resolve('_inbox/Pictures of Me');
const outDir = resolve('public/assets/about');
await mkdir(outDir, { recursive: true });

const jobs = [
  {
    src: 'IMG20260614190525.jpg',
    out: 'farrukh-header.jpg',
    width: 560,
    height: 740,
    position: 'attention',
    quality: 84,
  },
  {
    src: 'IMG_20180112_200228.jpg',
    out: 'outside-football.jpg',
    width: 480,
    height: 480,
    position: 'attention',
    quality: 82,
  },
  {
    src: 'IMG20260101064436.jpg',
    out: 'outside-valley-dawn.jpg',
    width: 480,
    height: 480,
    position: 'attention',
    quality: 82,
  },
  {
    src: 'IMG20260101093339.jpg',
    out: 'outside-mountain-vertical.jpg',
    width: 480,
    height: 480,
    position: 'attention',
    quality: 82,
  },
  {
    src: 'IMG20260101112352.jpg',
    out: 'outside-peaks-waterfalls.jpg',
    width: 480,
    height: 480,
    position: 'attention',
    quality: 82,
  },
];

for (const job of jobs) {
  const inPath = resolve(inboxDir, job.src);
  const outPath = resolve(outDir, job.out);
  const info = await sharp(inPath)
    .rotate()
    .resize({ width: job.width, height: job.height, fit: 'cover', position: job.position })
    .jpeg({ quality: job.quality, mozjpeg: true, progressive: true })
    .toFile(outPath);
  console.log(`${job.out}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(1)} KB`);
}
