import { get } from "svelte/store";
import { auth } from "./stores/auth";
const baseUrl = "http://localhost:3000";
export async function api(method: string, path: string, data?: any) {
  const token = get(auth).token;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const opts: RequestInit = { method, headers };
  if (data) opts.body = JSON.stringify(data);
  const res = await fetch(`${baseUrl}/${path}`, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}