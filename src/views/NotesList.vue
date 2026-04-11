<template>
  <div class="notes-page">
    <!-- Ambient background -->
    <div class="ambient"></div>

    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header__text">
        <h1>
          <span class="header-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
              />
            </svg>
          </span>
          ملاحظاتي
        </h1>
        <p>
          {{
            notes.length > 0
              ? `${notes.length} ملاحظة محفوظة`
              : "لا توجد ملاحظات بعد"
          }}
        </p>
      </div>

      <!-- Controls row -->
      <div class="controls">
        <!-- Search -->
        <div class="search-wrap" :class="{ active: searchFocus }">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ابحث في ملاحظاتك..."
            @focus="searchFocus = true"
            @blur="searchFocus = false"
          />
          <button
            v-if="searchQuery"
            class="search-clear"
            @click="searchQuery = ''"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- View toggle -->
        <div class="view-toggle">
          <button
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
            title="عرض شبكي"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
            title="عرض قائمة"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Delete all -->
        <button v-if="notes.length" class="btn-danger" @click="confirmClearAll">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          حذف الكل
        </button>
      </div>
    </div>

    <!-- Notes Grid / List -->
    <div
      v-if="filteredNotes.length"
      class="notes-container"
      :class="`view-${viewMode}`"
    >
      <TransitionGroup name="note" tag="div" class="notes-inner">
        <div
          v-for="(note, i) in filteredNotes"
          :key="note.id"
          class="note-card"
          :style="{ animationDelay: `${i * 0.06}s` }"
          @click="expandNote(note)"
        >
          <!-- Color accent bar -->
          <div
            class="note-card__bar"
            :style="{ background: noteColor(note.id) }"
          ></div>

          <div class="note-card__body">
            <h3 class="note-card__title">{{ note.title }}</h3>
            <p class="note-card__content">
              {{ truncate(note.content, viewMode === "list" ? 120 : 90) }}
            </p>
          </div>

          <div class="note-card__footer">
            <span class="note-card__date">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                width="11"
                height="11"
              >
                <path
                  d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5z"
                />
              </svg>
              {{ note.date }}
            </span>
            <div class="note-card__actions" @click.stop>
              <button
                class="note-btn note-btn--delete"
                @click="deleteNote(note.id)"
                title="حذف"
              >
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Empty State -->
    <transition name="fade">
      <div v-if="!filteredNotes.length" class="empty-state">
        <div class="empty-state__icon">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-5.25-1.5v-.375a3.375 3.375 0 013.375-3.375h1.5a1.125 1.125 0 001.125-1.125v-1.5a3.375 3.375 0 013.375-3.375h1.5"
            />
          </svg>
        </div>
        <h3>{{ searchQuery ? "لا توجد نتائج" : "لا توجد ملاحظات بعد" }}</h3>
        <p>
          {{
            searchQuery
              ? `لم نجد ملاحظات تطابق "${searchQuery}"`
              : "ابدأ بإضافة أول ملاحظة لك"
          }}
        </p>
        <RouterLink v-if="!searchQuery" to="/add" class="btn-add-first">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          أضف ملاحظة
        </RouterLink>
      </div>
    </transition>

    <!-- Expand Modal -->
    <transition name="modal">
      <div
        v-if="expandedNote"
        class="modal-overlay"
        @click.self="expandedNote = null"
      >
        <div class="modal-card">
          <div
            class="modal-card__bar"
            :style="{ background: noteColor(expandedNote.id) }"
          ></div>
          <button class="modal-close" @click="expandedNote = null">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <h2>{{ expandedNote.title }}</h2>
          <p class="modal-date">{{ expandedNote.date }}</p>
          <div class="modal-content">{{ expandedNote.content }}</div>
          <button
            class="modal-delete"
            @click="
              deleteNote(expandedNote.id);
              expandedNote = null;
            "
          >
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            حذف الملاحظة
          </button>
        </div>
      </div>
    </transition>

    <!-- Confirm delete all modal -->
    <transition name="modal">
      <div
        v-if="showConfirm"
        class="modal-overlay"
        @click.self="showConfirm = false"
      >
        <div class="confirm-card">
          <div class="confirm-icon">⚠️</div>
          <h3>حذف جميع الملاحظات؟</h3>
          <p>لا يمكن التراجع عن هذا الإجراء</p>
          <div class="confirm-btns">
            <button class="btn-cancel" @click="showConfirm = false">
              إلغاء
            </button>
            <button class="btn-confirm-delete" @click="clearAll">
              نعم، احذف الكل
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { NotesStore } from "../store/notes.js";

const ACCENT_COLORS = [
  "linear-gradient(90deg,#d4a030,#f0c060)",
  "linear-gradient(90deg,#5b8dd9,#89b4fa)",
  "linear-gradient(90deg,#4caf7d,#74c69d)",
  "linear-gradient(90deg,#e05555,#f08080)",
  "linear-gradient(90deg,#9b6fc7,#c5a0e8)",
  "linear-gradient(90deg,#e08840,#f0b060)",
];

export default {
  name: "NotesList",
  components: { RouterLink },
  data() {
    return {
      notes: [],
      searchQuery: "",
      searchFocus: false,
      viewMode: "grid",
      expandedNote: null,
      showConfirm: false,
    };
  },
  computed: {
    filteredNotes() {
      if (!this.searchQuery.trim()) return this.notes;
      return NotesStore.search(this.searchQuery);
    },
  },
  methods: {
    loadNotes() {
      this.notes = NotesStore.getAll();
    },
    deleteNote(id) {
      NotesStore.delete(id);
      this.loadNotes();
    },
    confirmClearAll() {
      this.showConfirm = true;
    },
    clearAll() {
      NotesStore.clearAll();
      this.loadNotes();
      this.showConfirm = false;
    },
    expandNote(note) {
      this.expandedNote = note;
    },
    truncate(text, len) {
      return text?.length > len ? text.slice(0, len) + "…" : text;
    },
    noteColor(id) {
      return ACCENT_COLORS[id % ACCENT_COLORS.length];
    },
  },
  mounted() {
    this.loadNotes();
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Scheherazade+New:wght@400;700&display=swap");

.notes-page {
  min-height: 100vh;
  direction: rtl;
  font-family: "Tajawal", sans-serif;
  background: #0a0a0f;
  color: #eee8d5;
  padding: 0 0 5rem;
  position: relative;
}

/* Ambient */
.ambient {
  position: fixed;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(212, 160, 48, 0.07) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* ── Page Header ── */
.page-header {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  border-bottom: 1px solid rgba(212, 160, 48, 0.1);
}

.page-header__text h1 {
  font-family: "Scheherazade New", serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #f0c060;
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-icon {
  width: 44px;
  height: 44px;
  background: rgba(212, 160, 48, 0.1);
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4a030;
  flex-shrink: 0;
}
.header-icon svg {
  width: 22px;
  height: 22px;
}
.page-header__text p {
  font-size: 0.85rem;
  color: #5a5448;
  font-weight: 400;
  margin: 0;
  padding-right: 56px;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Search */
.search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 160, 48, 0.12);
  border-radius: 10px;
  padding: 0 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 240px;
}
.search-wrap.active {
  border-color: rgba(212, 160, 48, 0.4);
  box-shadow: 0 0 0 3px rgba(212, 160, 48, 0.08);
}
.search-icon {
  width: 16px;
  height: 16px;
  color: #5a5448;
  flex-shrink: 0;
}
.search-wrap input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #eee8d5;
  font-family: "Tajawal", sans-serif;
  font-size: 0.9rem;
  padding: 10px 0;
  caret-color: #d4a030;
}
.search-wrap input::placeholder {
  color: #3a3428;
}
.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: #5a5448;
  padding: 0;
  line-height: 0;
  transition: color 0.2s;
}
.search-clear:hover {
  color: #d4a030;
}
.search-clear svg {
  width: 14px;
  height: 14px;
}

/* View toggle */
.view-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(212, 160, 48, 0.12);
  border-radius: 8px;
  overflow: hidden;
}
.view-toggle button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 10px;
  color: #3a3428;
  transition: background 0.2s, color 0.2s;
  line-height: 0;
}
.view-toggle button svg {
  width: 16px;
  height: 16px;
}
.view-toggle button.active {
  background: rgba(212, 160, 48, 0.12);
  color: #d4a030;
}

/* Delete all button */
.btn-danger {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(224, 85, 85, 0.08);
  border: 1px solid rgba(224, 85, 85, 0.2);
  border-radius: 8px;
  color: #e05555;
  font-family: "Tajawal", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 9px 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.btn-danger svg {
  width: 15px;
  height: 15px;
}
.btn-danger:hover {
  background: rgba(224, 85, 85, 0.15);
  border-color: rgba(224, 85, 85, 0.35);
}

/* ── Notes Container ── */
.notes-container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}

.notes-inner {
  display: grid;
  gap: 1.25rem;
}
.view-grid .notes-inner {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.view-list .notes-inner {
  grid-template-columns: 1fr;
}

/* ── Note Card ── */
.note-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 160, 48, 0.1);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  animation: cardIn 0.5s ease both;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  display: flex;
  flex-direction: column;
}
.note-card:hover {
  transform: translateY(-3px);
  border-color: rgba(212, 160, 48, 0.28);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 160, 48, 0.1);
}
.view-list .note-card {
  flex-direction: row;
  align-items: stretch;
}

.note-card__bar {
  height: 3px;
  width: 100%;
  flex-shrink: 0;
}
.view-list .note-card__bar {
  width: 3px;
  height: auto;
}

.note-card__body {
  padding: 1.2rem 1.25rem 0.8rem;
  flex: 1;
}
.note-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #eee8d5;
  margin: 0 0 8px;
  line-height: 1.4;
  display: -webkit-box;
  webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.note-card__content {
  font-size: 0.83rem;
  color: #5a5448;
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
.note-card__date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  color: #3a3428;
}
.note-card__actions {
  display: flex;
  gap: 6px;
}
.note-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  line-height: 0;
  opacity: 0;
}
.note-card:hover .note-btn {
  opacity: 1;
}
.note-btn svg {
  width: 13px;
  height: 13px;
}
.note-btn--delete {
  background: rgba(224, 85, 85, 0.08);
  color: #e05555;
}
.note-btn--delete:hover {
  background: rgba(224, 85, 85, 0.2);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Note transition group */
.note-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.note-leave-active {
  transition: all 0.25s ease;
}
.note-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.note-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ── Empty State ── */
.empty-state {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7rem 2rem;
  text-align: center;
  gap: 1rem;
}
.empty-state__icon {
  width: 80px;
  height: 80px;
  background: rgba(212, 160, 48, 0.07);
  border: 1px solid rgba(212, 160, 48, 0.15);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3a3428;
}
.empty-state__icon svg {
  width: 44px;
  height: 44px;
}
.empty-state h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #5a5448;
  margin: 0;
}
.empty-state p {
  font-size: 0.88rem;
  color: #3a3428;
  margin: 0;
}
.btn-add-first {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(212, 160, 48, 0.1);
  border: 1px solid rgba(212, 160, 48, 0.25);
  border-radius: 10px;
  color: #d4a030;
  text-decoration: none;
  padding: 10px 20px;
  font-family: "Tajawal", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
.btn-add-first:hover {
  background: rgba(212, 160, 48, 0.18);
}
.btn-add-first svg {
  width: 16px;
  height: 16px;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-card {
  background: #13131f;
  border: 1px solid rgba(212, 160, 48, 0.2);
  border-radius: 20px;
  padding: 2.5rem 2rem 2rem;
  max-width: 520px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.7);
}
.modal-card__bar {
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.modal-close {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  border-radius: 8px;
  color: #5a5448;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #eee8d5;
}
.modal-close svg {
  width: 14px;
  height: 14px;
}
.modal-card h2 {
  font-family: "Scheherazade New", serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #f0c060;
  margin: 0 0 6px;
}
.modal-date {
  font-size: 0.75rem;
  color: #3a3428;
  margin: 0 0 1.5rem;
}
.modal-content {
  font-size: 0.95rem;
  color: #9a9080;
  line-height: 1.9;
  white-space: pre-wrap;
  max-height: 50vh;
  overflow-y: auto;
  padding-left: 0.5rem;
}
.modal-delete {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 1.5rem;
  background: rgba(224, 85, 85, 0.08);
  border: 1px solid rgba(224, 85, 85, 0.2);
  border-radius: 8px;
  color: #e05555;
  font-family: "Tajawal", sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 9px 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-delete:hover {
  background: rgba(224, 85, 85, 0.18);
}

/* Confirm card */
.confirm-card {
  background: #13131f;
  border: 1px solid rgba(224, 85, 85, 0.25);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  max-width: 380px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.7);
}
.confirm-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.confirm-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #eee8d5;
  margin: 0 0 8px;
}
.confirm-card p {
  font-size: 0.85rem;
  color: #5a5448;
  margin: 0 0 1.5rem;
}
.confirm-btns {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.btn-cancel {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: #9a9080;
  font-family: "Tajawal", sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.08);
}
.btn-confirm-delete {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #e05555;
  color: #fff;
  font-family: "Tajawal", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-confirm-delete:hover {
  background: #c03030;
}

/* Modal transitions */
.modal-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-leave-active {
  transition: all 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.92);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-enter-active {
  transition: opacity 0.4s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── Light mode ── */
body:not(.dark-mode) .notes-page {
  background: #f7f2e5;
  color: #2c1f06;
}
body:not(.dark-mode) .ambient {
  background: radial-gradient(
    ellipse,
    rgba(139, 100, 30, 0.06) 0%,
    transparent 70%
  );
}
body:not(.dark-mode) .note-card {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(139, 100, 30, 0.15);
}
body:not(.dark-mode) .note-card:hover {
  border-color: rgba(139, 100, 30, 0.35);
  box-shadow: 0 8px 40px rgba(139, 100, 30, 0.15);
}
body:not(.dark-mode) .note-card__title {
  color: #2c1f06;
}
body:not(.dark-mode) .note-card__content {
  color: #9a8060;
}
body:not(.dark-mode) .note-card__footer {
  border-top-color: rgba(0, 0, 0, 0.06);
}
body:not(.dark-mode) .note-card__date {
  color: #b0a080;
}
body:not(.dark-mode) .search-wrap {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .search-wrap input {
  color: #2c1f06;
}
body:not(.dark-mode) .search-wrap input::placeholder {
  color: #c0b090;
}
body:not(.dark-mode) .view-toggle {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(139, 100, 30, 0.2);
}
body:not(.dark-mode) .modal-card,
body:not(.dark-mode) .confirm-card {
  background: #fffef8;
}
body:not(.dark-mode) .page-header {
  border-bottom-color: rgba(139, 100, 30, 0.12);
}
body:not(.dark-mode) .empty-state h3 {
  color: #9a8060;
}
body:not(.dark-mode) .empty-state p {
  color: #c0b090;
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .page-header {
    padding: 2rem 1.25rem 1.25rem;
    flex-direction: column;
  }
  .notes-container {
    padding: 0 1.25rem;
  }
  .view-grid .notes-inner {
    grid-template-columns: 1fr;
  }
  .controls {
    width: 100%;
  }
  .search-wrap {
    flex: 1;
    min-width: 0;
  }
}
</style>
