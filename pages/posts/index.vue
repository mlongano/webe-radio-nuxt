<template>
  <div class="">
    <div
      class="min-h-full pt-8 pb-0 bg-gradient-to-br from-gray-400 to-gray-100 dark:from-gray-800 dark:to-gray-400"
    >
      <HeroHeader h1="News" imgsrc="ragazza-cuffie-esclama.png"></HeroHeader>
    </div>
    <main class="mt-16 larghezza-fissa">
      <img
        v-if="isDarkTheme"
        class="mx-auto"
        src="~/assets/images/cuffie-dark.png"
        alt="microfono"
        width="80px"
        height="80px"
      />
      <img
        v-else
        class="mx-auto"
        src="~/assets/images/cuffie-light.png"
        alt="microfono"
        width="80px"
        height="80px"
      />

      <!-- // Search input to filters podcasts -->
      <form class="flex justify-center items-center px-4 sm:px-6 lg:px-8 mt-16">
        <div class="relative">
          <input
            class="h-14 w-72 lg:w-96 pr-8 pl-5 rounded-full z-0 dark:text-gray-700 shadow dark:shadow-inner focus:outline-none"
            v-model="searchQuery"
            type="search"
            placeholder="Cerca..."
          />
          <div class="absolute top-4 right-3">
            <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
          </div>
        </div>
      </form>

      <section class="flex flex-col flex-wrap md:flex-row gap-3 px-6 mt-6">
        <PostCard v-for="post in filteredList" :key="post.id" :post="post" />
      </section>
      <!-- // If no post have been found -->
      <div class="" v-if="filteredList && filteredList.length == 0">
        <img
          src="~/assets/images/undraw_page_not_found_su7k.png"
          height="453"
          width="800"
          alt="No Post found"
        />
        <p>No Post found</p>
      </div>
    </main>
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
// Import the restaurants query
import postsQuery from "~/apollo/queries/post/posts";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    PostCard,
  },

  data() {
    return {
      // Initialize an empty restaurants variabkle
      posts: [],
      searchQuery: "",
    };
  },
  apollo: {
    posts: {
      prefetch: true,
      query: postsQuery,
    },
  },
  computed: {
    // Search system
    filteredList() {
      return this.posts?.data?.filter((post) => {
        return post.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    isDarkTheme() {
      return this.$colorMode.value === "dark";
    },
  },
};
</script>
