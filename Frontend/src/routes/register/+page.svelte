<script>
  import { api } from "$lib/api";
  import { goto } from "$app/navigation";
  let name = "";
  let email = "";
  let password = "";
  async function register() {
    try {
      await api("POST", "auth/register", { name, email, password });
      goto("/login");
    } catch (e) {
      alert("Registration Failed");
    }
  }
</script>
<div class="flex min-h-[80vh] items-center justify-center">
  <div class="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl">
    <h1 class="mb-6 text-2xl font-bold text-white text-center">Create Account</h1>
    <div class="space-y-4">
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-400">Name</label>
        <input bind:value={name} type="text" class="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John Doe" />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-400">Email</label>
        <input bind:value={email} type="email" class="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="name@example.com" />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium text-zinc-400">Password</label>
        <input bind:value={password} type="password" class="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
      </div>
      <button on:click={register} class="mt-4 w-full rounded-lg bg-white py-3 font-bold text-black hover:bg-zinc-200 transition-colors">Sign Up</button>
    </div>
  </div>
</div>