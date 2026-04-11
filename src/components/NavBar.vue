<template>
  <nav
    class="navbar"
    :class="{ 'navbar--scrolled': scrolled, 'navbar--open': menuOpen }"
  >
    <!-- Ambient glow line -->
    <div class="navbar__glow"></div>

    <!-- Logo -->
    <div class="logo">
      <RouterLink to="/" @click="menuOpen = false">
        <div class="logo__icon">
          <svg viewBox="0 0 32 32" fill="none">
            <rect
              x="4"
              y="2"
              width="20"
              height="26"
              rx="3"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M9 9h10M9 14h10M9 19h6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M24 8l4 4-4 4"
              stroke="var(--gold-400)"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <span class="logo__text">Note<em>Pro</em></span>
      </RouterLink>
    </div>

    <!-- Desktop Links -->
    <ul class="nav-links">
      <li v-for="link in links" :key="link.to">
        <RouterLink
          :to="link.to"
          active-class="active"
          @click="menuOpen = false"
        >
          <span class="link__icon" v-html="link.icon"></span>
          <span>{{ link.label }}</span>
          <span class="link__dot"></span>
        </RouterLink>
      </li>
    </ul>

    <!-- Actions -->
    <div class="actions">
      <!-- Stats badge -->
      <div class="stats-badge" v-if="notesCount > 0">
        <span>{{ notesCount }}</span>
        <small>ملاحظة</small>
      </div>

      <!-- Dark mode toggle -->
      <button
        class="mode-btn"
        @click="toggleDarkMode"
        :title="isDark ? 'وضع النهار' : 'وضع الليل'"
      >
        <span class="mode-btn__track" :class="{ active: isDark }">
          <span class="mode-btn__thumb">
            <svg v-if="isDark" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 12A4 4 0 108 4a4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zM2.343 2.343a.5.5 0 01.707 0l1.414 1.414a.5.5 0 01-.707.707L2.343 3.05a.5.5 0 010-.707zm9.9 9.9a.5.5 0 01.707 0l1.414 1.414a.5.5 0 01-.707.707l-1.414-1.414a.5.5 0 010-.707zM0 8a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2A.5.5 0 010 8zm13 0a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2A.5.5 0 0113 8z"
              />
            </svg>
            <svg v-else viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M6 .278a.768.768 0 01.08.858 7.208 7.208 0 00-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 01.81.316.733.733 0 01-.031.893A8.349 8.349 0 018.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 016 .278z"
              />
            </svg>
          </span>
        </span>
      </button>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        @click="menuOpen = !menuOpen"
        :class="{ open: menuOpen }"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div class="mobile-nav" v-if="menuOpen">
        <ul>
          <li
            v-for="(link, i) in links"
            :key="link.to"
            :style="{ animationDelay: `${i * 0.07}s` }"
          >
            <RouterLink
              :to="link.to"
              active-class="active"
              @click="menuOpen = false"
            >
              <span v-html="link.icon"></span>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { NotesStore } from "../store/notes";

const isDark = ref(true);
const scrolled = ref(false);
const menuOpen = ref(false);
const notesCount = ref(0);

const links = [
  {
    to: "/",
    label: "الرئيسية",
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>',
  },
  {
    to: "/add",
    label: "إضافة",
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/></svg>',
  },
  {
    to: "/list",
    label: "ملاحظاتي",
    icon: '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/></svg>',
  },
];

onMounted(() => {
  const saved = localStorage.getItem("darkMode");
  isDark.value = saved !== "false";
  applyTheme(isDark.value);
  notesCount.value = NotesStore.getAll().length;
  window.addEventListener("scroll", onScroll);
  window.addEventListener("storage", refreshCount);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("storage", refreshCount);
});

const onScroll = () => {
  scrolled.value = window.scrollY > 20;
};
const refreshCount = () => {
  notesCount.value = NotesStore.getAll().length;
};

const applyTheme = (dark) => {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.body.classList.toggle("dark-mode", dark);
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};

watch(isDark, (val) => {
  applyTheme(val);
  localStorage.setItem("darkMode", val);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Scheherazade+New:wght@400;700&display=swap");

:root {
  --ink-900: #0f0f1a;
  --ink-800: #161625;
  --ink-700: #1e1e32;
  --ink-600: #2a2a45;
  --gold-400: #f0c060;
  --gold-500: #d4a030;
  --gold-glow: rgba(212, 160, 48, 0.18);
  --text-primary: #eee8d5;
  --text-secondary: #9a9080;
  --font-body: "Tajawal", sans-serif;
}

/* ── Base ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  direction: rtl;
  font-family: var(--font-body);
  background: rgba(15, 15, 26, 0.85);
  backdrop-filter: blur(20px) saturate(160%);
  border-bottom: 1px solid rgba(212, 160, 48, 0.12);
  transition: background 0.4s, box-shadow 0.4s;
}
.navbar--scrolled {
  background: rgba(10, 10, 18, 0.96);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(212, 160, 48, 0.15);
}

/* Glow line */
.navbar__glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-400), transparent);
  opacity: 0.3;
}

/* ── Logo ── */
.logo a {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-primary);
}
.logo__icon {
  width: 35px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.logo a:hover .logo__icon {
  transform: rotate(-6deg) scale(1.08);
  box-shadow: 0 4px 20px var(--gold-glow);
}
.logo__text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-primary);
}
.logo__text em {
  font-style: normal;
  color: var(--gold-400);
}

/* ── Nav Links ── */
.nav-links {
  list-style: none;
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0;
}
.nav-links a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
}
.nav-links a:hover {
  background: rgba(51, 25, 77, 0.514);
  font-weight: 400;
}
.nav-links a.active {
  color: var(--gold-400);
  background: rgba(212, 160, 48, 0.603);
}
.link__dot {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold-400);
  opacity: 0;
  transition: opacity 0.2s;
}
.nav-links a.active .link__dot {
  opacity: 1;
}
.link__icon {
  display: flex;
  align-items: center;
}

/* ── Actions ── */
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Stats badge */
.stats-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(212, 160, 48, 0.1);
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 20px;
  padding: 4px 12px;
  cursor: default;
}
.stats-badge span {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--gold-400);
  line-height: 1;
}
.stats-badge small {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

/* Dark mode toggle */
.mode-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.mode-btn__track {
  display: flex;
  align-items: center;
  width: 50px;
  height: 26px;
  background: var(--ink-600);
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 13px;
  padding: 2px;
  transition: background 0.3s, border-color 0.3s;
}
.mode-btn__track.active {
  background: rgba(212, 160, 48, 0.2);
  border-color: rgba(212, 160, 48, 0.4);
}
.mode-btn__thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gold-400);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: auto;
}
.mode-btn__track.active .mode-btn__thumb {
  transform: translateX(0px);
  margin-right: 0;
  margin-left: auto;
}
.mode-btn__thumb svg {
  width: 10px;
  height: 10px;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s, width 0.3s;
}
.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background: var(--gold-400);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background: var(--gold-400);
}

/* ── Mobile Nav ── */
.mobile-nav {
  position: absolute;
  top: 64px;
  right: 0;
  left: 0;
  background: rgba(12, 12, 22, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(212, 160, 48, 0.15);
  padding: 1rem 2rem 1.5rem;
}
.mobile-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.mobile-nav li {
  animation: slideIn 0.3s ease both;
}
.mobile-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.mobile-nav a:hover,
.mobile-nav a.active {
  background: rgba(212, 160, 48, 0.315);
  color: var(--gold-400);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile menu transition */
.mobile-menu-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Light mode overrides ── */
body:not(.dark-mode) .navbar {
  background: rgba(255, 253, 245, 0.9);
  border-bottom-color: rgba(139, 100, 30, 0.15);
}
body:not(.dark-mode) .logo__text {
  color: #1a1200;
}
body:not(.dark-mode) .logo__icon {
  background: #f5f0e0;
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .nav-links a {
  color: #5a4a2a;
}
body:not(.dark-mode) .nav-links a:hover {
  background: rgba(0, 0, 0, 0.04);
  color: #1a1200;
}
body:not(.dark-mode) .stats-badge {
  background: rgba(139, 100, 30, 0.08);
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .mode-btn__track {
  background: #e8e0cc;
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .mobile-nav {
  background: rgba(255, 253, 245, 0.98);
}
body:not(.dark-mode) .mobile-nav a {
  color: #5a4a2a;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .nav-links {
    display: none;
  }
  .stats-badge {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .navbar {
    padding: 0 1.25rem;
  }
}
</style>

<style>
/* Global dark/light body styles */
body {
  margin: 0;
  background: #0a0a0f;
  color: #eee8d5;
  font-family: "Tajawal", sans-serif;
  transition: background 0.4s, color 0.4s;
}
body:not(.dark-mode) {
  background: #f7f2e5;
  color: #2c1f06;
}
</style>
