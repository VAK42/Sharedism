<script>
  export let post;
</script>
<div class="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900">
  <div class="mb-4 flex items-center justify-between">
    <div class="text-xs font-medium text-zinc-500">
      By <span class="text-zinc-300">{post.user?.name || "Unknown"}</span>
    </div>
    <div class="text-xs text-zinc-600">
      {new Date(post.createdAt).toLocaleDateString()}
    </div>
  </div>
  <h2 class="mb-2 text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
    <a href={`/posts/${post.id}`} class="before:absolute before:inset-0">{post.title}</a>
  </h2>
  <p class="text-zinc-400 line-clamp-3 leading-relaxed">{post.content}</p>
</div>