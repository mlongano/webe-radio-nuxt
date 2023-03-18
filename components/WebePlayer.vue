<template>
  <div class="shadow-2xl rounded-lg w-max m-auto p-4">
    <audio class="rounded-full" preload="metadata" :src="songSrc" ref="audioPlayer" />
    <client-only>
      <div ref="audioControls" class="flex flex-col justify-between items-center">
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
          class="p-4 mb-8 shadow-2xl rounded-lg max-w-xs"
          :src="coverArtDiscogs"
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
        titolo: "",
        artista: "",
        anno: "",
        album: "",
      },
      coverArtDiscogs: "",
      ascoltatori: 0,
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
    defaultCover() {
      return this.$logoSrc(this.$colorMode.value);
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
      return this.ascoltatori;
    },
    songSrc() {
      return `${process.env.AUDIO_URL}/live`;
    },
    themeMode() {
      return this.$colorMode.value === "dark" ? "dark" : "light";
    },
  },
  asyncComputed: {
    coverArt: {
      async get() {
        const query = `${process.env.MUSICBRAINZ_URL}/recording?fmt=json&query=recording:%22${this.title}%22%20AND%20release:%22${this.albumName}%22%20AND%20artist:%22${this.artistName}%22`;
        let response = await fetch(query);
        if (!response.ok) {
          return this.defaultCover;
        }
        let json = await response.json();
        const recordings = json.recordings.filter((recording) => {
          const releases = recording.releases?.filter((release) => {
            //console.log(release["release-group"]["primary-type"]);
            return (
              this.albumName.toLowerCase().includes(release.title.toLowerCase()) &&
              release["release-group"]["primary-type"] === "Album" // ||
              //release["release-group"]["primary-type"] === "EP" ||
              //release["release-group"]["primary-type"] === "Single"
            );
          });
          return releases?.length > 0;
        });
        if (recordings.length > 0) {
          console.log("FOUND");
          //console.log(recordings[0].releases[0].id);
          let urls = recordings
            .map((recording) => recording.releases)
            .flat()
            .map((release) => `${process.env.COVERART_URL}/release/${release.id}/front`);
          //console.log(urls.slice(0, 3));
          let response = null;
          do {
            const url = urls.pop();
            response = await fetch(url);
          } while (!response.ok && urls.length > 0);
          if (response.ok) {
            return response.url;
          } else {
            return this.defaultCover;
          }
        }
        return this.defaultCover;
      },
      default() {
        return this.defaultCover;
      },

      watch: ["songMetadata"],
    },
    coverArtDiscogs: {
      async get() {
        const query = `${process.env.DISCOGS_API_URL}/search?q=${this.artistName}%20-%20${this.title}%20-%20${this.albumName}&type=release&per_page=1`;
        let response = await fetch(query, {
          headers: {
            Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`,
          },
        });
        if (!response.ok) {
          return this.defaultCover;
        }
        let json = await response.json();
        if (json.results.length > 0) {
          return json.results[0].cover_image;
        }
        return this.defaultCover;
      },
      default() {
        return this.defaultCover;
      },

      watch: ["songMetadata"],
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
      //console.log(this.volume);
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
        //console.log("Old time:" + this.$refs.audioPlayer.currentTime);
        this.$refs.audioPlayer.currentTime =
          this.$refs.audioPlayer.currentTime + (Date.now() - this.start) / 1000;
        this.$refs.audioPlayer.play();
        //console.log("NEW time:" + this.$refs.audioPlayer.currentTime);
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

    isMetadataEquals(a, b) {
      return a.titolo === b.titolo && a.album === b.album && a.artista === b.artista;
    },

    async fetchSongMetadata() {
      //const response = await fetch("http://10.0.3.11:8000/status-json.xsl");
      const response = await fetch(`${process.env.AUDIO_URL}/status-json.xsl`);
      const data = await response.json();
      const metadataList = data?.icestats?.source?.title?.split(" - ");
      const metadataProps = ["titolo", "artista", "anno", "album"];

      const metadata = this.$_.zipObject(metadataProps, metadataList);
      //console.log(metadata);
      if (!this.isMetadataEquals(this.songMetadata, metadata)) {
        this.songMetadata = metadata;
      }
      const listeners = data?.icestats?.source?.listeners;
      this.ascoltatori =
        listeners > 0 ? listeners : data?.icestats?.source?.listener_peak;
    },
  },
  mounted() {
    this.$refs.audioPlayer.volume = this.volume / 100;
    this.$refs.audioPlayer.addEventListener(
      "message",
      (event) => {
        console.log("Received message: " + event.data);
      },
      false
    );
    this.songMetadata = { ...this.songMetadata };
  },
  async created() {
    await this.fetchSongMetadata();

    this.metaDataPolling = setInterval(async () => this.fetchSongMetadata(), 10000);
  },
  beforeUnmount() {
    clearInterval(this.metaDataPolling);
  },
};
</script>
