<template>
  <div>
    <div
      class="
        min-h-full
        pt-8
        pb-0
        bg-gradient-to-br
        dark:from-blue-800
        dark:to-blue-400
        from-blue-400
        to-blue-100;
      "
    >
      <div class="relative">
        <img
          class="z-10 relative top-0"
          src="~/assets/images/ragazzo-cuffie-indica-v2.png"
          alt=""
          srcset=""
        />
        <div
          class="
            z-0
            absolute
            font-montserrat
            text-5xl
            md:text-7xl
            top-0
            left-20
            md:left-1/2
            lg:left-96
            lg:top-0
            lg:text-9xl
          "
        >
          <h1 class="font-bold text-5xl md:text-7xl lg:text-9xl">Podcasts</h1>
        </div>
      </div>
    </div>
    <main class="mt-16">
      <img
        v-if="isDarkTheme"
        class="mx-auto"
        src="~/assets/images/microfono-pieno-bianco.png"
        alt="microfono"
        width="80px"
        height="80px"
      />
      <img
        v-else
        class="mx-auto"
        src="~/assets/images/microfono-pieno-nero.png"
        alt="microfono"
        width="80px"
        height="80px"
      />

      <div class="accordion mt-16">
        <div class="marconi accordion-item">
          <div class="accordion-text">Marconi</div>
          <div class="accordion-action" :class="borderColor">
            <a href="#" @click="getEpisodes('itt-marconi')">Marconi Home</a>
          </div>
        </div>
        <div class="larosabianca accordion-item">
          <div class="accordion-text">La&nbsp;Rosa Bianca</div>
          <div class="accordion-action" :class="borderColor">
            <a href="#">La Rosa Bianca Home</a>
          </div>
        </div>
        <div class="tambosi accordion-item">
          <div class="accordion-text">Tambosi</div>
          <div class="accordion-action" :class="borderColor">
            <a href="#">Tambosi</a>
          </div>
        </div>
      </div>

      <div class="relative mt-16">
        <h2 class="uppercase text-2xl font-bold text-center mb-3">
          Ultimi episodi
        </h2>
        <hr
          class="
            border-gray-800
            bg-gray-800
            dark:bg-gray-50
            dark:border-gray-50
            border-solid
            h-2
            w-2/3
            mx-auto
            rounded-lg
            mb-6
          "
        />
      </div>
      <section class="flex flex-col flex-wrap md:flex-row gap-3 mt-16">
        <div
          class="w-11/12 m-auto"
          v-for="episode in episodes"
          :key="episode.id"
          :episode="episode"
          v-html="spreakerEmbed(episode)"
        />
      </section>
      <!-- // If no podcast have been found -->
      <div class="" v-if="episodes.length == 0">
        <img
          src="~/assets/images/undraw_page_not_found_su7k.png"
          height="453"
          width="800"
        />
        <p>Nessun Episodio trovato</p>
      </div>
    </main>
    <footer class="mt-20">
      <img
        v-if="isDarkTheme"
        class="mx-auto mt-4 mb-4"
        src="~/assets/images/loghiBgBlack.png"
        alt="loghi"
      />
      <img
        v-else
        class="mx-auto bottom-4"
        src="~/assets/images/loghiBgWhite.png"
        alt="loghi"
      />
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
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

.accordion-item {
  @apply text-black dark:text-white;
  &:after {
    @apply bg-gradient-to-br
        dark:from-blue-800
        dark:to-blue-400
        from-blue-200
        to-blue-100;
  }
}

.accordion {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 35vh;

  @media (min-width: 768px) {
    flex-direction: row;
    height: auto;
  }
  .accordion-item:hover,
  .accordion-item:active {
    flex-grow: 6;
    &:after {
      opacity: 0.9;
    }
    .accordion-text {
      position: relative;
      @media (min-width: 768px) {
        transform: rotate(0deg) skewX(-10deg);
      }
    }
    .accordion-action {
      opacity: 1;
      @media (min-width: 768px) {
        transform: skewX(-10deg);
      }
    }
  }
}

.accordion-item {
  flex: 1;
  position: relative;
  width: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    transform: skewX(10deg);
    height: 38vw;
  }
  transition: flex-grow 0.2s, opacity 0.2s;
  &:before {
    content: "";
    position: absolute;
    left: -100%;
    width: 250%;
    height: 100%;
    @media (min-width: 768px) {
      transform: skewX(-10deg);
    }
    background-position: center;
    background-size: cover;
    z-index: -1;
    transition: transform 0.2s, width 0.2s;
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

  .accordion-text {
    position: relative;
    font-size: 6vw;
    text-align: center;
    top: 3vh;
    @media (min-width: 768px) {
      transform: rotate(90deg) skewX(10deg) translateX(13vh);
    }
    transition: all 500ms ease;
  }

  .accordion-action {
    @apply dark:border-white border-black border-solid border-2 rounded-lg;
    opacity: 0;
    position: relative;
    width: 70%;
    font-size: 2vw;
    padding: 5%;
    top: 20%;
    line-height: 1.3;
    margin: auto;
    text-align: center;
    font-size: 2vh;
    transform: rotate(0deg);
    transition: all 500ms ease;
  }

  .borderLight {
    border-color: black;
  }

  .borderDark {
    border-color: white;
  }
}

.marconi {
  &:before {
    background-image: url("~/assets/images/marconiPodcast.jpg");
  }
  &:after {
    @apply bg-gradient-to-br
      dark:from-blue-800
      dark:to-blue-400
      from-blue-400
      to-blue-100;
  }
}

.larosabianca {
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
import podcastsQuery from "~/apollo/queries/podcast/podcasts";
import lastEpisodesQuery from "~/apollo/queries/episode/lastEpisodes";

import PodcastCard from "~/components/PodcastCard.vue";

export default {
  components: {
    PodcastCard,
  },

  data() {
    return {
      // Initialize an empty restaurants variabkle
      podcasts: [],
      episodes: [],
      searchQuery: "",
    };
  },
  apollo: {
    podcasts: {
      prefetch: true,
      query: podcastsQuery,
    },
    episodes: {
      prefetch: true,
      query: lastEpisodesQuery,
      variables() {
        return { limit: 3 };
      },
    },
  },
  computed: {
    schoolEpisodes() {
      return this.episodesFiltred;
    },
    isDarkTheme() {
      return this.$colorMode.value === "dark";
    },
    borderColor() {
      if (this.$colorMode.value === "dark") {
        return "borderDark";
      }
      return "borderLight";
    },
  },
  methods: {
    audioPlayer(episode) {
      if (episode.audio?.url) {
        let audio = `<vue-plyr style="flex:2;" options='{"title":"pippo"}'>
                      <audio controls crossorigin playsinline class="w-full rounded-xl">
                        <source
                            src="${this.$getStrapiImage(episode.audio.url)}"
                            type="audio/mp3"
                        />
                      </audio>
                    </vue-plyr>`;
        let title = `<h2><a href="/episodes/${episode.slug}">${episode.title}</a></h2>`;
        let img = `<img class="rounded-xl" src="${this.$getStrapiImage(
          episode.cover.url
        )}" width="200">`;
        return `<div class="flex flex-row w-full gap-2 justify-items-center items-center">
                  ${img} <div class="flex flex-col" style="flex:2;"> ${title + audio} </div>
                </div>`;
      }
      return "";
    },

    spreakerEmbed(episode) {
      if (episode.spreaker_id) {
        let iframe = this.$spreakerIframe(
          episode.spreaker_id,
          "episode",
          "200px",
          this.$colorMode.value,
          episode.spreaker_limited
        );
        return iframe;
      } else if (episode.audio?.url) {
        return this.audioPlayer(episode);
      }
      return "";
    },

    getEpisodes(school) {
      this.episodesFiltred = this.episodes.filter((episode) => {
        return episode.school.slug === school;
      });
    },
  },
};
</script>
