/**
 * Comprime y redimensiona una imagen en el navegador antes de subirla a Supabase Storage.
 * Convierte a WebP (máx. 1600 px de ancho/alto, calidad 0.8).
 * Una foto de celular de 4-8 MB suele quedar en 150-400 KB.
 */
export async function compressImage(
  file: File,
  maxSize = 1600,
  quality = 0.8
): Promise<File> {
  // Si no es imagen (o es SVG/GIF), se sube tal cual
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/webp', quality)
    );
    if (!blob || blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, '');
    return new File([blob], `${baseName}.webp`, { type: 'image/webp' });
  } catch {
    return file; // Si el navegador no puede procesarla, se sube la original
  }
}

/** Opciones de subida: caché de 1 año en navegador y CDN (los nombres de archivo son únicos). */
export const UPLOAD_OPTIONS = { cacheControl: '31536000', upsert: false } as const;
