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

function BrowserWindow({ platform, posts, speed, onBlur, onComplete, style }: {
  platform: typeof PLATFORMS[0];
  posts: string[];
  speed: number;
  onBlur: () => void;
  onComplete: () => void;
  style?: React.CSSProperties;
}) {
  const [currentPost, setCurrentPost] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showChrome, setShowChrome] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (speed > 800) {
      setShowChrome(false);
      onBlur();
    }
    if (speed > 200) {
      const t = setTimeout(onComplete, 2000);
      return () => clearTimeout(t);
    }
  }, [speed, onBlur, onComplete]);

  return (
    <div
      ref={containerRef}
      className="browser-window"
      style={{
        background: platform.bg,
        borderColor: platform.color,
        transform: `scale(${showChrome ? 1 : 0.3})`,
        opacity: showChrome ? 1 : 0,
        filter: speed > 400 ? `blur(${Math.min((speed - 400) / 200, 8)}px)` : "none",
        ...style,
      }}
    >
      {showChrome && (
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
      )}
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
  const [phase, setPhase] = useState<"loading" | "scrolling" | "blur" | "reveal">("loading");
  const [speed, setSpeed] = useState(3000);
  const windowsRef = useRef<HTMLDivElement>(null);
  const completedCount = useRef(0);

  useEffect(() => {
    if (phase === "loading") {
      const timer = setTimeout(() => {
        setPhase("scrolling");
        setSpeed(800);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (phase === "scrolling") {
      const timer = setTimeout(() => {
        setPhase("blur");
        setSpeed(100);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === "blur") {
      const timer = setTimeout(() => {
        setPhase("reveal");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, speed]);

  const handleWindowComplete = () => {
    completedCount.current += 1;
    if (completedCount.current >= PLATFORMS.length) {
      setPhase("blur");
      setSpeed(50);
    }
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

  return (
    <div className="doomscroll-hero">
      <div className="browser-grid" ref={windowsRef}>
        {PLATFORMS.map((platform, i) => (
          <BrowserWindow
            key={platform.name}
            platform={platform}
            posts={POSTS.slice(i * 2, i * 2 + 4)}
            speed={speed}
            onBlur={handleWindowComplete}
            onComplete={handleWindowComplete}
            style={{
              animationDelay: `${i * 100}ms`,
              zIndex: PLATFORMS.length - i,
            }}
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