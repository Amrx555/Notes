<template>
  <div class="add-note-page">
    <div class="ambient"></div>
    <div class="grid-overlay"></div>

    <div class="card" :class="{ 'card--shake': shaking }">
      <!-- Header -->
      <div class="card__header">
        <div class="card__icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
            />
          </svg>
        </div>
        <div class="card__header-text">
          <h1>ملاحظة جديدة</h1>
          <p>{{ currentDate }}</p>
        </div>
      </div>

      <div class="divider">
        <span></span><span class="dot"></span><span></span>
      </div>

      <div class="form-body">
        <!-- Title -->
        <div
          class="field"
          :class="{ 'field--active': focusedField === 'title' }"
        >
          <label>العنوان</label>
          <div class="input-wrap">
            <input
              v-model="title"
              placeholder="ما موضوع ملاحظتك؟"
              @focus="focusedField = 'title'"
              @blur="focusedField = ''"
              autocomplete="off"
              maxlength="120"
            />
            <div class="field-bar">
              <span :class="{ active: focusedField === 'title' }"></span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div
          class="field field--textarea"
          :class="{ 'field--active': focusedField === 'content' }"
        >
          <label>
            المحتوى
            <span class="char-badge" v-if="content">{{ content.length }}</span>
          </label>
          <div class="input-wrap">
            <textarea
              v-model="content"
              placeholder="اكتب أفكارك هنا بحرية تامة..."
              rows="6"
              @focus="focusedField = 'content'"
              @blur="focusedField = ''"
            ></textarea>
            <div class="field-bar">
              <span :class="{ active: focusedField === 'content' }"></span>
            </div>
          </div>
        </div>

        <!-- Save -->
        <button
          class="btn-save"
          @click="addNote"
          :disabled="saving"
          :class="{ loading: saving }"
        >
          <span class="btn-save__inner">
            <svg v-if="!saving" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293z"
              />
            </svg>
            <svg v-else class="spin" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-dasharray="30"
                stroke-linecap="round"
              />
            </svg>
            {{ saving ? "جاري الحفظ..." : "حفظ الملاحظة" }}
          </span>
          <div class="btn-save__shine"></div>
        </button>

        <button class="btn-clear" @click="clearForm" v-if="title || content">
          مسح الحقول
        </button>
      </div>

      <!-- Toasts -->
      <transition name="msg">
        <div v-if="error" class="toast toast--error">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ errorMsg }}
        </div>
      </transition>
      <transition name="msg">
        <div v-if="success" class="toast toast--success">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          تم حفظ الملاحظة بنجاح ✨
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { NotesStore } from "../store/notes";
export default {
  name: "AddNote",
  data() {
    return {
      title: "",
      content: "",
      success: false,
      error: false,
      errorMsg: "",
      saving: false,
      shaking: false,
      focusedField: "",
      currentDate: new Date().toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  },
  methods: {
    async addNote() {
      if (!this.title.trim() || !this.content.trim()) {
        this.errorMsg = !this.title.trim()
          ? "يرجى كتابة عنوان للملاحظة"
          : "يرجى كتابة محتوى الملاحظة";
        this.error = true;
        this.shaking = true;
        setTimeout(() => {
          this.shaking = false;
        }, 600);
        setTimeout(() => {
          this.error = false;
        }, 3500);
        return;
      }
      this.saving = true;
      this.error = false;
      await new Promise((r) => setTimeout(r, 650));
      NotesStore.add({
        title: this.title.trim(),
        content: this.content.trim(),
        date: new Date().toLocaleString("ar-EG"),
      });
      this.clearForm();
      this.saving = false;
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
    },
    clearForm() {
      this.title = "";
      this.content = "";
      this.focusedField = "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Scheherazade+New:wght@400;700&display=swap");

.add-note-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1.25rem;
  direction: rtl;
  font-family: "Tajawal", sans-serif;
  background: #0a0a0f;
  color: #eee8d5;
  position: relative;
  overflow: hidden;
}
.ambient {
  position: fixed;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(212, 160, 48, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
.grid-overlay {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(
      rgba(212, 160, 48, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(212, 160, 48, 0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}

/* Card */
.card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 160, 48, 0.15);
  border-radius: 20px;
  padding: 2.5rem 2.5rem 2rem;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6), 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: cardRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  backdrop-filter: blur(20px);
  background-image: radial-gradient(
    ellipse at 50% -20%,
    rgba(212, 160, 48, 0.07),
    transparent 60%
  );
}
@keyframes cardRise {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.card--shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes shake {
  10%,
  90% {
    transform: translateX(-3px);
  }
  20%,
  80% {
    transform: translateX(5px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-7px);
  }
  40%,
  60% {
    transform: translateX(7px);
  }
}

/* Header */
.card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 1.5rem;
  animation: fadeUp 0.6s 0.15s ease both;
}
.card__icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    rgba(212, 160, 48, 0.2),
    rgba(212, 160, 48, 0.08)
  );
  border: 1px solid rgba(212, 160, 48, 0.3);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4a030;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(212, 160, 48, 0.15);
  transition: transform 0.3s;
}
.card__icon:hover {
  transform: rotate(-6deg) scale(1.06);
}
.card__icon svg {
  width: 24px;
  height: 24px;
}
.card__header-text h1 {
  font-family: "Scheherazade New", serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #f0c060;
  margin: 0 0 3px;
}
.card__header-text p {
  font-size: 0.75rem;
  color: #3a3428;
  margin: 0;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  animation: fadeUp 0.6s 0.22s ease both;
}
.divider span {
  flex: 1;
  height: 1px;
  background: linear-gradient(to left, transparent, rgba(212, 160, 48, 0.2));
}
.divider span:last-child {
  background: linear-gradient(to right, transparent, rgba(212, 160, 48, 0.2));
}
.divider .dot {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(212, 160, 48, 0.4);
}

/* Fields */
.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}
.field {
  animation: fadeUp 0.6s ease both;
}
.field:nth-child(1) {
  animation-delay: 0.28s;
}
.field:nth-child(2) {
  animation-delay: 0.36s;
}
.field label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #5a5040;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
  transition: color 0.25s;
}
.field--active label {
  color: #d4a030;
}
.char-badge {
  font-size: 0.65rem;
  font-weight: 500;
  background: rgba(212, 160, 48, 0.1);
  color: #d4a030;
  border-radius: 10px;
  padding: 1px 7px;
  letter-spacing: 0;
  text-transform: none;
}
.input-wrap {
  position: relative;
}
.input-wrap input,
.input-wrap textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 160, 48, 0.1);
  border-radius: 10px;
  outline: none;
  font-family: "Tajawal", sans-serif;
  font-size: 0.97rem;
  color: #eee8d5;
  padding: 12px 14px;
  resize: none;
  line-height: 1.7;
  caret-color: #d4a030;
  transition: border-color 0.25s, background 0.25s;
}
.input-wrap input:focus,
.input-wrap textarea:focus {
  background: rgba(212, 160, 48, 0.04);
  border-color: rgba(212, 160, 48, 0.35);
}
.input-wrap input::placeholder,
.input-wrap textarea::placeholder {
  color: #2a2418;
}
.input-wrap textarea {
  min-height: 140px;
}
.field-bar {
  height: 2px;
  margin-top: 2px;
  background: rgba(212, 160, 48, 0.08);
  border-radius: 2px;
  overflow: hidden;
}
.field-bar span {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, #8b6520, #f0c060);
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.field-bar span.active {
  width: 100%;
}

/* Button */
.btn-save {
  position: relative;
  width: 100%;
  padding: 15px 24px;
  background: linear-gradient(135deg, #5c3d0e, #a07820, #d4a030);
  background-size: 200% 200%;
  background-position: 0% 50%;
  color: #0f0f1a;
  border: none;
  border-radius: 12px;
  font-family: "Tajawal", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(212, 160, 48, 0.35);
  transition: background-position 0.5s, box-shadow 0.25s, transform 0.2s;
  animation: fadeUp 0.6s 0.44s ease both;
}
.btn-save:hover:not(:disabled) {
  background-position: 100% 50%;
  box-shadow: 0 6px 32px rgba(212, 160, 48, 0.55);
  transform: translateY(-2px);
}
.btn-save:active:not(:disabled) {
  transform: translateY(1px);
}
.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.btn-save__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  z-index: 1;
}
.btn-save__inner svg {
  width: 18px;
  height: 18px;
}
.btn-save__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  background-position: -100% 0;
  transition: background-position 0s;
}
.btn-save:hover .btn-save__shine {
  background-position: 200% 0;
  transition: background-position 0.6s ease;
}
.spin {
  animation: spinning 0.9s linear infinite;
}
@keyframes spinning {
  to {
    transform: rotate(360deg);
  }
}

.btn-clear {
  background: none;
  border: none;
  color: #3a3428;
  font-family: "Tajawal", sans-serif;
  font-size: 0.82rem;
  cursor: pointer;
  text-align: center;
  padding: 0;
  margin-top: -0.8rem;
  transition: color 0.2s;
  animation: fadeUp 0.5s 0.5s ease both;
}
.btn-clear:hover {
  color: #e05555;
}

/* Toasts */
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 500;
  margin-top: 0.5rem;
}
.toast svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.toast--error {
  background: rgba(224, 85, 85, 0.1);
  border: 1px solid rgba(224, 85, 85, 0.25);
  color: #e08080;
}
.toast--success {
  background: rgba(76, 175, 125, 0.1);
  border: 1px solid rgba(76, 175, 125, 0.25);
  color: #74c69d;
}
.msg-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.msg-leave-active {
  transition: all 0.25s ease;
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.msg-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Light mode */
body:not(.dark-mode) .add-note-page {
  background: #f7f2e5;
  color: #2c1f06;
}
body:not(.dark-mode) .card {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(139, 100, 30, 0.2);
  box-shadow: 0 12px 60px rgba(139, 100, 30, 0.15);
}
body:not(.dark-mode) .card__header-text h1 {
  color: #8b6520;
}
body:not(.dark-mode) .card__header-text p {
  color: #b0a080;
}
body:not(.dark-mode) .card__icon {
  background: rgba(139, 100, 30, 0.1);
  border-color: rgba(139, 100, 30, 0.25);
}
body:not(.dark-mode) .field label {
  color: #9a7840;
}
body:not(.dark-mode) .field--active label {
  color: #8b6520;
}
body:not(.dark-mode) .input-wrap input,
body:not(.dark-mode) .input-wrap textarea {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(139, 100, 30, 0.15);
  color: #2c1f06;
}
body:not(.dark-mode) .input-wrap input:focus,
body:not(.dark-mode) .input-wrap textarea:focus {
  background: #fff;
  border-color: rgba(139, 100, 30, 0.4);
}
body:not(.dark-mode) .input-wrap input::placeholder,
body:not(.dark-mode) .input-wrap textarea::placeholder {
  color: #d0c0a0;
}

/* Responsive */
@media (max-width: 480px) {
  .card {
    padding: 2rem 1.5rem 1.75rem;
    border-radius: 16px;
  }
  .card__header-text h1 {
    font-size: 1.4rem;
  }
}
</style>
