import { getImage } from 'astro:assets'
import { v2 as cloudinary } from 'cloudinary'
import type { ImageMetadata } from 'astro'

/** Open Graph / Twitter large-card size (1.91:1). */
export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/** Used when a page has no featured image of its own. */
export const DEFAULT_OG_IMAGE = 'about/teamlab-fukuoka'

const localImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
)
const localPrefix = '/src/assets/images/'

/**
 * Resolves an image id (the `featured_image_src` used across the site) to an
 * absolute 1200x630 JPEG URL. Local files in src/assets/images win over
 * Cloudinary, mirroring BaseImage. Social crawlers need absolute URLs, and
 * JPEG/PNG rather than WebP.
 */
export async function getOgImageUrl(src: string, site: URL | string) {
  const local = Object.entries(localImages).find(
    ([path]) => path.slice(localPrefix.length).replace(/\.[^.]+$/, '') === src,
  )?.[1].default

  if (local) {
    const image = await getImage({
      src: local,
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fit: 'cover',
      format: 'jpg',
      quality: 85,
    })
    return new URL(image.src, site).href
  }

  cloudinary.config({
    cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    analytics: false,
  })

  return cloudinary.url(src, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    fetch_format: 'jpg',
    secure: true,
  })
}
