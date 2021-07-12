<template>
    <div class="text-gray-700 dark:text-white dark:bg-gray-700 relative max-w-sm rounded overflow-hidden shadow-lg mb-6">
      <img
        alt="Cover image"
        v-if="episode.cover"
        class="w-full"
        :src="$getStrapiImage(episode.cover.url)"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2" v-html="episode.title" />
        <markdown-it-vue class="text-gray-700 dark:text-gray-50 text-xs" :content="description" />
        <Tags :post="episode" />
      </div>
    </div>
</template>
<script>
import Tags from "~/components/Tags";

export default {
  components: {
    Tags,
  },
  props: ["episode"],
  computed: {
    // Search system
    description() {
      return this.episode.description || "";
    },
    google() {
      return this.episode.distribution?.google?.url || "";
    }
  },

};
</script>

