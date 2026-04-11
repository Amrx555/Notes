const STORAGE_KEY = "notes";

export const NotesStore = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  save(notes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },

  add(note) {
    const notes = this.getAll();
    note.id = Date.now();
    note.updatedAt = note.createdAt = new Date().toISOString();
    notes.unshift(note);
    this.save(notes);
    return note;
  },

  update(id, changes) {
    const notes = this.getAll().map((n) =>
      n.id === id
        ? { ...n, ...changes, updatedAt: new Date().toISOString() }
        : n
    );
    this.save(notes);
  },

  delete(id) {
    const notes = this.getAll().filter((n) => n.id !== id);
    this.save(notes);
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  },

  getById(id) {
    return this.getAll().find((n) => n.id === id) || null;
  },

  search(query) {
    if (!query?.trim()) return this.getAll();
    const q = query.toLowerCase();
    return this.getAll().filter(
      (n) =>
        n.title?.toLowerCase().includes(q) ||
        n.content?.toLowerCase().includes(q)
    );
  },

  count() {
    return this.getAll().length;
  },

  totalChars() {
    return this.getAll().reduce((s, n) => s + (n.content?.length || 0), 0);
  },
};
