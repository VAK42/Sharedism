<script>
  import { onMount } from "svelte";
  import { api } from "$lib/api";
  import PostCard from "$lib/components/postCard.svelte";
  let posts = [];
  onMount(async () => {
    const res = await api("GET", "posts");
    posts = res.posts;
  });
</script>
<div class="max-w-4xl mx-auto">
  <h1 class="mb-8 text-3xl font-bold text-white tracking-tight">Recent Posts</h1>
  <div class="grid gap-6">
    {#each posts as post}
      <PostCard {post} />
    {/each}
  </div>
</div>