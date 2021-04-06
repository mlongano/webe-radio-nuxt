<template>
  <div>
    <!-- // Link to go back to the previous page -->
    <a class="" @click="$router.go(-1)">
      <i class="fa fa-arrow-left"></i>Indietro
    </a>

    <ClientOnly>
      <main class="px-6">
        <h1 class="text-2xl mb-6">
          {{ podcasts[0].title }}
        </h1>

        <div>
          <img
            class="shadow-lg rounded-lg"
            alt="Cover image"
            v-if="podcasts[0].cover"
            :src="$getStrapiImage(podcasts[0].cover.url)"
          />
        </div>
        <markdown-it-vue class="text-gray-700 text-xs" :content="podcasts[0].description" />

        <div>
          <EpisodesList :podcast="podcasts[0]" />
        </div>
        <div class="">
          <Tags :post="podcasts[0]" />
        </div>

        <div v-html="spreakerEmbed" />
      </main>
    </ClientOnly>
  </div>
</template>

<script>
import podcastsQuery from "~/apollo/queries/podcast/podcast";
import Tags from "~/components/Tags";
import EpisodesList from "~/components/EpisodesList";

export default {
  components: {
    Tags,
    EpisodesList,
  },
  data() {
    return {
      podcasts: [],
    };
  },
  apollo: {
    podcasts: {
      prefetch: true,
      query: podcastsQuery,
      variables() {
        return { slug: this.$route.params.slug };
      },
    },
  },
  computed: {
    spreakerEmbed() {
      let podcast = this.podcasts[0];
      let spreakerId = podcast.spreaker_id;
      let spreakerCode =
        '<a class="spreaker-player"  href="https://www.spreaker.com/s/' +
        spreakerId +
        '" data-resource="show_key=' +
        spreakerId +
        '" data-width="100%" data-height="500px" data-theme="dark" data-playlist="true" data-playlist-continuous="false" data-autoplay="false" data-live-autoplay="false" data-chapters-image="true" data-episode-image-position="left" data-hide-logo="false" data-hide-likes="false" data-hide-comments="false" data-hide-sharing="false" data-hide-download="true">' +
        'Ascolta "' +
        podcast.title +
        '" su Spreaker.' +
        "</a>";
      return spreakerCode;
    },
  },

  mounted() {
    let spreakerWidgets = document.createElement("script");
    spreakerWidgets.setAttribute("async", true);
    spreakerWidgets.setAttribute(
      "src",
      "https://widget.spreaker.com/widgets.js"
    );
    document.body.appendChild(spreakerWidgets);
    console.log("Spreaker mounted");
    console.log(this.spreakerEmbed);
  },
};
</script>
