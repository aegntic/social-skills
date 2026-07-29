import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("Packing Social Skills site routes for Google Stitch project import...");

const pagesDir = path.join(rootDir, "src/app");
const componentsDir = path.join(rootDir, "src/components");

function getAllFiles(dir, ext = ".tsx") {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, ext));
    } else if (file.endsWith(ext) || file.endsWith(".ts") || file.endsWith(".css")) {
      results.push(filePath);
    }
  });
  return results;
}

const pageFiles = getAllFiles(pagesDir);
const componentFiles = getAllFiles(componentsDir);
const globalsCss = path.join(rootDir, "src/app/globals.css");

const projectData = {
  name: "Social Skills Ninja — AI Cross-Publishing Engine",
  version: "1.0.0",
  theme: {
    baseBackground: "#0b0d14",
    cardBackground: "#151924",
    primaryAccent: "#ffc800", // Wu-Tang Yellow
    secondaryAccent: "#00f0ff", // Azure Neon
    fontFamily: "Geist, sans-serif"
  },
  routes: [],
  components: [],
  globalStyles: ""
};

if (fs.existsSync(globalsCss)) {
  projectData.globalStyles = fs.readFileSync(globalsCss, "utf8");
}

pageFiles.forEach((file) => {
  const relPath = path.relative(rootDir, file);
  const routePath = relPath.replace(/^src\/app/, "").replace(/\/page\.tsx$/, "").replace(/^$/, "/");
  const content = fs.readFileSync(file, "utf8");
  projectData.routes.push({
    route: routePath || "/",
    file: relPath,
    code: content
  });
});

componentFiles.forEach((file) => {
  const relPath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, "utf8");
  projectData.components.push({
    name: path.basename(file, path.extname(file)),
    file: relPath,
    code: content
  });
});

const outputPath = path.join(rootDir, "STITCH_PROJECT_EXPORT.json");
fs.writeFileSync(outputPath, JSON.stringify(projectData, null, 2), "utf8");
console.log(`Successfully generated ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);

// Generate Markdown Manifest for Human & Stitch Importer
let markdownContent = `# 🌌 Social Skills — Google Stitch Full Project Manifest

> Complete project export containing all **${projectData.routes.length} pages**, **${projectData.components.length} components**, and full Obsidian Dark design tokens for import into **Google Stitch**.

---

## 🎨 Design System & Theme Tokens

- **Base Background**: \`#0b0d14\` (Obsidian Dark Studio)
- **Card Container**: \`#151924\` (Plush Slate)
- **Primary CTA**: \`#ffc800\` (Wu-Tang Yellow Metallic)
- **Secondary CTA**: \`#00f0ff\` (Azure Cyan Neon)

---

## 📄 Exported Pages & Routes (${projectData.routes.length} total)

`;

projectData.routes.sort((a, b) => a.route.localeCompare(b.route)).forEach((r) => {
  markdownContent += `### 🔗 Route: \`${r.route}\` (\`${r.file}\`)\n\n\`\`\`tsx\n${r.code.slice(0, 300)}...\n\`\`\`\n\n---\n\n`;
});

markdownContent += `## 🧩 Component Registry (${projectData.components.length} total)\n\n`;

projectData.components.forEach((c) => {
  markdownContent += `- **${c.name}** (\`${c.file}\`)\n`;
});

const manifestPath = path.join(rootDir, "STITCH_SITE_MANIFEST.md");
fs.writeFileSync(manifestPath, markdownContent, "utf8");
console.log(`Successfully generated ${manifestPath}`);

// Copy manifest to home dir for xdg-open
const homeManifestPath = "/home/ae/STITCH_SITE_MANIFEST.md";
fs.writeFileSync(homeManifestPath, markdownContent, "utf8");

console.log("Stitch project export completed!");
