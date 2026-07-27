"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction to reveal from. */
  from?: "up" | "down" | "left" | "right" | "scale" | "fade";
  /** Delay in seconds. */
  delay?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Stagger children with this selector. */
  stagger?: number;
  /** Only trigger once (default true). */
  once?: boolean;
  /** Start position for ScrollTrigger. */
  start?: string;
};

const OFFSETS: Record<string, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },
  down: { y: -60, opacity: 0 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
  scale: { scale: 0.85, opacity: 0 },
  fade: { opacity: 0 },
};

export function ScrollReveal({
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.9,
  stagger,
  once = true,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? el.querySelectorAll(":scope > *") : el;
    const fromVars = OFFSETS[from];

    const ctx = gsap.context(() => {
      gsap.set(targets, fromVars);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      tl.to(targets, {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        stagger: stagger || 0,
        ease: "expo.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [from, delay, duration, stagger, once, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Parallax wrapper ───
   Moves the child element at a different rate than scroll.
   speed > 0 = slower (background drift), speed < 0 = faster. */

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  /** Optional axis: y (vertical, default) or x (horizontal). */
  axis?: "y" | "x";
};

export function Parallax({
  children,
  className,
  speed = 0.3,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        [axis]: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed, axis]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Counter animation ───
   Animates a number from 0 to target when scrolled into view. */

export function CounterTo({
  target,
  suffix = "",
  prefix = "",
  className,
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [target, suffix, prefix, duration]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

/* ─── Pinned section header ───
   Creates a magnetic/pinned heading that stays while content scrolls. */

export function MagneticHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0, filter: "blur(8px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return <h2 ref={ref} className={className}>{children}</h2>;
}
