<script>
  import { onMount } from "svelte";
  import { api } from "$lib/api";
  import { auth } from "$lib/stores/auth";
  let user = null;
  let name = "";
  onMount(async () => {
    user = await api("GET", "users/me");
    name = user.name;
  });
  async function updateProfile() {
    try {
      const updated = await api("PATCH", "users/me", { name });
      user = updated;
      auth.update(s => ({ ...s, user: updated }));
      alert("Profile Updated");
    } catch (e) {
      alert("Update Failed");
    }
  }
</script>
<div class="max-w-md mx-auto mt-12">
  <h1 class="mb-8 text-3xl font-bold text-white tracking-tight">Profile Settings</h1>
  {#if user}
    <div class="space-y-6">
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-400">Email Address</label>
        <input value={user.email} disabled class="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-500 cursor-not-allowed" />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-400">Display Name</label>
        <input bind:value={name} type="text" class="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>
      <div class="pt-4">
        <button on:click={updateProfile} class="w-full rounded-lg bg-white py-3 font-bold text-black hover:bg-zinc-200 transition-colors">Save Changes</button>
      </div>
    </div>
  {:else}
    <div class="animate-pulse text-zinc-500">Loading...</div>
  {/if}
</div>