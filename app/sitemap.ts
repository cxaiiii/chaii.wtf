import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return ['','/vasudha','/photonica','/akshara','/studio'].map((path) => ({ url: `https://chaii.wtf${path}`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' : 'monthly', priority: path === '' ? 1 : .8 })); }
