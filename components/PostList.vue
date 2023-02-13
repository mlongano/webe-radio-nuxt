<template>
    <div class="px-6 pt-4 pb-2" v-if="posts">
      <a
        class="relative z-10"
        v-for="post in posts"
        :key="post.attributes.slug"
        :href="'/posts/'+post.attributes.slug"
      >
        <span
          class="inline-block text-white dark:text-white dark:bg-indigo-900 bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2"
          >{{ post.attributes.title }}</span
        >
      </a>
    </div>
</template>

<style>
</style>
<script>
export default {
  props: ["posts"],
};
</script>

