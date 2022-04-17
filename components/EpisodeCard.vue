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
        <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" :src="$getStrapiImage(episode.cover.url)" :alt="episode.title">
            <div class="text-sm">
                <ul>
                  <li v-for="school in episode.schools" :key="school.slug" class="link-inner text-gray-900 dark:text-gray-50 leading-none">
                      <NuxtLink :to='"/schools/"+school.slug'>{{ school.short_name }}</NuxtLink>
                  </li>
                </ul>
                <p class="text-gray-600 dark:text-gray-400">{{episode.date}}</p>
            </div>
        </div>

        <NuxtLink
          class="link w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          :to="'/episodes/'+episode.slug"
          >Link</NuxtLink>
      </div>
    </div>
</template>
<style scoped>
.link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  overflow: hidden;
  text-indent: -9999px;
  z-index: 0;
}
.link-inner {
  position: relative;
  z-index: 1;
}
.link-inner:hover {
  @apply underline;
}
</style>
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

