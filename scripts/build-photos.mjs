/**
 * Jetline photography pipeline.
 *
 * Downloads the licensed source photography listed in docs/IMAGE-MANIFEST.md and
 * applies one shared grade so images from a dozen different photographers read as
 * a single commissioned shoot: desaturated, cooled, shadows deepened.
 *
 * Run once with `node scripts/build-photos.mjs`. Output lands in src/assets/photos/
 * and is committed; Astro's image service handles responsive sizing from there.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'assets', 'photos');

const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fm=jpg&fit=max`;
const pexels = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Grade tiers. Stock photography arrives lit every possible way, and a single
 * shared curve is not enough to make a bright overcast frame sit beside a night
 * frame. This is ordinary shot-matching: images shot in daylight are pulled much
 * further down so the whole page reads as one night shoot.
 */
const GRADES = {
  night: { saturation: 0.62, brightness: 0.96, contrast: 1.08, lift: -14 },
  dusk: { saturation: 0.54, brightness: 0.84, contrast: 1.1, lift: -18 },
  day: { saturation: 0.45, brightness: 0.68, contrast: 1.16, lift: -28 },
  /** For frames whose subject sits against a white building or blown sky. */
  bright: { saturation: 0.38, brightness: 0.55, contrast: 1.2, lift: -34 },
};

/**
 * Optional pre-crops, as fractions of the source [left, top, width, height].
 * Used where a frame's subject occupies a small part of the plate and an
 * object-position crop in CSS cannot get close enough.
 */
const CROPS = {
  // Cropped onto the van's flank rather than its front: the grille carries a
  // manufacturer badge this site may not imply it owns, and the pale building
  // and concrete apron behind the nose refuse to sit in a night palette however
  // hard they are graded. The shadowed side body solves all three.
  'fleet-van': [0.43, 0.35, 0.45, 0.4],
};

/** name, url, output width, grade tier. */
const PHOTOS = [
  ['hero-suv-night', unsplash('1683778547049-8d969766b441', 2400), 2000, 'night'],
  ['door-handle-rain', pexels('8425057', 2000), 1600, 'dusk'],
  ['crew-captain', pexels('28180452', 2000), 1600, 'day'],
  ['movement-chevrons', unsplash('1755790974022-fe1c1834418c', 2400), 2000, 'night'],
  ['toronto-skyline', unsplash('1750479015832-b33a015d45b1', 2400), 2400, 'night'],
  ['toronto-financial', unsplash('1628023736581-0af87b146883', 2400), 2000, 'night'],
  ['executive-sedan', pexels('8425380', 2000), 1600, 'day'],
  ['interior-detail', pexels('9258341', 2000), 1600, 'dusk'],
  ['sedan-hotel', pexels('8425052', 2000), 2000, 'bright'],
  ['fleet-sedan', pexels('15071553', 2000), 1600, 'night'],
  ['fleet-van', pexels('19871522', 2000), 1600, 'bright'],
  ['fleet-suv', unsplash('1776043677298-5525a774cbf1', 2000), 1600, 'dusk'],
  ['aviation-runway', unsplash('1767053853571-fbc0f931855e', 2400), 2400, 'night'],
  ['terminal-window', pexels('27550030', 2000), 1600, 'dusk'],
  ['rain-crosswalk', unsplash('1580061022778-70ee6981bbce', 2400), 2000, 'night'],
  ['night-road', unsplash('1621863413762-5802c6065dfe', 2400), 2000, 'night'],
];

/**
 * Saturation comes down so the amber signal colour stays the only assertive hue
 * on the page, and the linear pass deepens shadows so light text sits on the
 * image without needing a heavy scrim over it.
 */
function applyGrade(pipeline, tier) {
  const g = GRADES[tier] ?? GRADES.night;
  return pipeline
    .modulate({ saturation: g.saturation, brightness: g.brightness })
    .linear(g.contrast, g.lift)
    .gamma(1.02);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const log = [];

  for (const [name, url, width, tier] of PHOTOS) {
    const dest = path.join(OUT, `${name}.jpg`);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const input = Buffer.from(await res.arrayBuffer());

      let pipeline = sharp(input);
      const crop = CROPS[name];
      if (crop) {
        const meta = await pipeline.metadata();
        pipeline = sharp(input).extract({
          left: Math.round(meta.width * crop[0]),
          top: Math.round(meta.height * crop[1]),
          width: Math.round(meta.width * crop[2]),
          height: Math.round(meta.height * crop[3]),
        });
      }

      const out = await applyGrade(
        pipeline.resize({ width, withoutEnlargement: true }),
        tier
      )
        .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toBuffer();

      fs.writeFileSync(dest, out);
      const meta = await sharp(out).metadata();
      log.push(`${name.padEnd(20)} ${tier.padEnd(5)} ${meta.width}x${meta.height}  ${(out.length / 1024).toFixed(0)}kb`);
    } catch (err) {
      log.push(`${name.padEnd(20)} FAILED  ${err.message}`);
    }
  }

  console.log(log.join('\n'));
}

await main();
