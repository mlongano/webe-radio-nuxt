<template>
  <div class="w-screen">
    <main
      class="min-h-full pt-8 pb-8 bg-gradient-to-br dark:from-purple-800 dark:to-purple-400 from-purple-400 to-purple-100;">
      <HeroHeader h1="WeBE" h2="Radio" imgsrc="ragazza-natalizia.png">
      <!--
        <div class="absolute top-[130px] right-0 bg-black opacity-80">
          <img class="max-h-80" src="~/assets/images/palinsesto.png" alt="Palinsesto" />
        </div>
      -->
      <div class="larghezza-fissa" v-html="spreakerEmbed" />
      </HeroHeader>
    </main>

    <!-- icona cuffiette -->
    <div class="larghezza-fissa my-20">
      <img v-if="isDarkTheme" class="mx-auto" src="~/assets/images/airpodsWhite.png" alt="airpods" width="80px"
        height="80px" />
      <img v-else class="mx-auto" src="~/assets/images/airpodsBlack.png" alt="airpods" width="80px" height="80px" />
    </div>

    <!-- player icecast -->
    <WebePlayer class="mb-8" />

    <!-- qr code e link per l'app webe radio -->
    <div class="flex flex-row flex-wrap justify-center gap-8 mb-8">
      <a href="https://play.google.com/store/apps/details?id=com.newradio.weberadio" class="store-badge">
        <img v-if="isDarkTheme" class="h-full min-w-full object-cover align-bottom" alt="Disponibile su Google Play"
          src="~/assets/images/android-dark.svg" />

        <img v-else class="h-full min-w-full object-cover align-bottom" alt="Disponibile su Google Play"
          src="~/assets/images/android-light.svg" />
      </a>
      <a href="https://apps.apple.com/it/app/webe-radio/id1609278287" class="store-badge">
        <img v-if="isDarkTheme" class="h-full object-cover min-w-full align-bottom" src="~/assets/images/apple-dark.svg"
          alt="Disponibile su Apple Store" />
        <img v-else class="h-full object-cover min-w-full align-bottom" src="~/assets/images/apple-light.svg"
          alt="Disponibile su Apple Store" />
      </a>
    </div>

    <footer class="mt-8">
      <div class="larghezza-fissa px-10">
        <h2 class="text-4xl mb-6">Il progetto</h2>

        <p class="mb-6">
          WeBe RADIO mira alla realizzazione di una web radio, costituita e gestita da una
          rete di scuole distribuite sul territorio provinciale, e precisamente dalle
          seguenti scuole:
        </p>

        <ul class="mb-6 list-disc list-inside">
          <li>Tecnico Tecnologico "Marconi" di Rovereto (capofila)</li>
          <li>Istituto Tecnico Economico "A. Tambosi" di Trento</li>
          <li>Istituto di Istruzione "La Rosa Bianca" di Cavalese/Predazzo.</li>
        </ul>
        <p class="mb-36">
          Ogni istituto costituisce una redazione autonoma con dispositivi propri di
          trasmissione coordinati da una regia in un unico palinsesto. Nasce come forma di
          didattica sperimentale e innovativa tesa al coinvolgimento diretto e
          motivazionale dei giovani: uno strumento poliedrico e multidisciplinare che
          permette di allenare competenze sia tecniche che comunicative.
        </p>
      </div>
      <div class="relative larghezza-fissa">
        <h2 class="uppercase text-2xl font-bold text-center mb-3">Le scuole</h2>
        <hr
          class="border-gray-800 bg-gray-800 dark:bg-gray-50 dark:border-gray-50 border-solid h-2 w-2/3 mx-auto rounded-lg mb-6" />
        <div class="flex flex-row flex-wrap justify-around gap-3">
          <a href="/schools/itt-marconi">
            <img class="img-scuole" src="~/assets/images/marconiQuadrato.jpg" alt="Marconi" />
          </a>
          <a href="/schools/la-rosa-bianca">
            <img class="img-scuole" src="~/assets/images/larosabiancaQuadrato.jpg" alt="La Rosa Bianca" />
          </a>
          <a href="/schools/ite-tambosi">
            <img class="img-scuole" src="~/assets/images/tambosiQuadrato.jpg" alt="Tambosi" />
          </a>
        </div>
        <img v-if="isDarkTheme" class="mx-auto mt-4 mb-4" src="~/assets/images/loghiBgBlack.png" alt="loghi" />
        <img v-else class="mx-auto bottom-4" src="~/assets/images/loghiBgWhite.png" alt="loghi" />
      </div>
    </footer>
  </div>
</template>

<script>
// Import the restaurants query
import homepageQuery from "~/apollo/queries/single/homepage";
import lastEpisodesQuery from "~/apollo/queries/episode/lastEpisodes";
import WebePlayer from "~/components/WebePlayer.vue";
import HeroHeader from "~/components/HeroHeader.vue";

export default {
  layout: "home",
  components: {
    WebePlayer,
    HeroHeader: HeroHeader,
  },

  data() {
    return {
      // Initialize an empty restaurants variabkle
      homepage: {},
      episodes: {},
    };
  },
  apollo: {
    homepage: {
      prefetch: true,
      query: homepageQuery,
    },
    episodes: {
      prefetch: true,
      query: lastEpisodesQuery,
      variables() {
        return { limit: 100 };
      },
    },
  },
  computed: {
    // Search system
    filteredList() {
      return "";
    },
    themeMode() {
      return this.$colorMode.value === "dark" ? "dark" : "light";
    },

    isDarkTheme() {
      return this.$colorMode.value === "dark";
    },

    spreakerEmbed() {
      /*
      let iframe = this.$spreakerIframe(
                "49902194",
                "episode",
                "200px",
                this.$colorMode.value,
                false,
              );

      return iframe;
      */
      let numberOfEpisodes = this.episodes.length;
      let selectedEpisode = Math.floor(Math.random() * numberOfEpisodes);
      let episode = this.episodes[selectedEpisode];
      if (episode?.spreaker_id) {
        let iframe = this.$spreakerIframe(
          episode.spreaker_id,
          "episode",
          "200px",
          this.$colorMode.value,
          episode.spreaker_limited
        );
        return iframe;
      } else if (episode?.audio?.url) {
        return this.$audioPlayer(episode);
      }
      return "";
    },
  },
};
</script>

<style lang="postcss" scoped>
.badge {
  @apply inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200;
  &:hover {
    @apply bg-gray-300;
  }
}
.store-badge {
  width: 90vw;
  max-width: min(140px, 90vw);
  @apply shadow-2xl rounded-lg;
}

.img-scuole {
  width: 100%;
  max-width: 300px;
  @apply shadow-2xl rounded-lg;
}

.container-no {
  @apply mx-auto;
  @apply max-w-screen-lg;
}

audio {
  margin: auto;
}

div >>> iframe {
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.85);
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
div >>> iframe {
  background-color: #a78bfa;
}
</style>
