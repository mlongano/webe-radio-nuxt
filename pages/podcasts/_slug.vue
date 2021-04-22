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
      podcasts: [
        {
          id:"",
          title:"",
          slug:"",
          date:"",
          description:"",
          spreaker_id:"",
        }
      ],
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
      this.$forceUpdate();
      return this.$spreakerEmbed(podcast.spreaker_id, podcast.title, "s", "500px", this.$colorMode.preference)
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
    this.$forceUpdate();
  },
};
</script>
