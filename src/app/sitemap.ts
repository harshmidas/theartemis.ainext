async function getJobs() {
  try {
    const res = await fetch(
      "https://tenantapi.theartemis.ai/api/v1/jobs",
      {
        headers: {
          "X-Tenant": "68b20dd0fb42964f2328b424",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Jobs API failed:", res.status);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid jobs response");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return [];
  }
}

export default async function sitemap() {
  try {
    const jobs = await getJobs();

    const jobUrls = jobs.map((job: any) => ({
      url: `https://theartemis.ai/jobs/${job.id}`,
      lastModified: new Date(job.updatedAt || Date.now()),
    }));

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
  } catch (error) {
    console.error("Sitemap error:", error);

    return [
      {
        url: "https://theartemis.ai",
        lastModified: new Date(),
      },
    ];
  }
}