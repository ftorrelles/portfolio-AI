import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://my-portfolio-ft.netlify.app';
  const locales = ['es', 'en'];
  const paths = ['', '#skills', '#proyectos', '#sobre-mi', '#proceso'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      sitemap.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }

  return sitemap;
}
