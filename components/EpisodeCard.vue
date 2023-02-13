<template>
    <div class="text-gray-700 dark:text-white dark:bg-gray-700 relative max-w-sm rounded overflow-hidden shadow-lg mb-6">
      <img
        alt="Cover image"
        v-if="episodeAttributes.cover"
        class="w-full"
        :src="$getStrapiImage(cover)"
      />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2" v-html="episodeAttributes.title" />
        <markdown-it-vue class="text-gray-700 dark:text-gray-50 text-xs" :content="description" />
        <Tags :post="episode" />
        <div class="flex items-center">
            <img class="w-16 h-16 rounded-full mr-4" :src="$getStrapiImage(podcastCover)" :alt="episodeAttributes.title">
            <div class="text-sm">
                <p class="link-inner font-semibold text-gray-900 dark:text-gray-50">
                <NuxtLink :to='"/podcasts/"+podcastSlug'>{{ podcastTitle }}</NuxtLink>
                </p>
                <ul>
                  <li v-for="school in schools" :key="school.id" class="link-inner text-gray-900 dark:text-gray-50 leading-none">
                      <NuxtLink :to='"/schools/"+school.attributes.slug'>{{ school.attributes.short_name }}</NuxtLink>
                  </li>
                </ul>
                <p class="text-gray-600 dark:text-gray-400">{{episodeAttributes.date}}</p>
            </div>
        </div>

        <a
          class="link w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          :href="'/episodes/'+episodeAttributes.slug"
          >Link</a>
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
.link-inner:hover, .link-inner:focus {
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
    episodeAttributes () {
      return this.episode?.attributes || {};
    },
    cover () {
      return this.episode.attributes?.cover?.data?.attributes?.url || "";
    },
    podcastCover () {
      return this.episode.attributes?.podcast?.data?.attributes?.cover?.data?.attributes?.url || "";
    },
    podcastTitle () {
      return this.episode.attributes?.podcast?.data?.attributes?.title || "";
    },
    podcastSlug () {
      return this.episode.attributes?.podcast?.data?.attributes?.slug || "";
    },
    schools () {
      return this.episode.attributes?.schools?.data || [];
    },
    // Search system
    description() {
      return this.episode.attributes?.description || "";
    },
    google() {
      return this.episode.attributes?.distribution?.google?.url || "";
    }
  },

};
</script>

