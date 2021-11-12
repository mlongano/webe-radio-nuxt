<template>
  <div>
    <main
      class="
        min-h-full
        pt-8
        pb-8
        bg-gradient-to-br
        dark:from-purple-800
        dark:to-purple-400
        from-purple-400
        to-purple-100;
      "
    >
      <div class="relative">
        <img
          class="z-10 relative top-0"
          src="~/assets/images/ragazza-cuffie-microfono-sorride.png"
          alt=""
          srcset=""
        />
        <div
          class="
            z-0
            absolute
            font-montserrat
            top-1/10
            left-9/20
            md:top-2/10
            md:left-5/10
            lg:left-4/10
          "
        >
          <h1 class="font-bold text-6xl md:text-8xl lg:text-9xl">WeBe</h1>
          <h2 class="font-normal text-3xl md:text-4xl lg:text-7xl uppercase text-center">
            Radio
          </h2>
        </div>
      </div>
      <div class="w-11/12 m-auto" v-html="spreakerEmbed" />
    </main>
    <footer class="mt-36">
      <img
        v-if="isDarkTheme"
        class="mx-auto mb-36"
        src="~/assets/images/airpodsWhite.png"
        alt="airpods"
        width="80px"
        height="80px"
      />
      <img
        v-else
        class="mx-auto mb-36"
        src="~/assets/images/airpodsBlack.png"
        alt="airpods"
        width="80px"
        height="80px"
      />

      <div class="mx-auto w-4/5 text-2xl font-medium">
        <h2 class="text-4xl mb-6">Il progetto</h2>

        <p class="mb-6">
          WeBe RADIO mira alla realizzazione di una web radio, costituita e
          gestita da una rete di scuole distribuite sul territorio provinciale,
          e precisamente dalle seguenti scuole:
        </p>

        <ul class="mb-6 list-disc list-inside">
          <li>Tecnico Tecnologico "Marconi" di Rovereto (capofila)</li>
          <li>Istituto Tecnico Economico "A. Tambosi" di Trento</li>
          <li>Istituto di Istruzione "La Rosa Bianca" di Cavalese/Predazzo.</li>
        </ul>
        <p class="mb-36">
          Ogni istituto costituisce una redazione autonoma con dispositivi
          propri di trasmissione coordinati da una regia in un unico palinsesto.
          Nasce come forma di didattica sperimentale e innovativa tesa al
          coinvolgimento diretto e motivazionale dei giovani: uno strumento
          poliedrico e multidisciplinare che permette di allenare competenze sia
          tecniche che comunicative.
        </p>
      </div>
      <div class="relative">
        <h2 class="uppercase text-2xl font-bold text-center mb-3">Le scuole</h2>
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
        <div class="flex flex-row flex-wrap justify-around gap-3">
          <a href="/schools/itt-marconi"><img src="~/assets/images/marconiQuadrato.jpg" alt="Marconi" /></a>
          <a href="/schools/la-rosa-bianca"><img
            src="~/assets/images/larosabiancaQuadrato.jpg"
            alt="La Rosa Bianca"
          /></a>
          <a href="/schools/ite-tambosi"><img src="~/assets/images/tambosiQuadrato.jpg" alt="Tambosi" /></a>
        </div>
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
      </div>
    </footer>
  </div>
</template>

<script>
// Import the restaurants query
import homepageQuery from "~/apollo/queries/single/homepage";
import lastEpisodesQuery from "~/apollo/queries/episode/lastEpisodes";
import EpisodesAudio from "~/components/EpisodesAudio.vue";


export default {
  layout: "home",
  components: {
    EpisodesAudio,
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
    isDarkTheme() {
      return this.$colorMode.value === "dark";
    },
    audioPlayer() {
      let numberOfEpisodes =  this.episodes.length;
      let selectedEpisode = Math.floor(Math.random() * numberOfEpisodes);
      let episode = this.episodes[selectedEpisode];
      if (episode?.audio?.url) {
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

    spreakerEmbed() {
      let numberOfEpisodes =  this.episodes.length;
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
        this.audioPlayer();
      };
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

audio {
  margin: auto;
}

div >>> iframe {
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.85);
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
div >>> iframe {
  background-color: #a78bfa;
}
</style>
