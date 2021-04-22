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
        episodes: [
          {
            id:"",
            title:"",
            slug:"",
          }
        ]
    };
  },
  apollo: {
    data: {
      prefetch: true,
      episodes: episodesQuery,
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
      let episode = this.episodes[0];
      this.$forceUpdate();
      return this.$spreakerEmbed(episode.spreaker_id, episode.title, "e", "200px", this.$colorMode.preference)
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
