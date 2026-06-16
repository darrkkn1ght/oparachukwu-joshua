import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Route = createFileRoute("/")({
  component: Tribute,
});

const IMG = {
  hero: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592250/0f19fae64fa944afb0543e21fe6e890f_q0yc4d.jpg",
  portrait: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592249/f080087074ea400d9838a5d62caeb86d_gckpzv.jpg",
  three: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592250/fcb9de60e5c54239b38dccd3a9c8ac7d_wryram.jpg",
  been: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592030/Been_a_bit_around_here_w4nmtx.webp",
  closing: "https://res.cloudinary.com/dk32rkate/image/upload/v1781592030/A_Happy_Birthday_to_Me_A_Happy_Birthday_to_The_Oparachukwu_Joshua_AyodejiBaba_for_the_Gift_of_L_i5p30d.webp",
};
const VID = {
  one: "https://res.cloudinary.com/dk32rkate/video/upload/v1781592038/AQOcHWHCJ9vdjaohH2woM-7T7tywYufRnmr2QEw5VbVSIRquCV_tZwbTo8KDzYqUx2fQR5xO0Z9-iNzO2iiYD-pXQpCqWvM7_iwrfi0.mp4",
  two: "https://res.cloudinary.com/dk32rkate/video/upload/v1781592181/VID-20260616-WA0010_lr8caq.mp4",
};

const messages = [
  { text: "Peter of God", emphasis: true },
  { text: "It's always a pleasure to see how you've turned out — and especially because you're not a stranger to good work." },
  { text: "If you maintain your trajectory, you'll be an employer on or before you graduate from school." },
  { text: "It shouldn't be long before you are an actual triple digit millionaire." },
  { text: "My prayer for you is: as many have become millionaires through me, you too would become more, and greater — especially as you continue to stay the course and apply yourself to work and opportunity." },
  { text: "Your future is bright, Peter.", emphasis: true },
];

const tributeParagraphs = [
  "Before I had proof, before I had results, before I had anything worth pointing to — you saw it. You called me 'Peter of God' and you meant it. You told me my future was bright at a time when I could barely see past the next step. That kind of belief doesn't just encourage a person — it changes them. It gives them something to grow into.",
  "You lead with your life. You mentor without making it feel like a lesson. You pour into people so naturally that they don't realize until later how much of who they're becoming traces back to you.",
  "On this day, I want you to know — not just as a formality, but as a fact: the way you've shown up for the people around you is something we don't take for granted. You are the reason some of us dream bigger. You are the reason some of us didn't quit.",
  "Happy birthday, Mr. Oparachukwu Joshua Ayodeji. May this year return to you everything you've given out — multiplied, and then some.",
];

function LazyVideo({ src }: { src: string }) {
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
      { rootMargin: "200px 0px", threshold: 0.1 }
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
      className="w-full block transition-transform duration-500 hover:scale-[1.03]"
    />
  );
}

function Tribute() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Ensure all animated elements are visible at rest; do a single subtle fade only.
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-name-1",
            ".hero-name-2",
            ".hero-line",
            ".hero-date",
            ".quote-msg",
            ".portrait-img",
            ".portrait-content > *",
            ".gallery-item",
            ".tribute-p",
            ".closing-content > *",
          ],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      // Hero intro
      const tl = gsap.timeline();
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8 })
        .from(".hero-name-1", { opacity: 0, y: 60, duration: 1, ease: "power3.out" }, "+=0.1")
        .from(".hero-name-2", { opacity: 0, y: 60, duration: 1, ease: "power3.out" }, "-=0.7")
        .from(".hero-line", { scaleX: 0, duration: 0.6, transformOrigin: "center" }, "-=0.3")
        .from(".hero-date", { opacity: 0, duration: 0.8 }, "-=0.2");

      gsap.utils.toArray<HTMLElement>(".quote-msg").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.05,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".portrait-img", {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".portrait-section", start: "top 70%" },
      });
      gsap.from(".portrait-content > *", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".portrait-section", start: "top 70%" },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".tribute-p").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".closing-content > *", {
        opacity: 0,
        duration: 1.5,
        ease: "power1.inOut",
        stagger: 0.3,
        scrollTrigger: { trigger: ".closing-section", start: "top 70%" },
      });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-[#0D0D0D] text-[#F5F0E8] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.hero})` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(13,13,13,0.78)" }} />
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
          <div className="hero-line mx-auto mt-10 h-px bg-[#C9A84C]" style={{ width: 80 }} />
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

      {/* SECTION 2 — Quotes */}
      <section className="px-6" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="mx-auto max-w-[680px]">
          <div className="label-eyebrow text-center mb-16">His words. Before anyone else believed.</div>
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
                        color: "#C9A84C",
                        textShadow: "0 0 40px rgba(201,168,76,0.3)",
                        lineHeight: 1.3,
                      }
                    : {
                        fontFamily: "Cormorant Garamond, serif",
                        fontWeight: 300,
                        fontSize: "clamp(20px, 3vw, 26px)",
                        color: "#F5F0E8",
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

      {/* SECTION 3 — Portrait split */}
      <section className="portrait-section grid md:grid-cols-2" style={{ minHeight: "80vh" }}>
        <div className="relative min-h-[60vh] md:min-h-full overflow-hidden">
          <img
            src={IMG.portrait}
            alt="Mr. Oparachukwu Joshua Ayodeji"
            loading="lazy"
            decoding="async"
            className="portrait-img absolute inset-0 w-full h-full object-cover"
            style={{ filter: "sepia(10%) brightness(0.95)" }}
          />
        </div>
        <div className="portrait-content bg-[#141414] flex flex-col justify-center" style={{ padding: 60 }}>
          <div className="label-eyebrow mb-6">The man behind the mission</div>
          <h3
            className="font-display font-semibold text-[#F5F0E8] mb-8"
            style={{ fontSize: "clamp(34px, 5vw, 48px)", lineHeight: 1.15 }}
          >
            Mentor. Leader. The full package.
          </h3>
          <p
            className="font-sans-body font-light text-[#F5F0E8]/85"
            style={{ fontSize: 17, lineHeight: 1.9 }}
          >
            There are people who lead from the front. There are people who lift from behind. And then
            there are rare individuals — the ones who do both, without asking for recognition.
            Mr. Oparachukwu Joshua Ayodeji is that person. His vision sets the direction. His kindness
            makes people want to follow. His work ethic makes them want to keep up. And the way he
            treats every single person in his orbit — with dignity, with intention — that is the mark
            of someone built differently.
          </p>
          <div className="mt-10 flex items-center gap-6 text-[#C9A84C] font-sans-body font-light" style={{ fontSize: 13, letterSpacing: "0.28em" }}>
            <span>VISION</span>
            <span className="h-4 w-px bg-[#C9A84C]" />
            <span>KINDNESS</span>
            <span className="h-4 w-px bg-[#C9A84C]" />
            <span>WORK ETHIC</span>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Gallery */}
      <section className="bg-[#111111] px-6" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="text-center mb-16">
          <div className="label-eyebrow mb-4">Moments</div>
          <h3 className="font-display font-light text-[#F5F0E8]" style={{ fontSize: "clamp(36px, 6vw, 52px)" }}>
            A life well lived.
          </h3>
        </div>
        <div className="mx-auto max-w-6xl" style={{ columnGap: "1rem" }}>
          <div
            style={{
              columnCount: 3,
              columnGap: "1rem",
            }}
            className="[@media(max-width:900px)]:![column-count:2] [@media(max-width:600px)]:![column-count:1]"
          >
            {[
              { type: "img", src: IMG.hero },
              { type: "vid", src: VID.one },
              { type: "img", src: IMG.three },
              { type: "img", src: IMG.been },
              { type: "vid", src: VID.two },
              { type: "img", src: IMG.portrait },
              { type: "img", src: IMG.closing },
            ].map((item, i) => (
              <div
                key={i}
                className="gallery-item mb-4 break-inside-avoid overflow-hidden"
              >
                {item.type === "img" ? (
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full block transition-transform duration-500 hover:scale-[1.03]"
                  />
                ) : (
                  <LazyVideo src={item.src} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tribute */}
      <section className="px-6" style={{ paddingTop: 140, paddingBottom: 140 }}>
        <div className="mx-auto max-w-[720px]">
          <div className="label-eyebrow mb-6">From Peter, with gratitude</div>
          <h3
            className="font-display italic text-[#F5F0E8] mb-12"
            style={{ fontSize: "clamp(38px, 6.5vw, 56px)", lineHeight: 1.15 }}
          >
            To the one who saw it first.
          </h3>
          <div className="space-y-8">
            {tributeParagraphs.map((p, i) => (
              <p
                key={i}
                className="tribute-p font-sans-body font-light text-[#F5F0E8]/85"
                style={{ fontSize: 18, lineHeight: 2.0 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Closing */}
      <section
        className="closing-section relative min-h-screen flex items-center justify-center px-6"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.closing})` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(13,13,13,0.82)" }} />
        <div className="closing-content relative z-10 text-center">
          <div
            className="font-display text-[#C9A84C] mb-8"
            style={{ fontSize: 18, fontWeight: 300, letterSpacing: "0.3em" }}
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
            With love and respect — Peter
          </div>
        </div>
      </section>
    </div>
  );
}
