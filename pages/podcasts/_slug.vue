<template>
  <div class="px-6">
    <BackButton />
    <main>
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
      <markdown-it-vue
        class="text-gray-700 text-3xl p-2 mt-0.5"
        :content="description"
      />

      <div>
        <EpisodesList :podcast="podcasts[0]" />
      </div>
      <div class="">
        <Tags :post="podcasts[0]" />
      </div>

      <div v-html="spreakerEmbed" />
    </main>
  </div>
</template>

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
      let episodes = "";
      if (podcast.episodes) {
        podcast.episodes.forEach((episode) => {
          if (episode.audio?.url) {
            episodes += `<li><vue-plyr options='{"title":"pippo"}'>
                      <audio controls crossorigin playsinline class="w-full rounded-xl">
                        <source
                            src="${this.$getStrapiImage(episode.audio.url)}"
                            type="audio/mp3"
                        />
                      </audio>
                    </vue-plyr>
                    <h2>${episode.title}</h2>
                    </li>`;
          }
        });
        if (episodes) {
          episodes = `<ul>${episodes}</ul>`;
        }
      }
      return episodes;
    },
    description() {
      return this.podcasts[0].description || "";
    },
  },
};
</script>
