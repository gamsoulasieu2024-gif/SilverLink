import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const siteUrl = (process.env.SITE_URL || "https://gamsoulasieu2024-gif.github.io/SilverLink").replace(/\/$/, "");
const outDir = join(root, "dist");
const outFile = join(outDir, "rss.xml");

if (!existsSync(outDir)) {
  console.warn("generate-rss: dist/ not found, skipping (run after vite build)");
  process.exit(0);
}

const raw = readFileSync(join(root, "data/threads.json"), "utf8");
const threads = JSON.parse(raw);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const itemLink = (id) => `${siteUrl}/thread/${id}`;

const items = threads.slice(0, 30).map((t) => {
  return `
    <item>
      <title>${esc(t.question.slice(0, 200))}</title>
      <link>${esc(itemLink(t.id))}</link>
      <guid isPermaLink="true">${esc(itemLink(t.id))}</guid>
      <description>${esc(t.category + " — " + t.helpful_count + " helpful.")}</description>
    </item>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SilverLink — recent questions</title>
    <link>${esc(siteUrl + "/")}</link>
    <description>Peer tech support for older adults. Recent questions from the community.</description>
    <language>en</language>
    ${items.join("")}
  </channel>
</rss>
`;

writeFileSync(outFile, xml, "utf8");
console.log("Wrote", outFile);
