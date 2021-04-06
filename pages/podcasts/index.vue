<template>
  <div class="px-6 podcasts">
    <!-- // Search input to filters podcasts -->
    <form class="flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="relative">
        <input
        class="h-14 w-96 pr-8 pl-5 rounded-full z-0 dark:text-gray-700 shadow dark:shadow-inner focus:outline-none"
        v-model="query"
        type="search"
        placeholder="Cerca..."
      />
      <div class="absolute top-4 right-3"> <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
      </div>
    </form>

    <PodcastCard
          v-for="podcast in filteredList"
          :key="podcast.id"
          :podcast="podcast"
      />


    <!-- // If no podcast have been found -->
    <div
      class=""
      v-if="filteredList.length == 0"
    >
      <img
        src="/images/undraw_page_not_found_su7k.png"
        height="453"
        width="800"
      />
      <p>No Podcast found</p>
    </div>
  </div>
</template>

<script>
// Import the restaurants query
import podcastsQuery from "~/apollo/queries/podcast/podcasts";
import PodcastCard from "~/components/PodcastCard.vue";

export default {
  components: {
    PodcastCard,
  },

  data() {
    return {
      // Initialize an empty restaurants variabkle
      podcasts: [],
      query: "",
    };
  },
  apollo: {
    podcasts: {
      prefetch: true,
      query: podcastsQuery,
    },

  },
  computed: {
    // Search system
    filteredList() {
      return this.podcasts.filter((podcast) => {
        return podcast.title.toLowerCase().includes(this.query.toLowerCase());
      });
    },
  },
};
</script>
