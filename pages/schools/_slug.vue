<template>
  <div class="">
    <div class="hero relative bg-cover bg-no-repeat">
      <div :class="$route.params.slug" class="hero-school relative">
        <div class="hero-text font-montserrat text-5xl pb-16">
          <h1 class="font-bold text-5xl relative z-10 opacity-100">
            {{ school }}
          </h1>
        </div>
      </div>
    </div>

    <!-- // Search input to filters podcasts -->
    <form class="flex justify-center items-center px-4 md:px-6 lg:px-8 mt-12">
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

    <section class="flex flex-col flex-wrap md:flex-row gap-3 mt-6 px-6">
      <PodcastCard v-for="podcast in filteredList" :key="podcast.id" :podcast="podcast" />
    </section>
    <!-- // If no podcast have been found -->
    <div class="" v-if="filteredList.length == 0">
      <img
        src="~/assets/images/undraw_page_not_found_su7k.png"
        height="453"
        width="800"
      />
      <p>No Podcast found</p>
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

$accordion-item-amount: 5;
$accordion-item-rotate: 15;
$mq-desktop: "min-width: 630px";

:root {
  --accordion-item-amount: 5;
  --accordion-item-rotate: 15;
  --mq-desktop: "min-width: 630px";
  --bg-podcast-1: "~/assets/images/microfono-pieno-nero.png";
  --bg-podcast-2: "~/assets/images/marconiPodcast.jpg";
  --bg-podcast-3: "~/assets/images/larosabiancaPodcast.jpg";
  --bg-podcast-4: "~/assets/images/tambosiPodcast.jpg";
  --bg-podcast-5: "~/assets/images/microfono-pieno-nero.png";
}

.badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
}

.accordion {
  @apply flex flex-col w-full h-80 md:h-128 lg:h-176 mx-auto;
}

.accordion-item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  .accordion-text {
    position: relative;
    font-size: 6vw;
    text-align: center;
    top: 3vh;
  }
}

.hero-school {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  .hero-text {
    padding-top: 4em;
    font-size: 4rem;
    text-align: center;
  }
}

.itt-marconi {
  &:before {
    background-image: url("~/assets/images/marconiPodcast.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  &:after {
    @apply bg-gradient-to-br
      dark:from-blue-800
      dark:to-blue-400
      from-blue-400
      to-blue-100;
  }
}

.la-rosa-bianca {
  &:before {
    background-image: url("~/assets/images/larosabiancaPodcast.jpg");
  }
  &:after {
    @apply bg-gradient-to-br from-purple-400 to-purple-100 dark:from-purple-800 dark:to-purple-400;
  }
  .accordion-text {
    @media (min-width: 768px) {
      top: -2vh;
    }
  }
}

.tambosi {
  &:before {
    background-image: url("~/assets/images/tambosiPodcast.jpg");
  }
  &:after {
    @apply bg-gradient-to-br from-gray-400 to-gray-100 dark:from-gray-800 dark:to-gray-400;
  }
}
</style>
<script>
// Import the restaurants query
import podcastsQuery from "~/apollo/queries/podcast/schoolPodcasts";
import PodcastCard from "~/components/PodcastCard.vue";

export default {
  components: {
    PodcastCard,
  },

  data() {
    return {
      // Initialize an empty restaurants variabkle
      podcasts: [],
      searchQuery: "",
      schoolsBackground: {
        "itt-marconi": "bg-marconi-podcast",
        "la-rosa-bianca": "bg-larosabianca-podcast",
        tambosi: "bg-tambosi-podcast",
      },
      schoolsName: {
        "itt-marconi": "Istituto Tecnico Tecnologico G. Marconi - Rovereto",
        "la-rosa-bianca": 'Istituto di Istruzione "La Rosa Bianca"',
        tambosi: 'Istituto Tecnico Economico "A. Tambosi"',
      },
    };
  },
  apollo: {
    podcasts: {
      prefetch: true,
      query: podcastsQuery,
      variables() {
        return { school: this.$route.params.slug };
      },
    },
  },
  computed: {
    // Search system
    filteredList() {
      return this.podcasts.filter((podcast) => {
        return podcast.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    school() {
      return (
        this.podcasts[0]?.school?.name || this.schoolsName[this.$route.params.slug] || ""
      );
    },
    schoolBackground() {
      return this.schoolsBackground[this.$route.params.slug] || "";
    },
  },
};
</script>
