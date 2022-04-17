<template>
  <main class="larghezza-fissa px-6">
    <BackButton />

    <h1 class="text-2xl mb-6">
      {{ episodes[0].title }}
    </h1>

    <markdown-it-vue class="text-gray-700 text-3xl p-2 mt-0.5" :content="description" ></markdown-it-vue>

    <div v-html="spreakerEmbed" />
    <div class="w-max flex flex-row justify-items-center items-center shadow-lg" v-if="spreakerEmbed === '' && episodes[0]">
        <img
          class="w-36 shadow-lg rounded-lg pr-2"
          alt="Cover image"
          v-if="episodes[0].cover"
          :src="$getStrapiImage(episodes[0].cover.url)"
        />
          <audio controls crossorigin playsinline class="audio w-full shadow-lg rounded-xl mr-2 dark:bg-white">
            <source v-if="episodes[0].audio" :src="$getStrapiImage(episodes[0].audio.url)" type="audio/mp3" />
          </audio>
    </div>

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

export default {
  components: {
    Tags,
    BackButton,
    MarkDown
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
