<template>
    <div class="px-6 pt-4 pb-2">
      <a
        class="episode-list"
        v-for="episode in episodes.data"
        :key="episode.attributes.slug"
        :href="'/episodes/'+episode.attributes.slug"
      >
        <span
          class="inline-block text-white dark:text-white dark:bg-indigo-900 bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2"
          >{{ episode.attributes.title }}</span
        >
      </a>
    </div>
</template>

<style>
.episode-list {
  position: relative;
  z-index: 1;
}
</style>
<script>
export default {
  props: ["episodes"],
};
</script>
