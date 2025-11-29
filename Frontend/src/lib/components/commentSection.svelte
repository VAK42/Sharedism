<script>
  import { onMount } from "svelte";
  import { api } from "../api";
  export let postId;
  let comments = [];
  let newComment = "";
  async function loadComments() {
    comments = await api("GET", `posts/${postId}/comments`);
  }
  async function addComment() {
    if (!newComment) return;
    await api("POST", `posts/${postId}/comments`, { content: newComment });
    newComment = "";
    loadComments();
  }
  onMount(loadComments);
</script>
<div class="mt-12 border-t border-zinc-800 pt-8">
  <h3 class="mb-6 text-xl font-bold text-white">Comments</h3>
  <div class="mb-8">
    <textarea bind:value={newComment} class="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" rows="3" placeholder="Add A Comment..."></textarea>
    <div class="mt-2 flex justify-end">
      <button on:click={addComment} class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200 transition-colors">Post Comment</button>
    </div>
  </div>
  <div class="space-y-6">
    {#each comments as comment}
      <div class="flex gap-4">
        <div class="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
          {comment.user?.name?.[0] || "?"}
        </div>
        <div>
          <div class="flex items-baseline gap-2">
            <span class="font-medium text-white">{comment.user?.name || "Unknown"}</span>
            <span class="text-xs text-zinc-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p class="mt-1 text-zinc-300">{comment.content}</p>
        </div>
      </div>
    {/each}
  </div>
</div>