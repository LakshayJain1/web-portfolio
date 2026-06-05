import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "../data/blogs";
import { getAllProjectSlugs } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = "https://devlakshay.dev";

  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = getAllBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...projectPages,
    ...blogPages,
  ];
}
