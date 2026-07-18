#!/usr/bin/env node

/**
 * Optimise les originaux destinés au site.
 *
 * Source : ../originaux (à côté du projet)
 * Cible  : public/images
 *
 * Chaque fichier est converti en JPEG qualité 85, sans métadonnées EXIF.
 * Les images sont parcourues récursivement et l'arborescence est préservée.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(scriptDirectory, '../../originaux');
const outputDirectory = path.resolve(scriptDirectory, '../public/images');
const JPEG_QUALITY = 85;

// La clé correspond au premier dossier sous ../originaux.
const sizes = {
  hero: { width: 2200 },
  'grands-formats': { width: 1800 },
  details: { width: 800 },
  galerie: { width: 700 },
  series: { width: 700 },
  atelier: { width: 900 },
  opengraph: { width: 1200, height: 630, fit: 'cover' },
};

const supportedExtensions = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif', '.gif', '.heic',
]);

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} o`;
  const units = ['Ko', 'Mo', 'Go'];
  let value = bytes / 1024;
  let unit = units[0];

  for (const nextUnit of units) {
    unit = nextUnit;
    if (value < 1024 || nextUnit === units.at(-1)) break;
    value /= 1024;
  }

  return `${value.toFixed(1)} ${unit}`;
};

/** Retourne tous les fichiers d'un dossier, y compris ceux des sous-dossiers. */
async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findFiles(entryPath);
    return entry.isFile() ? [entryPath] : [];
  }));

  return nestedFiles.flat();
}

function getResizeOptions(relativePath) {
  const [folder] = relativePath.split(path.sep);
  const size = sizes[folder];
  if (!size) return null;

  // Les visuels Open Graph doivent toujours avoir exactement 1200 × 630 px.
  if (size.height) {
    return { ...size, position: 'attention', withoutEnlargement: false };
  }

  // Les autres visuels gardent leur proportion et ne sont jamais agrandis.
  return { ...size, withoutEnlargement: true };
}

/**
 * Une sortie est à jour si elle existe et n'est pas plus ancienne que l'original.
 * Une erreur autre que l'absence du fichier doit remonter pour ne pas masquer un
 * problème de droits ou de système de fichiers.
 */
async function getUpToDateOutputStats(inputStats, outputPath) {
  try {
    const outputStats = await stat(outputPath);
    return outputStats.mtimeMs >= inputStats.mtimeMs ? outputStats : null;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function main() {
  let files;
  try {
    files = await findFiles(sourceDirectory);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Dossier source introuvable : ${sourceDirectory}`);
    }
    throw error;
  }

  await mkdir(outputDirectory, { recursive: true });

  const summary = { processed: 0, skipped: 0, failed: 0, before: 0, after: 0 };
  const outputPaths = new Set();

  for (const inputPath of files) {
    const relativePath = path.relative(sourceDirectory, inputPath);
    const extension = path.extname(inputPath).toLowerCase();

    if (!supportedExtensions.has(extension)) {
      summary.skipped += 1;
      console.warn(`Ignoré (format non pris en charge) : ${relativePath}`);
      continue;
    }

    const resizeOptions = getResizeOptions(relativePath);
    if (!resizeOptions) {
      summary.skipped += 1;
      console.warn(`Ignoré (dossier sans dimension définie) : ${relativePath}`);
      continue;
    }

    // La sortie est toujours un JPEG : l'extension est donc systématiquement .jpg.
    const outputPath = path.join(
      outputDirectory,
      relativePath.replace(/\.[^.]+$/, '.jpg'),
    );

    if (outputPaths.has(outputPath)) {
      summary.failed += 1;
      console.error(`Erreur (deux sources donnent la même sortie) : ${relativePath}`);
      continue;
    }
    outputPaths.add(outputPath);

    try {
      const inputStats = await stat(inputPath);
      const upToDateOutputStats = await getUpToDateOutputStats(inputStats, outputPath);

      if (upToDateOutputStats) {
        summary.skipped += 1;
        summary.before += inputStats.size;
        summary.after += upToDateOutputStats.size;
        console.log(`SKIP ${relativePath} (déjà optimisée)`);
        continue;
      }

      await mkdir(path.dirname(outputPath), { recursive: true });
      const before = inputStats.size;

      await sharp(inputPath, { failOn: 'none' })
        .rotate()
        .resize(resizeOptions)
        // Sharp supprime les métadonnées par défaut : ne pas appeler withMetadata().
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(outputPath);

      const after = (await stat(outputPath)).size;
      summary.processed += 1;
      summary.before += before;
      summary.after += after;
      console.log(`${relativePath} : ${formatBytes(before)} → ${formatBytes(after)}`);
    } catch (error) {
      summary.failed += 1;
      console.error(`Erreur pendant le traitement de ${relativePath} : ${error.message}`);
    }
  }

  const savings = summary.before - summary.after;
  const percent = summary.before ? (savings / summary.before) * 100 : 0;
  console.log('\nRésumé');
  console.log(`  Traitées : ${summary.processed}`);
  console.log(`  Ignorées : ${summary.skipped}`);
  console.log(`  Erreurs : ${summary.failed}`);
  console.log(`  Total : ${formatBytes(summary.before)} → ${formatBytes(summary.after)}`);
  console.log(`  Gain : ${formatBytes(savings)} (${percent.toFixed(1)} %)`);

  if (summary.failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Erreur fatale : ${error.message}`);
  process.exitCode = 1;
});
