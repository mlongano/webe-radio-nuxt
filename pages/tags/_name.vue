<template>
  <div class="px-6">
    <BackButton />

    <div >
      <!-- // Search input to filters podcasts -->
      <form class="flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="relative">
          <input
            class="h-14  w-72 lg:w-96 pr-8 pl-5 rounded-full z-0 dark:text-gray-700 shadow dark:shadow-inner focus:outline-none"
            v-model="searchQuery"
            type="search"
            placeholder="Cerca..."
          />
          <div class="absolute top-4 right-3">
            <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
        </div>
      </form>

<!--       <section class="flex flex-col flex-wrap md:flex-row gap-3 mt-6">
        <PodcastCard
          v-for="podcast in filteredList"
          :key="podcast.id"
          :podcast="podcast"
        />
      </section>
 -->
      <div class="flex flex-col flex-wrap md:flex-row gap-3 mt-6" v-if="filteredList">
        <div
          v-for="podcast in filteredList"
          :key="podcast.id"
          :podcast="podcast"
        >
        <PodcastCard :podcast="podcast" />
        </div>
      </div>
 <!-- // If no podcast have been found -->
      <div class="flex justify-center items-center flex-col mt-8" v-if="!filteredList || filteredList.length == 0">
        <img
          src="~/assets/images/undraw_page_not_found_su7k.png"
          height="453"
          width="800"
          alt="No Podcast found"
        />
        <p>No Podcast found</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>

<script>
import tagQuery from "~/apollo/queries/tag/tag";
import Tags from "~/components/Tags";
import EpisodesList from "~/components/EpisodesList";
import BackButton from "~/components/BackButton";
import PodcastCard from "~/components/PodcastCard.vue";

export default {
  components: {
    Tags,
    EpisodesList,
    BackButton,
    PodcastCard,
  },
  data() {
    return {
      tags: {
        data: [],
      },
      searchQuery: "",
    };
  },
  apollo: {
    tags: {
      prefetch: true,
      query: tagQuery,
      variables() {
        return { name: this.$route.params.name };
      },
    },
  },
  computed: {
    filteredList() {
      if (!this.tags?.data) return [];
      return this.tags?.data[0]?.attributes.podcasts.data.filter((podcast) => {
        return podcast.attributes.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>
