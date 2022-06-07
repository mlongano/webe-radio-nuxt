<template>
  <main class="larghezza-fissa px-6">
    <BackButton />

    <h1 class="text-2xl mb-6">
      {{ episodes[0].title }}
    </h1>

    <markdown-it-vue class="text-gray-700 text-3xl p-2 mt-0.5" :content="description" ></markdown-it-vue>

    <div v-html="spreakerEmbed" />
    <EpisodesAudio :episode="episodes[0]" v-if="spreakerEmbed === '' && episodes[0]"/>

    <div class="">
      <Tags :post="episodes[0]" />
    </div>

  </main>
</template>
<style lang="postcss" scoped>
  .audio {
    background-color: #202f4d;
  }
</style>
<script>
import episodesQuery from "~/apollo/queries/episode/episode";
import Tags from "~/components/Tags";
import BackButton from "~/components/BackButton";
import MarkDown from "../../components/MarkDown.vue";
import EpisodesAudio from "../../components/EpisodesAudio.vue";

export default {
  components: {
    Tags,
    BackButton,
    MarkDown,
    EpisodesAudio
},
  data() {
    return {
      episodes: [{}],
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
          content: this.episodes[0].description || "",
        },
      ],
    };
  },

  computed: {
    spreakerEmbed() {
      let episode = this.episodes[0];
      if (episode.spreaker_id) {
        return this.$spreakerIframe(
          episode.spreaker_id,
          "episode",
          "200px",
          this.$colorMode.value,
          episode.spreaker_limited
        );
      }
      return "";
    },
    description() {
      return this.episodes[0].description || "";
    },
  },
};
</script>
