<script>
  import { auth } from "../stores/auth";
  import { goto } from "$app/navigation";
  function logout() {
    auth.set({ token: null, user: null });
    goto("/login");
  }
</script>
<nav class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
  <div class="container mx-auto flex items-center justify-between p-4">
    <a href="/" class="text-xl font-bold tracking-tight text-white">Sharedism</a>
    <div class="flex items-center gap-6 text-sm font-medium text-zinc-400">
      {#if $auth.token}
        <a href="/create" class="hover:text-white transition-colors">Create Post</a>
        <a href="/profile" class="hover:text-white transition-colors">Profile</a>
        <button on:click={logout} class="hover:text-white transition-colors">Logout</button>
      {:else}
        <a href="/login" class="hover:text-white transition-colors">Login</a>
        <a href="/register" class="bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">Register</a>
      {/if}
    </div>
  </div>
</nav>