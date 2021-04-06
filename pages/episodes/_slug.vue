<template>
  <Layout>
    <ClientOnly>
      <main class="px-6">
        <h1 class="text-2xl mb-6">
          {{ episodes[0].title }}
        </h1>

        <div>
          <g-image
            class="shadow-lg rounded-lg"
            alt="Cover image"
            v-if="episodes[0].cover"
            :src="episodes[0].cover.url"
          />
        </div>

        <markdown-it-vue class="text-gray-700 text-xs" :content="episodes[0].description" />

        <div class="">
          <Tags :post="episodes[0]" />
        </div>

        <div v-html="spreakerEmbed" />
      </main>
    </ClientOnly>
  </Layout>
</template>

<script>
import episodesQuery from "~/apollo/queries/episode/episode";
import Tags from "~/components/Tags";

export default {
  components: {
    Tags,
  },
   data() {
    return {
      episodes: [],
    };
  },
  apollo: {
    episodes: {
      prefetch: true,
      query: episodesQuery,
      variables() {
        return { slug: this.$route.params.slug };
      },
    },
  },
  head() {
    return {
      title: this.episodes[0].title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: this.episodes[0].slug,
          name: "description",
          content: this.episodes[0].description,
        }
      ]
    };
  },

  computed: {
    spreakerEmbed () {
      let page = this.$page;
      let spreakerId = page.episode.spreaker_id;
      let spreakerCode = '<a class="spreaker-player"  href="https://www.spreaker.com/e/'
      + spreakerId
      +'"data-resource="episode_key='
      + spreakerId
      +'" data-theme="dark" data-width="100%" data-height="200px" data-theme="light" data-playlist="false" data-playlist-continuous="false" data-autoplay="false" data-live-autoplay="false" data-chapters-image="true" data-episode-image-position="left" data-hide-logo="false" data-hide-likes="false" data-hide-comments="false" data-hide-sharing="false" data-hide-download="true">'
      + 'Ascolta "' + page.episode.title + '" su Spreaker.'+
      '</a>'
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
  },
};
</script>
