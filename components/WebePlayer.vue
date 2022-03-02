<template>
  <div class="shadow-2xl rounded-lg w-max m-auto p-4">
    <audio class="rounded-full" preload="metadata" :src="songSrc" ref="audioPlayer" />
    <client-only>
      <div class="flex flex-col justify-between items-center">
        <div class="flex flex-col justify-between items-center">
          <div class="dark:text-yellow-300 text-yellow-700 font-bold text-2xl">
            <MdiSvg>{{ mdiRadioTower }}</MdiSvg> WeBe Radio
            <MdiSvg>{{ mdiRadioTower }}</MdiSvg>
          </div>
          <p class="dark:text-yellow-300 text-yellow-700 font-bold text-xl">
            Ascoltatori: {{ listeners }}
          </p>
        </div>
        <div class="grid grid-cols-1 mt-1">
          <div class="p-4">
            <button
              class="dark:text-yellow-300 text-yellow-700 font-bold"
              v-on:click="togglePlay"
            >
              <MdiSvg :size="96">{{ playSvg }}</MdiSvg>
            </button>
          </div>
        </div>

        <img
          class="p-4 mb-8 shadow-2xl rounded-lg"
          :src="require(`~/assets/images/logo-${themeMode}.png`)"
          alt="Cover"
        />
        <div class="text-center">
          <p class="dark:text-yellow-300 text-yellow-700 font-bold">{{ title }}</p>
          <p class="dark:text-gray-200 text-gray-500">
            {{ artistName }} - {{ albumName }}
          </p>
          <p class="dark:text-gray-400 text-gray-700">{{ year }}</p>
        </div>
        <div class="flex flex-row justify-between gap-3">
          <output class id="volume-output">{{ volume }}</output>
          <input
            type="range"
            @change="setVolume"
            max="100"
            :value="volume"
            ref="volumeSlider"
          />
          <button @click="volumeDown">
            <MdiSvg>{{ mdiVolumeMinus }}</MdiSvg>
          </button>
          <button @click="volumeToggleMute">
            <MdiSvg>{{ muteSvg }}</MdiSvg>
          </button>
          <button @click="volumeUp">
            <MdiSvg>{{ mdiVolumePlus }}</MdiSvg>
          </button>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
import {
  mdiPlayCircle,
  mdiStopCircle,
  mdiVolumeMinus,
  mdiVolumeMute,
  mdiVolumeOff,
  mdiVolumePlus,
  mdiRadioTower,
} from "@mdi/js";

export default {
  data() {
    return {
      isPlaying: false,
      once: true,
      start: 0,
      songMetadata: {
        artista: "",
        titolo: "",
        album: "",
        anno: "",
        ascoltatori: 0,
      },
      metaDataPolling: null,
      muted: false,
      volume: 90,
      mdiPlayCircle,
      mdiStopCircle,
      mdiVolumeMute,
      mdiVolumeOff,
      mdiVolumePlus,
      mdiVolumeMinus,
      mdiRadioTower,
    };
  },
  computed: {
    muteSvg() {
      return this.muted ? mdiVolumeMute : mdiVolumeOff;
    },
    playSvg() {
      return this.isPlaying ? mdiStopCircle : mdiPlayCircle;
    },
    coverSrc() {
      console.log(this.$coverSrc(this.$colorMode.value));
      return this.$coverSrc(this.$colorMode.value);
    },
    title() {
      return this.songMetadata.titolo;
    },
    artistName() {
      return this.songMetadata.artista;
    },
    albumName() {
      return this.songMetadata.album;
    },
    year() {
      return this.songMetadata.anno;
    },
    listeners() {
      return this.songMetadata.ascoltatori;
    },
    songSrc() {
      return "https://stream.webe.radio/live";
    },
    themeMode() {
      return this.$colorMode.value === "dark" ? "dark" : "light";
    },
  },
  methods: {
    volumeToggleMute() {
      this.muted = !this.muted;
      this.$refs.audioPlayer.muted = this.muted;
    },
    volumeDown() {
      this.volume = this.volume >= 10 ? this.volume - 10 : 0;
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    volumeUp() {
      this.volume = this.volume <= 90 ? this.volume + 10 : 100;
      this.$refs.audioPlayer.volume = this.volume / 100;
      console.log(this.volume);
    },
    setVolume() {
      this.volume = parseInt(this.$refs.volumeSlider.value);
      this.$refs.audioPlayer.volume = this.volume / 100;
    },
    togglePlay() {
      if (this.once) {
        this.once = false;
        this.start = Date.now();
      }
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause();
        this.start = Date.now();
      } else {
        console.log("Old time:" + this.$refs.audioPlayer.currentTime);
        this.$refs.audioPlayer.currentTime =
          this.$refs.audioPlayer.currentTime + (Date.now() - this.start) / 1000;
        this.$refs.audioPlayer.play();
        console.log("NEW time:" + this.$refs.audioPlayer.currentTime);
      }

      this.isPlaying = !this.isPlaying;
    },
    sanitifyDoubleQuotes(str) {
      // Sostituisce le virgolette doppie con le virgolette doppie "escaped" (\")
      // dipende dal fatto che la stringa sia la proprietà di un oggetto JSON e che rispetti il formato con gli spazi e le virgolette
      // (per esempio, '{\"artista\": \"Pharrell Williams\", \"titolo\": \"Happy (From \"despicable Me 2\")\", \"album\": \"G I R L\", \"anno\": \"2022\"}')
      return str
        ?.replace(/("(?=:)|"(?=,)|(?<=, )"|(?<=: )"|(?<={)"|"(?=}))/g, "§§")
        .replace(/"/g, '\\"')
        .replace(/§§/g, '"');
    },
    async fetchSongMetadata() {
      //const response = await fetch("http://10.0.3.11:8000/status-json.xsl");
      const response = await fetch("https://stream.webe.radio/status-json.xsl");
      const data = await response.json();
      const metadata = JSON.parse(
        this.sanitifyDoubleQuotes(data?.icestats?.source?.title)
      );
      metadata.ascoltatori = data?.icestats?.source?.listeners;
      return metadata;
    },
  },
  mounted() {
    this.$refs.audioPlayer.volume = this.volume / 100;
  },
  async created() {
    this.songMetadata = await this.fetchSongMetadata();
    this.metaDataPolling = setInterval(
      async () => (this.songMetadata = await this.fetchSongMetadata()),
      10000
    );
  },
  beforeUnmount() {
    clearInterval(this.metaDataPolling);
  },
};
</script>
