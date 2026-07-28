"use client";

import { useEffect, useRef, useState } from "react";

const PLATFORMS = [
  { name: "X", color: "#000000", bg: "#ffffff", handle: "@aegntic" },
  { name: "Instagram", color: "#E1306C", bg: "#fafafa", handle: "@aegntic" },
  { name: "LinkedIn", color: "#0A66C2", bg: "#f3f2ef", handle: "aegntic" },
  { name: "TikTok", color: "#000000", bg: "#ffffff", handle: "@aegntic" },
  { name: "Threads", color: "#000000", bg: "#ffffff", handle: "@aegntic" },
  { name: "Bluesky", color: "#0085FF", bg: "#ffffff", handle: "@aegntic.bsky.social" },
  { name: "YouTube", color: "#FF0000", bg: "#ffffff", handle: "@aegntic" },
  { name: "Pinterest", color: "#E60023", bg: "#ffffff", handle: "aegntic" },
  { name: "Mastodon", color: "#6364FF", bg: "#ffffff", handle: "@aegntic@mastodon.social" },
  { name: "Google Business", color: "#4285F4", bg: "#ffffff", handle: "aegntic" },
];

const POSTS = [
  "Just shipped the new feature. Here's what I learned...",
  "Thread: 10 things nobody tells you about building in public",
  "The metric that actually matters isn't what you think",
  "Stop optimizing for likes. Start optimizing for signal.",
  "My entire workflow in one screenshot:",
  "Hot take: Most 'best practices' are just cargo culting",
  "Building the thing vs talking about building the thing",
  "The compound effect of shipping daily for 365 days",
  "Why I deleted 80% of my code and moved faster",
  "The uncomfortable truth about 'viral' content",
];

type Phase = "loading" | "scrolling" | "blur" | "reveal";

function BrowserWindow({ platform, posts, speed, phase, index }: {
  platform: typeof PLATFORMS[0];
  posts: string[];
  speed: number;
  phase: Phase;
  index: number;
}) {
  const [currentPost, setCurrentPost] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPost((prev) => (prev + 1) % posts.length);
    }, speed);

    const scrollInterval = setInterval(() => {
      setScrollY((prev) => prev + speed / 10);
    }, 16);

    return () => {
      clearInterval(interval);
      clearInterval(scrollInterval);
    };
  }, [speed, posts.length]);

  const isBlurry = phase === "blur";

  return (
    <div
      className="browser-window"
      style={{
        background: platform.bg,
        borderColor: platform.color,
        filter: isBlurry ? `blur(${4 + index * 0.3}px)` : "none",
        opacity: isBlurry ? 0.4 : 1,
        transform: isBlurry ? `scale(0.85) rotate(${(index - 5) * 1.5}deg)` : "scale(1)",
        zIndex: PLATFORMS.length - index,
      }}
    >
      <div className="browser-chrome" style={{ borderBottomColor: platform.color }}>
        <div className="traffic-lights">
          <span style={{ background: "#FF5F57" }} />
          <span style={{ background: "#FEBC2E" }} />
          <span style={{ background: "#28CA42" }} />
        </div>
        <div className="url-bar" style={{ background: platform.bg, color: platform.color }}>
          {platform.name.toLowerCase()}.com/{platform.handle}
        </div>
      </div>
      <div className="feed" style={{ transform: `translateY(-${scrollY}px)` }}>
        {posts.map((post, i) => (
          <div
            key={i}
            className="post"
            style={{
              opacity: i === currentPost ? 1 : 0.4,
              transform: i === currentPost ? "scale(1.02)" : "scale(1)",
              borderLeftColor: platform.color,
            }}
          >
            <div className="post-header">
              <div className="avatar" style={{ background: platform.color }} />
              <span className="handle" style={{ color: platform.color }}>{platform.handle}</span>
              <span className="dot" />
              <span className="time">just now</span>
            </div>
            <p className="post-text">{post}</p>
            <div className="post-stats">
              <span>♥ {Math.floor(Math.random() * 5000)}</span>
              <span>↗ {Math.floor(Math.random() * 500)}</span>
              <span>💬 {Math.floor(Math.random() * 200)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DoomscrollHero() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("scrolling"), 2000));
    timers.push(setTimeout(() => setPhase("blur"), 5500));
    timers.push(setTimeout(() => setPhase("reveal"), 7500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const speeds: Record<Exclude<Phase, "reveal">, number> = {
    loading: 3000,
    scrolling: 800,
    blur: 100,
  };

  if (phase === "reveal") {
    return (
      <div className="reveal-container">
        <img
          src="/whyareyoulikethis.png"
          alt="why are you like this"
          className="reveal-image"
        />
      </div>
    );
  }

  const speed = speeds[phase];

  return (
    <div className="doomscroll-hero">
      <div className="browser-grid">
        {PLATFORMS.map((platform, i) => (
          <BrowserWindow
            key={platform.name}
            platform={platform}
            posts={POSTS.slice(i * 2, i * 2 + 4)}
            speed={speed}
            phase={phase}
            index={i}
          />
        ))}
      </div>
      <div className="loading-text">
        {phase === "loading" && "loading social apps..."}
        {phase === "scrolling" && "doomscrolling..."}
        {phase === "blur" && "it's all a blur..."}
      </div>
    </div>
  );
}