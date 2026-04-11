<template>
  <div class="home">
    <!-- Particle canvas background -->
    <canvas ref="canvas" class="particles"></canvas>

    <!-- Grid overlay -->
    <div class="grid-overlay"></div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__eyebrow">
        <span class="pulse-dot"></span>
        <span>منصة الملاحظات الذكية</span>
      </div>

      <h1 class="hero__title">
        <span class="line line-1">نظّم أفكارك</span>
        <span class="line line-2">بأسلوب <em>احترافي</em></span>
      </h1>

      <p class="hero__subtitle">
        سجّل ملاحظاتك، ابحث فيها، وتتبّع أفكارك في مكان واحد أنيق وسريع
      </p>

      <div class="hero__actions">
        <RouterLink to="/add" class="btn btn--primary">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          ابدأ الكتابة
        </RouterLink>
        <RouterLink to="/list" class="btn btn--ghost">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            />
          </svg>
          ملاحظاتي
        </RouterLink>
      </div>

      <!-- Stats row -->
      <div class="stats-row">
        <div
          class="stat"
          v-for="(s, i) in stats"
          :key="i"
          :style="{ animationDelay: `${0.8 + i * 0.15}s` }"
        >
          <span class="stat__num">{{ s.value }}</span>
          <span class="stat__label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div
        class="feature-card"
        v-for="(f, i) in features"
        :key="i"
        :style="{ animationDelay: `${1 + i * 0.12}s` }"
      >
        <div class="feature-card__icon" v-html="f.icon"></div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="cta-banner">
      <div class="cta-banner__inner">
        <h2>جاهز تبدأ؟</h2>
        <p>أضف ملاحظتك الأولى الآن في ثوانٍ</p>
        <RouterLink to="/add" class="btn btn--primary btn--lg">
          ابدأ مجاناً
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { NotesStore } from "../store/notes";

export default {
  name: "HomePage",
  components: { RouterLink },
  data() {
    return {
      features: [
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg>`,
          title: "كتابة سلسة",
          desc: "واجهة نظيفة تركّز على الكتابة دون تشتيت",
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>`,
          title: "بحث فوري",
          desc: "ابحث في عناوين ومحتوى ملاحظاتك لحظياً",
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 8.485-7.5 11.9-7.5 11.9s-7.5-3.415-7.5-11.9a7.5 7.5 0 0115 0z"/></svg>`,
          title: "حفظ محلي",
          desc: "بياناتك تُحفظ على جهازك مباشرة بأمان تام",
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>`,
          title: "وضع ليلي",
          desc: "تصميم داكن أنيق يريح عينيك في الإضاءة المنخفضة",
        },
      ],
    };
  },
  computed: {
    stats() {
      const notes = NotesStore.getAll();
      const totalChars = notes.reduce(
        (s, n) => s + (n.content?.length || 0),
        0
      );
      return [
        { value: notes.length, label: "ملاحظة" },
        {
          value:
            totalChars > 999
              ? (totalChars / 1000).toFixed(1) + "ك"
              : totalChars,
          label: "حرف مكتوب",
        },
        {
          value: new Date().toLocaleDateString("ar-EG", { month: "long" }),
          label: "الشهر الحالي",
        },
      ];
    },
  },
  mounted() {
    this.initParticles();
  },
  beforeUnmount() {
    cancelAnimationFrame(this._raf);
  },
  methods: {
    initParticles() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let W, H, particles;

      const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        o: Math.random() * 0.5 + 0.1,
      }));

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212,160,48,${p.o})`;
          ctx.fill();
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;
        });
        this._raf = requestAnimationFrame(draw);
      };
      draw();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Scheherazade+New:wght@400;700&display=swap");

.home {
  min-height: 100vh;
  direction: rtl;
  font-family: "Tajawal", sans-serif;
  background: #0a0a0f;
  color: #eee8d5;
  position: relative;
  overflow: hidden;
}

/* Particles */
.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* Grid */
.grid-overlay {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(
      rgba(212, 160, 48, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(212, 160, 48, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 0;
  pointer-events: none;
}

/* ── Hero ── */
.hero {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 7rem 2rem 5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(212, 160, 48, 0.1);
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 30px;
  padding: 6px 16px;
  font-size: 0.82rem;
  color: #d4a030;
  animation: fadeUp 0.6s 0.1s ease both;
}
.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d4a030;
  box-shadow: 0 0 0 0 rgba(212, 160, 48, 0.4);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 160, 48, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(212, 160, 48, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 160, 48, 0);
  }
}

.hero__title {
  font-family: "Scheherazade New", serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.15;
  font-weight: 700;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1em;
}
.hero__title em {
  font-style: normal;
  background: linear-gradient(135deg, #f0c060, #d4a030, #f0c060);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}

.line {
  display: block;
  animation: fadeUp 0.7s ease both;
}
.line-1 {
  animation-delay: 0.25s;
}
.line-2 {
  animation-delay: 0.4s;
}

.hero__subtitle {
  font-size: 1.1rem;
  color: #9a9080;
  max-width: 500px;
  line-height: 1.8;
  font-weight: 300;
  animation: fadeUp 0.7s 0.55s ease both;
}

/* Buttons */
.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeUp 0.7s 0.65s ease both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 10px;
  font-family: "Tajawal", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.btn svg {
  width: 18px;
  height: 18px;
}

.btn--primary {
  background: linear-gradient(135deg, #8b6520, #d4a030, #f0c060);
  background-size: 200% 200%;
  background-position: 0% 50%;
  color: #0f0f1a;
  box-shadow: 0 4px 24px rgba(212, 160, 48, 0.35);
}
.btn--primary:hover {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(212, 160, 48, 0.5);
}

.btn--ghost {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 160, 48, 0.25);
  color: #d4a030;
}
.btn--ghost:hover {
  background: rgba(212, 160, 48, 0.08);
  transform: translateY(-2px);
}

.btn--lg {
  padding: 16px 32px;
  font-size: 1.05rem;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  animation: fadeUp 0.7s 0.8s ease both;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  animation: fadeUp 0.6s ease both;
}
.stat__num {
  font-family: "Scheherazade New", serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #f0c060;
  line-height: 1;
}
.stat__label {
  font-size: 0.72rem;
  color: #5a5448;
  font-weight: 500;
}

/* ── Features ── */
.features {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto 5rem;
  padding: 0 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 160, 48, 0.1);
  border-radius: 16px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  animation: fadeUp 0.6s ease both;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212, 160, 48, 0.3);
  box-shadow: 0 8px 40px rgba(212, 160, 48, 0.1);
}
.feature-card__icon {
  width: 52px;
  height: 52px;
  background: rgba(212, 160, 48, 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4a030;
  margin: 0 auto 1rem;
}
.feature-card__icon :deep(svg) {
  width: 26px;
  height: 26px;
}
.feature-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #eee8d5;
  margin: 0 0 8px;
}
.feature-card p {
  font-size: 0.85rem;
  color: #6a6058;
  line-height: 1.7;
  margin: 0;
}

/* ── CTA Banner ── */
.cta-banner {
  position: relative;
  z-index: 1;
  margin: 0 2rem 5rem;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
}
.cta-banner__inner {
  background: linear-gradient(
    135deg,
    rgba(139, 100, 30, 0.25),
    rgba(30, 20, 5, 0.5)
  );
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 20px;
  padding: 3.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-banner__inner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(212, 160, 48, 0.15),
    transparent 60%
  );
}
.cta-banner__inner h2 {
  font-family: "Scheherazade New", serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #f0c060;
  margin: 0 0 10px;
  position: relative;
}
.cta-banner__inner p {
  color: #9a9080;
  font-size: 0.95rem;
  margin: 0 0 2rem;
  position: relative;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Light mode ── */
body:not(.dark-mode) .home {
  background: #f7f2e5;
  color: #2c1f06;
}
body:not(.dark-mode) .hero__subtitle {
  color: #7a6a4a;
}
body:not(.dark-mode) .feature-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(139, 100, 30, 0.15);
}
body:not(.dark-mode) .feature-card h3 {
  color: #2c1f06;
}
body:not(.dark-mode) .feature-card p {
  color: #9a8060;
}
body:not(.dark-mode) .cta-banner__inner {
  background: linear-gradient(
    135deg,
    rgba(212, 160, 48, 0.15),
    rgba(255, 240, 200, 0.4)
  );
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .grid-overlay {
  background-image: linear-gradient(
      rgba(139, 100, 30, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(139, 100, 30, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
body:not(.dark-mode) .stat__num {
  color: #8b6520;
}
body:not(.dark-mode) .stat__label {
  color: #b0a080;
}
body:not(.dark-mode) .btn--ghost {
  color: #8b6520;
  border-color: rgba(139, 100, 30, 0.3);
}
body:not(.dark-mode) .btn--ghost:hover {
  background: rgba(139, 100, 30, 0.08);
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .hero {
    padding: 5rem 1.5rem 3rem;
  }
  .stats-row {
    gap: 1.2rem;
  }
  .features {
    padding: 0 1.25rem;
  }
  .cta-banner {
    margin: 0 1.25rem 4rem;
  }
}
</style>
