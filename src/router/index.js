import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import AddNote from "../views/AddNote.vue";
import NotesList from "../views/NotesList.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/add", name: "AddNote", component: AddNote },
  { path: "/list", name: "NotesList", component: NotesList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
