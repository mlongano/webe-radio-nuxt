<template>
  <div class="larghezza-fissa px-6">
    <BackButton />
    <main>
      <h1 class="text-3xl mb-6 mx-auto text-center">
        {{ podcasts[0].title }}
      </h1>

      <div>
        <img
          class="shadow-lg rounded-lg w-72 mb-8 mx-auto"
          alt="Cover image"
          v-if="podcasts[0].cover"
          :src="$getStrapiImage(podcasts[0].cover.url)"
        />
      </div>
      <markdown-it-vue
        class="text-gray-700 text-3xl p-2 mt-0.5"
        :content="description"
      />

      <div>
        <EpisodesList :episodes="podcasts[0].episodes" />
      </div>
      <div class="">
        <Tags :post="podcasts[0]" />
      </div>

      <div v-html="spreakerEmbed" />
      <EpisodesAudio class="mb-4" v-for="episode in podcasts[0].episodes" :key="episode.id"  :episode="episode" v-if="spreakerEmbed === ''"/>

    </main>
  </div>
</template>
<style scoped>
.markdown-body {
  font-size: 1.5rem;
}
</style>
<script>
import podcastsQuery from "~/apollo/queries/podcast/podcast";
import Tags from "~/components/Tags";
import EpisodesList from "~/components/EpisodesList";
import BackButton from "~/components/BackButton";

export default {
  components: {
    Tags,
    EpisodesList,
    BackButton,
  },
  data() {
    return {
      podcasts: [
        {
          id: "",
          title: "",
          slug: "",
          date: "",
          description: "",
          spreaker_id: "",
        },
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
      if (podcast.spreaker_id) {
        return this.$spreakerIframe(
          podcast.spreaker_id,
          "show",
          "500px",
          this.$colorMode.value,
          podcast.spreaker_limited
        );
      }
      return "";
    },
    description() {
      return this.podcasts[0].description || "";
    },
  },
};
</script>
