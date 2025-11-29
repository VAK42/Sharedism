<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { api } from "$lib/api";
  import CommentSection from "$lib/components/commentSection.svelte";
  let post = null;
  onMount(async () => {
    post = await api("GET", `posts/${$page.params.id}`);
  });
</script>
{#if post}
  <div class="max-w-3xl mx-auto mt-12">
    <header class="mb-8">
      <h1 class="mb-4 text-4xl font-extrabold text-white tracking-tight leading-tight">{post.title}</h1>
      <div class="flex items-center gap-4 text-zinc-500">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
            {post.user?.name?.[0] || "?"}
          </div>
          <span class="font-medium text-zinc-300">{post.user?.name || "Unknown"}</span>
        </div>
        <span>•</span>
        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      </div>
    </header>
    <div class="prose prose-invert prose-lg max-w-none text-zinc-300 leading-relaxed">
      {post.content}
    </div>
    <CommentSection postId={post.id} />
  </div>
{:else}
  <div class="flex justify-center mt-20">
    <div class="animate-pulse text-zinc-500">Loading...</div>
  </div>
{/if}