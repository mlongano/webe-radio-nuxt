<template>
    <div class="w-max flex flex-row justify-items-center items-center shadow-lg" >
        <img
          class="w-24 shadow-lg rounded-lg pr-2"
          alt="Cover image"
          v-if="episode.cover.data"
          :src="$getStrapiImage(episode.cover.data.attributes.url)"
        />
        <div class="flex flex-col justify-between items-center h-full gap-4 mr-2">
          <p>{{episode.title}}</p>
          <audio controls crossorigin playsinline class="audio w-full shadow-lg rounded-xl mr-2 dark:bg-white">
            <source v-if="episode.audio.data" :src="$getStrapiImage(episode.audio.data.attributes.url)" type="audio/mp3" />
          </audio>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.episode-list {
  position: relative;
  z-index: 1;
}

  .audio {
    background-color: #202f4d;
  }
</style>
<script>
export default {
  props: ["episode"],
  computed: {
  },
};
</script>
