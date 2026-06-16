import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/")(  {
  component: Tribute,
});

const IMG = {
  hero: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592250/0f19fae64fa944afb0543e21fe6e890f_q0yc4d.jpg",
  portrait:
    "https://res.cloudinary.com/dk32rkate/image/upload/v1781592249/f080087074ea400d9838a5d62caeb86d_gckpzv.jpg",
  three:
    "https://res.cloudinary.com/dk32rkate/image/upload/v1781592250/fcb9de60e5c54239b38dccd3a9c8ac7d_wryram.jpg",
  been: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592030/Been_a_bit_around_here_w4nmtx.webp",
  closing:
    "https://res.cloudinary.com/dk32rkate/image/upload/v1781592030/A_Happy_Birthday_to_Me_A_Happy_Birthday_to_The_Oparachukwu_Joshua_AyodejiBaba_for_the_Gift_of_L_i5p30d.webp",
};
const VID = {
  one: "https://res.cloudinary.com/dk32rkate/video/upload/v1781592038/AQOcHWHCJ9vdjaohH2woM-7T7tywYufRnmr2QEw5VbVSIRquCV_tZwbTo8KDzYqUx2fQR5xO0Z9-iNzO2iiYD-pXQpCqWvM7_iwrfi0.mp4",
  two: "https://res.cloudinary.com/dk32rkate/video/upload/v1781592181/VID-20260616-WA0010_lr8caq.mp4",
};

const elementImages = [IMG.been, IMG.hero, IMG.closing];

const messages = [
  { text: "Peter of God", emphasis: true },
  {
    text: "It\u2019s always a pleasure to see how you\u2019ve turned out \u2014 and especially because you\u2019re not a stranger to good work.",
  },
  {
    text: "If you maintain your trajectory, you\u2019ll be an employer on or before you graduate from school.",
  },
  {
    text: "It shouldn\u2019t be long before you are an actual triple digit millionaire.",
  },
  {
    text: "My prayer for you is: as many have become millionaires through me, you too would become more, and greater \u2014 especially as you continue to stay the course and apply yourself to work and opportunity.",
  },
  { text: "Your future is bright, Peter.", emphasis: true },
];

const tributeParagraphs = [
  "Before I had proof, before I had results, before I had anything worth pointing to \u2014 you saw it. You called me \u2018Peter of God\u2019 and you meant it. You told me my future was bright at a time when I could barely see past the next step. That kind of belief doesn\u2019t just encourage a person \u2014 it changes them. It gives them something to grow into.",
  "You lead with your life. You mentor without making it feel like a lesson. You pour into people so naturally that they don\u2019t realize until later how much of who they\u2019re becoming traces back to you.",
  "On this day, I want you to know \u2014 not just as a formality, but as a fact: the way you\u2019ve shown up for the people around you is something we don\u2019t take for granted. You are the reason some of us dream bigger. You are the reason some of us didn\u2019t quit.",
  "Happy birthday, Mr. Oparachukwu Joshua Ayodeji. May this year return to you everything you\u2019ve given out \u2014 multiplied, and then some.",
];

function LazyVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (!v.src) v.src = v.dataset.src || "";
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      data-src={src}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      style={style}
    />
  );
}

function Tribute() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Custom cursor (desktop only)
    const isMobile = window.innerWidth <= 768;
    let cursorCleanup: (() => void) | null = null;

    if (!isMobile && !prefersReducedMotion && cursorRef.current) {
      const cursor = cursorRef.current;
      const xTo = gsap.quickTo(cursor, "left", {
        duration: 0.4,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursor, "top", {
        duration: 0.4,
        ease: "power3",
      });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onEnterMedia = () => cursor.classList.add("hovering");
      const onLeaveMedia = () => cursor.classList.remove("hovering");

      window.addEventListener("mousemove", onMove);

      const mediaEls = document.querySelectorAll("img, video");
      mediaEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnterMedia);
        el.addEventListener("mouseleave", onLeaveMedia);
      });

      cursorCleanup = () => {
        window.removeEventListener("mousemove", onMove);
        mediaEls.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterMedia);
          el.removeEventListener("mouseleave", onLeaveMedia);
        });
      };
    }

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-name-1",
            ".hero-name-2",
            ".hero-line",
            ".hero-date",
            ".quote-msg",
            ".quote-bleed-img",
            ".portrait-img",
            ".portrait-content > *",
            ".element-panel",
            ".tribute-p",
            ".tribute-inline-vid",
            ".closing-gold-line",
            ".closing-content > *",
            ".closing-final-line",
          ],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1, scaleX: 1 },
        );
        return;
      }

      // Hero intro
      const tl = gsap.timeline();
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 })
        .from(
          ".hero-name-1",
          { opacity: 0, y: 60, duration: 1, ease: "power3.out" },
          "+=0.1",
        )
        .from(
          ".hero-name-2",
          { opacity: 0, y: 60, duration: 1, ease: "power3.out" },
          "-=0.7",
        )
        .from(
          ".hero-line",
          { scaleX: 0, duration: 0.6, transformOrigin: "center" },
          "-=0.3",
        )
        .from(".hero-date", { opacity: 0, duration: 0.8 }, "-=0.2");

      // Quotes
      gsap.utils.toArray<HTMLElement>(".quote-msg").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.05 + 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Quote bleed image
      gsap.from(".quote-bleed-img", {
        scale: 1.08,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: ".quote-bleed-img", start: "top 85%" },
      });

      // Parallax on all full-bleed images
      gsap.utils
        .toArray<HTMLElement>(".parallax-img")
        .forEach((el) => {
          gsap.to(el, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          });
        });

      // Portrait section
      gsap.from(".portrait-img", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: ".portrait-section", start: "top 85%" },
      });
      gsap.from(".portrait-content > *", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.15,
        scrollTrigger: { trigger: ".portrait-section", start: "top 85%" },
      });

      // "In His Element" panels
      gsap.utils
        .toArray<HTMLElement>(".element-panel")
        .forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.15 + 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

      // Tribute paragraphs
      gsap.utils.toArray<HTMLElement>(".tribute-p").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: i * 0.2 + 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Tribute inline video
      gsap.from(".tribute-inline-vid", {
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: { trigger: ".tribute-inline-vid", start: "top 85%" },
      });

      // Closing gold line
      gsap.to(".closing-gold-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".closing-section", start: "top 70%" },
      });

      // Closing content
      gsap.from(".closing-content > *", {
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut",
        stagger: 0.3,
        delay: 0.15,
        scrollTrigger: { trigger: ".closing-section", start: "top 70%" },
      });

      // Final line
      gsap.from(".closing-final-line", {
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        delay: 1,
        scrollTrigger: { trigger: ".closing-final-line", start: "top 90%" },
      });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, pageRef);

    return () => {
      ctx.revert();
      if (cursorCleanup) cursorCleanup();
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-[#faf8f4] text-[#1a1a1a] overflow-x-hidden">
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background video */}
        <video
          src={VID.one}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay so text stays legible */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,13,13,0.82)", zIndex: 1 }}
        />
        <div className="relative z-10 text-center max-w-5xl">
          <div className="hero-eyebrow label-eyebrow mb-8">Happy Birthday</div>
          <h1
            className="hero-name-1 font-display font-light leading-[1.05] text-[#F5F0E8]"
            style={{ fontSize: "clamp(64px, 11vw, 120px)" }}
          >
            Oparachukwu
          </h1>
          <h2
            className="hero-name-2 font-display italic font-semibold leading-[1.05] text-[#F5F0E8]"
            style={{ fontSize: "clamp(56px, 10vw, 110px)" }}
          >
            Joshua Ayodeji
          </h2>
          <div
            className="hero-line mx-auto mt-10 h-px bg-[#C9A84C]"
            style={{ width: 80 }}
          />
          <div
            className="hero-date mt-6 font-sans-body font-light tracking-[0.32em] text-[#F5F0E8]/60"
            style={{ fontSize: 14 }}
          >
            JUNE 16, 2026
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* ─── QUOTES ─── */}
      <section
        className="px-6 bg-[#faf8f4]"
        style={{ paddingTop: 120, paddingBottom: 80 }}
      >
        <div className="mx-auto max-w-[680px]">
          <div className="label-eyebrow text-center mb-16">
            His words. Before anyone else believed.
          </div>
          <div className="space-y-12">
            {messages.map((m, i) => (
              <div
                key={i}
                className="quote-msg text-center"
                style={
                  m.emphasis
                    ? {
                        fontFamily: "Cormorant Garamond, serif",
                        fontStyle: "italic",
                        fontSize: "clamp(28px, 5vw, 42px)",
                        color: "#b8943f",
                        textShadow: "0 0 40px rgba(184,148,63,0.15)",
                        lineHeight: 1.3,
                      }
                    : {
                        fontFamily: "Cormorant Garamond, serif",
                        fontWeight: 300,
                        fontSize: "clamp(20px, 3vw, 26px)",
                        color: "#1a1a1a",
                        lineHeight: 1.7,
                      }
                }
              >
                &ldquo;{m.text}&rdquo;
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE BLEED IMAGE ─── */}
      <section className="overflow-hidden">
        <img
          src={IMG.three}
          alt=""
          loading="lazy"
          decoding="async"
          className="quote-bleed-img parallax-img"
        />
      </section>

      {/* ─── PORTRAIT SPLIT ─── */}
      <section
        className="portrait-section grid md:grid-cols-2 bg-[#faf8f4]"
        style={{ minHeight: "80vh" }}
      >
        <div className="relative min-h-[60vh] md:min-h-full overflow-hidden">
          <img
            src={IMG.portrait}
            alt="Mr. Oparachukwu Joshua Ayodeji"
            loading="lazy"
            decoding="async"
            className="portrait-img absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "sepia(10%) brightness(0.95)",
              objectPosition: "center top",
            }}
          />
        </div>
        <div
          className="portrait-content bg-[#f2efe8] flex flex-col justify-center"
          style={{ padding: 60 }}
        >
          <div className="label-eyebrow mb-6">The man behind the mission</div>
          <h3
            className="font-display font-semibold text-[#1a1a1a] mb-8"
            style={{
              fontSize: "clamp(34px, 5vw, 48px)",
              lineHeight: 1.15,
            }}
          >
            Mentor. Leader. The full package.
          </h3>
          <p
            className="font-sans-body font-light text-[#1a1a1a]/80"
            style={{ fontSize: 17, lineHeight: 1.9 }}
          >
            There are people who lead from the front. There are people who lift
            from behind. And then there are rare individuals &mdash; the ones
            who do both, without asking for recognition. Mr. Oparachukwu Joshua
            Ayodeji is that person. His vision sets the direction. His kindness
            makes people want to follow. His work ethic makes them want to keep
            up. And the way he treats every single person in his orbit &mdash;
            with dignity, with intention &mdash; that is the mark of someone
            built differently.
          </p>
          <div
            className="mt-10 flex items-center gap-6 text-[#b8943f] font-sans-body font-light"
            style={{ fontSize: 13, letterSpacing: "0.28em" }}
          >
            <span>VISION</span>
            <span className="h-4 w-px bg-[#b8943f]" />
            <span>KINDNESS</span>
            <span className="h-4 w-px bg-[#b8943f]" />
            <span>WORK ETHIC</span>
          </div>
        </div>
      </section>

      {/* ─── IN HIS ELEMENT ─── */}
      <section className="bg-[#f2efe8]">
        <div className="in-his-element-strip">
          {elementImages.map((src, i) => (
            <div key={i} className="in-his-element-panel element-panel overflow-hidden">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRIBUTE ─── */}
      <section
        className="px-6 bg-[#faf8f4]"
        style={{ paddingTop: 140, paddingBottom: 140 }}
      >
        <div className="mx-auto max-w-[720px]">
          <div className="label-eyebrow mb-6">From Peter, with gratitude</div>
          <h3
            className="font-display italic text-[#1a1a1a] mb-12"
            style={{
              fontSize: "clamp(38px, 6.5vw, 56px)",
              lineHeight: 1.15,
            }}
          >
            To the one who saw it first.
          </h3>
          <div className="space-y-8">
            {/* First two paragraphs */}
            {tributeParagraphs.slice(0, 2).map((p, i) => (
              <p
                key={i}
                className="tribute-p font-sans-body font-light text-[#1a1a1a]/80"
                style={{ fontSize: 18, lineHeight: 2.0 }}
              >
                {p}
              </p>
            ))}

            {/* Inline video break after second paragraph */}
            <div className="tribute-inline-vid my-10">
              <LazyVideo
                src={VID.two}
                className="tribute-inline-video w-full block"
                style={{
                  height: 380,
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Remaining paragraphs */}
            {tributeParagraphs.slice(2).map((p, i) => (
              <p
                key={i + 2}
                className="tribute-p font-sans-body font-light text-[#1a1a1a]/80"
                style={{ fontSize: 18, lineHeight: 2.0 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="closing-section relative min-h-screen flex items-center justify-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center parallax-img"
          style={{ backgroundImage: `url(${IMG.closing})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(13,13,13,0.82)" }}
        />
        <div className="relative z-10 text-center max-w-3xl w-full">
          {/* Animated gold line */}
          <div className="closing-gold-line mx-auto mb-16" />

          <div className="closing-content">
            <div
              className="font-display text-[#C9A84C] mb-8"
              style={{
                fontSize: 18,
                fontWeight: 300,
                letterSpacing: "0.3em",
              }}
            >
              JUNE 16, 2026
            </div>
            <h2
              className="font-display italic text-[#F5F0E8] leading-[1.05]"
              style={{ fontSize: "clamp(52px, 10vw, 96px)" }}
            >
              Happy Birthday,
              <br />
              Sir.
            </h2>
            <div
              className="mt-10 font-sans-body font-light text-[#F5F0E8]/50"
              style={{ fontSize: 15, letterSpacing: "0.1em" }}
            >
              With love and respect &mdash; Peter
            </div>
          </div>

          {/* Final line */}
          <div
            className="closing-final-line mt-12 font-sans-body"
            style={{
              fontWeight: 300,
              fontSize: 13,
              color: "#C9A84C",
              opacity: 0.4,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Keep going, Sir. The best is still ahead.
          </div>
        </div>
      </section>
    </div>
  );
}
