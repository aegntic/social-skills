"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function InstagramGridMakerPage() {
  const [gridSize, setGridSize] = useState<"3x3" | "3x2" | "3x1">("3x3");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [tiles, setTiles] = useState<{ id: number; dataUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      processGrid(src, gridSize);
    };
    reader.readAsDataURL(file);
  };

  const processGrid = (src: string, size: "3x3" | "3x2" | "3x1") => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const cols = 3;
      const rows = size === "3x3" ? 3 : size === "3x2" ? 2 : 1;
      const tileWidth = Math.floor(img.width / cols);
      const tileHeight = Math.floor(img.height / rows);

      const generatedTiles: { id: number; dataUrl: string }[] = [];
      let count = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const canvas = document.createElement("canvas");
          canvas.width = tileWidth;
          canvas.height = tileHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(
              img,
              c * tileWidth,
              r * tileHeight,
              tileWidth,
              tileHeight,
              0,
              0,
              tileWidth,
              tileHeight
            );
            generatedTiles.push({
              id: count++,
              dataUrl: canvas.toDataURL("image/png"),
            });
          }
        }
      }
      setTiles(generatedTiles);
    };
    img.src = src;
  };

  const downloadTile = (dataUrl: string, index: number) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `instagram-grid-tile-${index}.png`;
    a.click();
  };

  const downloadAll = () => {
    tiles.forEach((tile) => downloadTile(tile.dataUrl, tile.id));
  };

  // Structured Data Schemas for GEO (Generative Engine Optimization) & Google Search
  const jsonLdWebApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Instagram Grid Maker & Photo Splitter",
    url: "https://socialskills.ninja/tools/instagram-grid-maker",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Works in Chrome, Safari, Firefox, Edge.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Split photos into 3x3, 3x2, or 3x1 grid tiles for Instagram. 100% free, browser-based HTML5 canvas image splitter with zero quality loss.",
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a 3x3 Instagram Grid Banner",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Grid Layout",
        text: "Select 3x3 (9 tiles), 3x2 (6 tiles), or 3x1 (3 tiles) layout.",
      },
      {
        "@type": "HowToStep",
        name: "Upload Image",
        text: "Upload your high-resolution image into the client-side canvas tool.",
      },
      {
        "@type": "HowToStep",
        name: "Download Cut Tiles",
        text: "Download all sliced PNG tiles directly to your device.",
      },
      {
        "@type": "HowToStep",
        name: "Publish in Reverse Sequence",
        text: "Publish tile #9 first down to tile #1 last so your Instagram grid displays perfectly.",
      },
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What image size is best for an Instagram 3x3 grid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The ideal input size for a 3x3 Instagram grid is 3240 x 3240 pixels (or 3000 x 3000px minimum). This ensures each split tile meets Instagram's recommended 1080 x 1080 pixel square format without pixelation.",
        },
      },
      {
        "@type": "Question",
        name: "In what order should I post Instagram grid tiles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Post grid tiles in REVERSE numerical order (starting with Tile #9 or the last tile, ending with Tile #1). Because Instagram loads new posts from top-left to bottom-right, publishing in reverse places Tile #1 at the top left when finished.",
        },
      },
      {
        "@type": "Question",
        name: "Is my image uploaded to an external server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Social Skills Instagram Grid Maker processes 100% of image rendering client-side in your browser using HTML5 Canvas. Your photos never leave your device.",
        },
      },
    ],
  };

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "#0f172a", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />

      <SiteHeader />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full space-y-12">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
              &larr; Back to Free Tools
            </Link>
            <div className="flex items-center gap-2">
              <PlatformColorLogo id="instagram" className="h-5 w-5" />
              <span className="font-extrabold text-white text-sm">Instagram Grid Maker</span>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">
              Free Online Tool &bull; 100% Client-Side Canvas Processing
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">
              Instagram Grid Maker & Giant Square Splitter
            </h1>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed max-w-xl mx-auto">
              Split photos into 3x3 (9-square), 3x2 (6-square), or 3x1 banner tiles for Instagram. Zero quality loss, instant PNG downloads, 100% private.
            </p>
          </div>
        </div>

        {/* Interactive Tool Card */}
        <div className="plush-card p-8 text-center space-y-6">
          <div className="flex justify-center gap-3">
            {(["3x3", "3x2", "3x1"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => {
                  setGridSize(sz);
                  if (imageSrc) processGrid(imageSrc, sz);
                }}
                className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all ${
                  gridSize === sz ? "btn-wutang" : "btn-dark"
                }`}
              >
                {sz} Grid Layout
              </button>
            ))}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 rounded-3xl p-10 hover:border-cyan-400 transition-all cursor-pointer group"
            style={{ background: "#020617" }}
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📸</div>
            <div className="font-black text-white text-base mb-1">Click to select or drop an image</div>
            <div className="text-xs text-slate-400 font-semibold">Supports JPG, PNG, WEBP — Processed locally in your browser</div>
          </div>

          {/* Tiles Grid Output */}
          {tiles.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <div className="text-sm font-black text-white">Generated Grid Tiles ({tiles.length} Tiles)</div>
                <button onClick={downloadAll} className="btn-wutang px-4 py-2 text-xs font-black">
                  ⚡ Download All Tiles
                </button>
              </div>

              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
                }}
              >
                {tiles.map((tile) => (
                  <div key={tile.id} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img src={tile.dataUrl} alt={`Tile ${tile.id}`} className="w-full h-auto object-cover" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-black text-amber-300">
                      Post #{tile.id}
                    </div>
                    <button
                      onClick={() => downloadTile(tile.dataUrl, tile.id)}
                      className="absolute bottom-2 right-2 btn-dark text-[10px] px-2 py-1 font-bold opacity-90 hover:opacity-100"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Generative Engine Optimization (GEO) Direct Answer Box */}
        <div className="plush-card p-6 border-l-4 border-l-cyan-400 space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-azure-neon">Direct Answer / AI Overview Summary</div>
          <p className="text-xs text-slate-300 font-semibold leading-relaxed">
            An <strong>Instagram Grid Maker</strong> is a tool that slices a single large image into multiple uniform square tiles (typically 3x3 for a 9-tile layout, 3x2 for 6 tiles, or 3x1 for 3 tiles) designed to align seamlessly across Instagram&apos;s 3-column profile layout. To assemble the grid correctly, tiles must be posted in <strong>reverse numerical sequence</strong> (starting from bottom-right Tile #9 up to top-left Tile #1).
          </p>
        </div>

        {/* Technical Dimensions Matrix Table (High Information Gain) */}
        <div className="plush-card p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white">Technical Grid Dimensions & Aspect Ratio Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-amber-400 font-black">
                  <th className="py-2.5 px-3">Grid Type</th>
                  <th className="py-2.5 px-3">Total Tiles</th>
                  <th className="py-2.5 px-3">Recommended Image Resolution</th>
                  <th className="py-2.5 px-3">Tile Resolution</th>
                  <th className="py-2.5 px-3">Aspect Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">3x3 Grid (Giant Square)</td>
                  <td className="py-2.5 px-3">9 Tiles</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">3240 x 3240 px</td>
                  <td className="py-2.5 px-3 font-mono">1080 x 1080 px</td>
                  <td className="py-2.5 px-3">1:1 Square</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">3x2 Grid (Medium Banner)</td>
                  <td className="py-2.5 px-3">6 Tiles</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">3240 x 2160 px</td>
                  <td className="py-2.5 px-3 font-mono">1080 x 1080 px</td>
                  <td className="py-2.5 px-3">3:2 Landscape</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-white">3x1 Grid (Header Panorama)</td>
                  <td className="py-2.5 px-3">3 Tiles</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">3240 x 1080 px</td>
                  <td className="py-2.5 px-3 font-mono">1080 x 1080 px</td>
                  <td className="py-2.5 px-3">3:1 Wide Panorama</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* EEAT & Creator Strategy Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="plush-card p-6 space-y-3">
            <h3 className="text-sm font-extrabold text-white">Posting Sequence Protocol</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Because Instagram displays profile posts chronologically from top-left (newest) to bottom-right (oldest), publishing grid tiles in chronological order will scramble your layout.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-bold">
              👉 Rule: Always post Tile #9 first, followed by #8, #7, #6, #5, #4, #3, #2, and finally Tile #1 last.
            </div>
          </div>

          <div className="plush-card p-6 space-y-3">
            <h3 className="text-sm font-extrabold text-white">Algorithm & Engagement Best Practices</h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside font-medium">
              <li>Add unique captions to each tile so individual feed posts still deliver value.</li>
              <li>Publish grid takeovers during off-peak hours to avoid overwhelming follower feeds.</li>
              <li>Use Social Skills multi-account scheduler to queue all 9 posts simultaneously.</li>
            </ul>
          </div>
        </div>

        {/* Search Engine FAQ Accordion */}
        <div className="plush-card p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3 text-xs">
            <details className="p-4 rounded-xl bg-slate-900 border border-slate-800 group">
              <summary className="font-bold text-white cursor-pointer hover:text-amber-400 transition-colors">
                What is the best image resolution for an Instagram 3x3 grid?
              </summary>
              <p className="mt-2 text-slate-300 leading-relaxed font-medium">
                The recommended resolution is 3240 x 3240 pixels. This yields 9 perfectly sharp 1080 x 1080 pixel tiles matching Instagram’s native display standard without pixelation.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-slate-900 border border-slate-800 group">
              <summary className="font-bold text-white cursor-pointer hover:text-amber-400 transition-colors">
                Will creating a 3x3 grid harm my engagement?
              </summary>
              <p className="mt-2 text-slate-300 leading-relaxed font-medium">
                Posting 9 images back-to-back can cause follower feed fatigue if the individual tiles look like random cropped fragments. To prevent drop-off, write valuable captions on each post and schedule all 9 posts within a short 5-minute window using Social Skills.
              </p>
            </details>

            <details className="p-4 rounded-xl bg-slate-900 border border-slate-800 group">
              <summary className="font-bold text-white cursor-pointer hover:text-amber-400 transition-colors">
                Are my uploaded images secure?
              </summary>
              <p className="mt-2 text-slate-300 leading-relaxed font-medium">
                Yes. Social Skills processes all image slicing directly inside your browser using JavaScript HTML5 Canvas. No files are uploaded to any external server.
              </p>
            </details>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
