async function getJobs() {
  try {
    const res = await fetch(
      "https://tenantapi.theartemis.ai/api/v1/jobs",
      { cache: "no-store" }
    );
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const jobs = await getJobs();

  const jobUrls =
    jobs?.map((job: any) => ({
      url: `https://theartemis.ai/jobs/${job.id}`,
      lastModified: new Date(job.updatedAt || Date.now()),
    })) || [];

  return [
    {
      url: "https://theartemis.ai",
      lastModified: new Date(),
    },
    {
      url: "https://theartemis.ai/jobs",
      lastModified: new Date(),
    },
    ...jobUrls,
  ];
}