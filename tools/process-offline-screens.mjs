import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const srcRoot = resolve('_inbox/LMS - Offline Desktop App');
const outDir = resolve('public/assets/offline');
await mkdir(outDir, { recursive: true });

const jobs = [
  {
    src: '00_Documentation_and_UX/User Story and Journey Mapping - v2.png',
    out: 'process-user-journey-mapping.jpg',
    maxWidth: 1200,
    quality: 88,
  },
  {
    src: '03_Teacher_Views/My Classes - v2.png',
    out: 'design-teacher-my-classes.jpg',
    maxWidth: 1400,
    quality: 85,
  },
  {
    src: '08_Clicker_Attendance/Attendance Using Clickers.png',
    out: 'design-clicker-assignment-v2.jpg',
    maxWidth: 900,
    quality: 88,
  },
  {
    src: '07_Assessment/Assessment - Results.png',
    out: 'design-assessment-live-results.jpg',
    maxWidth: 1400,
    quality: 88,
  },
];

for (const job of jobs) {
  const inPath = resolve(srcRoot, job.src);
  const outPath = resolve(outDir, job.out);
  const info = await sharp(inPath)
    .resize({ width: job.maxWidth, withoutEnlargement: true })
    .jpeg({ quality: job.quality, mozjpeg: true, progressive: true })
    .toFile(outPath);
  console.log(`${job.out}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(1)} KB`);
}
