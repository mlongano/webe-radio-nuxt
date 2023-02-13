<template>
  <main class="larghezza-fissa px-6" v-if="episodes && episodes.data && episodes.data[0]">
    <BackButton />

    <h1 class="text-2xl mb-6">
      {{ episodes.data[0].attributes.title }}
    </h1>

    <markdown-it-vue class="text-gray-700 text-3xl p-2 mt-0.5" :content="description" ></markdown-it-vue>
    <div v-html="spreakerEmbed" />
    <EpisodesAudio :episode="episodes.data[0].attributes" v-if="spreakerEmbed === ''"/>

    <div class="">
      <Tags :post="episodes.data[0]" />
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
      episodes: {},
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
      title: this.episodes?.data[0]?.attributes.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: this.episodes?.data[0]?.attributes.slug,
          name: "description",
          content: this.episodes?.data[0]?.attributes.description || "",
        },
      ],
    };
  },

  computed: {
    spreakerEmbed() {
      //console.log(this.episodes?.data[0]?.attributes);
      let episode = this.episodes?.data[0]?.attributes;
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
      return this.episodes?.data[0]?.attributes.description || "";
    },
  },
};
</script>
