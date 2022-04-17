<template>
  <div v-html="audioPlayer" class="larghezza-fissa px-6 pt-4 pb-2" />
</template>

<style>
.episode-list {
  position: relative;
  z-index: 1;
}
</style>
<script>
export default {
  props: ["episodes"],
  computed: {
    audioPlayer() {
      let episodes = "";
      if (this.episodes) {
        this.episodes.forEach((episode) => {
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
        return episodes;
      }
    },
  },
};
</script>
