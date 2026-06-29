export default defineEventHandler(async (event) => {
  const url = "https://raw.githubusercontent.com/TransHelper/.github/refs/heads/main/profile/README.md";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "TransHelper/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    const text = await res.text();

    setResponseHeader(event, "Cache-Control", "public, max-age=300, s-maxage=3600");
    setResponseHeader(event, "CDN-Cache-Control", "public, max-age=3600");
    return text;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw createError({ statusCode: 502, statusMessage: message });
  }
});