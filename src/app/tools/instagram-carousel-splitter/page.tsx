"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/Shell";
import { PlatformColorLogo } from "@/components/PlatformColorLogo";

export default function CarouselSplitterPage() {
  const [slidesCount, setSlidesCount] = useState(3);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [slides, setSlides] = useState<{ id: number; dataUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      processCarousel(src, slidesCount);
    };
    reader.readAsDataURL(file);
  };

  const processCarousel = (src: string, count: number) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const slideWidth = Math.floor(img.width / count);
      const slideHeight = img.height;

      const generatedSlides: { id: number; dataUrl: string }[] = [];

      for (let i = 0; i < count; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = slideWidth;
        canvas.height = slideHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            img,
            i * slideWidth,
            0,
            slideWidth,
            slideHeight,
            0,
            0,
            slideWidth,
            slideHeight
          );
          generatedSlides.push({
            id: i + 1,
            dataUrl: canvas.toDataURL("image/png"),
          });
        }
      }
      setSlides(generatedSlides);
    };
    img.src = src;
  };

  const downloadSlide = (dataUrl: string, index: number) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `carousel-slide-${index}.png`;
    a.click();
  };

  const downloadAll = () => {
    slides.forEach((slide) => downloadSlide(slide.dataUrl, slide.id));
  };

  return (
    <div style={{ background: "var(--bg-page-gradient)", color: "rgb(var(--c-ink))", minHeight: "100vh" }} className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <Link href="/tools" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            &larr; Back to Free Tools
          </Link>
          <div className="flex items-center gap-2">
            <PlatformColorLogo id="instagram" className="h-5 w-5" />
            <span className="font-extrabold text-white text-sm">Instagram Carousel Splitter</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">Instagram Carousel Splitter</h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto font-bold">
            Split wide panoramic photos into seamless multi-slide carousel posts for Instagram & LinkedIn.
          </p>
        </div>

        <div className="plush-card p-8 mb-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="text-xs font-extrabold text-slate-300">Number of Slides:</span>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSlidesCount(num);
                  if (imageSrc) processCarousel(imageSrc, num);
                }}
                className={`h-9 w-9 rounded-xl font-black text-xs transition-all ${
                  slidesCount === num ? "btn-wutang" : "btn-dark"
                }`}
              >
                {num}
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

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 rounded-3xl p-10 hover:border-cyan-400 transition-all cursor-pointer group"
            style={{ background: "rgb(var(--c-fill-3))" }}
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
            <div className="font-black text-white text-base mb-1">Click to select panoramic image</div>
            <div className="text-xs text-slate-400 font-semibold">Crops into {slidesCount} seamless carousel slides</div>
          </div>

          {/* Slides Output */}
          {slides.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <div className="text-sm font-black text-white">Generated Carousel Slides ({slides.length} Slides)</div>
                <button onClick={downloadAll} className="btn-wutang px-4 py-2 text-xs font-black">
                  ⚡ Download All Slides
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {slides.map((slide) => (
                  <div key={slide.id} className="min-w-[200px] max-w-[240px] flex-shrink-0 relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img src={slide.dataUrl} alt={`Slide ${slide.id}`} className="w-full h-auto object-cover" />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-black text-cyan-300">
                      Slide {slide.id}/{slides.length}
                    </div>
                    <button
                      onClick={() => downloadSlide(slide.dataUrl, slide.id)}
                      className="absolute bottom-2 right-2 btn-dark text-[10px] px-2.5 py-1 font-bold opacity-90 hover:opacity-100"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
