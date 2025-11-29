<script>
  import { api } from "$lib/api";
  import { goto } from "$app/navigation";
  let title = "";
  let content = "";
  async function createPost() {
    try {
      await api("POST", "posts", { title, content, status: "Published" });
      goto("/");
    } catch (e) {
      alert("Failed To Create Post");
    }
  }
</script>
<div class="max-w-2xl mx-auto mt-8">
  <h1 class="mb-8 text-3xl font-bold text-white tracking-tight">Create Post</h1>
  <div class="space-y-6">
    <div>
      <input bind:value={title} type="text" placeholder="Title" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-xl font-bold text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
    <div>
      <textarea bind:value={content} placeholder="Tell Your Story..." class="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-lg text-zinc-300 placeholder-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[300px]"></textarea>
    </div>
    <div class="flex justify-end">
      <button on:click={createPost} class="rounded-lg bg-white px-8 py-3 font-bold text-black hover:bg-zinc-200 transition-colors">Publish</button>
    </div>
  </div>
</div>