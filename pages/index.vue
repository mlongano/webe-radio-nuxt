<template>
  <div>
    <main class="px-6">
      <h1 class="text-2xl font-semibold">WeBe Radio</h1>

      <h2>Benvenuti su WeBe Radio</h2>
      <div class="w-9/12 mx-auto mt-10">
        <div class="flex flex-row flex-wrap">
          <div class="mb-2 w-1/2">
            <div class="aspect-w-16 aspect-h-9 shadow-xl mr-1.5">

          <div class="qtmplayer-trackitem qtmplayer-donut">
					<span data-qtmplayer-cover="https://www.voicebookradio.com/wp-content/uploads/2021/06/marconi-370x370.jpeg" data-qtmplayer-file="https://www.voicebookradio.com/audio/programmi/2103-la-voce-della-radio/210609-la-voce-della-radio-marconi-rovereto-rosa-bianca.mp3" data-qtmplayer-title="LA VOCE DELLA RADIO G.MARCONI 9/06/21" data-qtmplayer-artist="scuole" data-qtmplayer-link="https://www.voicebookradio.com/podcast/la-voce-della-radio-g-marconi-9-06-21/" data-qtmplayer-icon="download" class="qtmplayer-play qtmplayer-link-sec qtmplayer-play-btn qtmplayer-play-v2">
						<i class="material-icons">play_arrow</i>
					</span>
				</div>


          </div>
          </div>
          <div class="mb-2 w-1/2">
            <div class="aspect-w-16 aspect-h-9 shadow-xl mr-1.5">

            <iframe
              src="https://www.youtube-nocookie.com/embed/eI7DN3scviQ?controls=0&showinfo=0&rel=0&autoplay=0&loop=1&playlist=PL_MtOuQ1lY4RKzEg-hRVWlgTbEXHGDrgm"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            </div>
          </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <div class="mb-2 w-1/2">
            <div class="aspect-w-16 aspect-h-9 shadow-xl mr-1.5">
              <iframe
                src="https://www.youtube-nocookie.com/embed/-WQlSXFlYLw?controls=0&showinfo=0&rel=0&autoplay=0&loop=1&playlist=PL_MtOuQ1lY4RKzEg-hRVWlgTbEXHGDrgm"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="mb-2 w-1/2">
            <div class="aspect-w-16 aspect-h-9 shadow-xl ml-1.5">
              <iframe
                src="https://www.youtube-nocookie.com/embed/mHZ74rH4stg?controls=0&showinfo=0&rel=0&autoplay=0&loop=1&playlist=PL_MtOuQ1lY4RKzEg-hRVWlgTbEXHGDrgm"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div
          class="
            bg-black bg-opacity-70
            text-white
            px-4
            py-4
            text-justify
            shadow-xl
          "
        >
          <h1 class="text-3xl font-bold text-left">Kick off WeBe Radio</h1>
          <p>
            Il progetto <b>WeBe RADIO</b> mira alla realizzazione di una web
            radio, costituita e gestita da una rete di scuole distribuite sul
            territorio provinciale, e precisamente:
          </p>
          <ul class="list-disc list-inside">
            <li>
              l’Istituto Tecnico Tecnologico &quot;<b>Marconi</b>&quot; di
              Rovereto (capofila),
            </li>
            <li>
              Istituto Tecnico Economico &quot;<b>A. Tambosi</b>&quot; di Trento
              e Istituto di Istruzione &quot;
            </li>
            <li>&quot;<b>La Rosa Bianca</b>&quot; di Cavalese/Predazzo.</li>
          </ul>

          <p>
            ogni istituto costituisce una redazione autonoma con dispositivi
            propri di trasmissione coordinati da una regia in un unico
            palinsesto. Nasce come forma di didattica sperimentale e innovativa
            tesa al coinvolgimento diretto e motivazionale dei giovani: uno
            strumento poliedrico e multidisciplinare che permette di allenare
            competenze sia tecniche che comunicative.
          </p>
        </div>
      </div>
    </main>

    <footer
      class="
        px-6
        footer
        bottom-0
        pb-10
        text-sm text-gray-300
        border-b-8 border-red-800
        w-screen
      "
    >
      <span
        >Photo by
        <a
          href="https://unsplash.com/@jasonrosewell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >Jason Rosewell</a
        >
        on
        <a
          href="https://unsplash.com/@jasonrosewell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          >Unsplash</a
        ></span
      >
    </footer>
  </div>
</template>

<script>
// Import the restaurants query
import homepageQuery from "~/apollo/queries/single/homepage";

export default {
  layout: "home",
  data() {
    return {
      // Initialize an empty restaurants variabkle
      homepage: {},
    };
  },
  apollo: {
    homepage: {
      prefetch: true,
      query: homepageQuery,
    },
  },
  computed: {
    // Search system
    filteredList() {
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
</style>
