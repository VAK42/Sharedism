import { writable } from "svelte/store";
import { browser } from "$app/environment";
const stored = browser ? localStorage.getItem("auth") : null;
export const auth = writable(stored ? JSON.parse(stored) : { token: null, user: null });
if (browser) {
  auth.subscribe((val) => localStorage.setItem("auth", JSON.stringify(val)));
}