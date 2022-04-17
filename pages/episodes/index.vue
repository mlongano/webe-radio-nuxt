<template>
    <div>
        <main class="mt-16 larghezza-fissa">
            <img v-if="isDarkTheme" class="mx-auto" src="~/assets/images/lente-dark.png" alt="microfono"
                width="80px" height="80px" />
            <img v-else class="mx-auto" src="~/assets/images/lente-light.png" alt="microfono" width="80px"
                height="80px" />

            <!-- // Search input to filters podcasts -->
            <form class="flex justify-center items-center px-4 md:px-6 lg:px-8 mt-12">
                <div class="relative">
                    <input
                        ref="searchbar"
                        class="h-14 w-72 lg:w-96 pr-8 pl-5 rounded-full z-0 dark:text-gray-700 shadow dark:shadow-inner focus:outline-none"
                        v-model="searchQuery" type="search" placeholder="Cerca..." />
                    <div class="absolute top-4 right-3">
                        <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                    </div>
                </div>
            </form>

            <section class="flex flex-col flex-wrap md:flex-row gap-3 mt-6 px-6">
                <EpisodeCard v-for="result in results" :key="result.item.id" :episode="result.item" />
            </section>
            <!-- // If no podcast have been found -->
            <div class="" v-if="results.length === 0">
                <img src="~/assets/images/undraw_page_not_found_su7k.png" height="453" width="800" />
                <p>No episodes found</p>
            </div>
        </main>
    </div>
</template>

<style lang="postcss" scoped>
.badge {
    @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;

    &:hover {
        @apply bg-gray-300;
    }
}
</style>
<script>
// Import the restaurants query
import episodesQuery from "~/apollo/queries/episode/lastEpisodes";
import EpisodeCard from "~/components/EpisodeCard.vue";
import HeroHeader from "~/components/HeroHeader.vue";
import Fuse from 'fuse.js';

export default {
    components: {
        EpisodeCard,
        HeroHeader
    },

    data () {
        return {
            // Initialize an empty restaurants variabkle
            episodes: [],
            searchQuery: "",
            threshold: 0.3,
        };
    },
    apollo: {
        episodes: {
            prefetch: true,
            query: episodesQuery,
            variables () {
                return { limit: -1 };
            },
        },
    },
    computed: {
        // Search system
        filteredList () {
            return this.episodes.filter( ( episode ) => {
                return JSON.stringify( episode ).toLowerCase().includes( this.searchQuery.toLowerCase() );
            } );
        },
        fuse () {
            console.log(`recalcing fuse with ${this.threshold} threshold`);
            return new Fuse( this.episodes, {
                keys: [ "title", "description", "date", "tags.name", "podcast.title", "podcast.description", "podcast.tags.name", "schools.name"],
                threshold: this.threshold,
                shouldSort: false,
                //includeScore: true,
                //includeMatches: true,
                ignoreLocation: true,
                ignoreFieldNorm: true,
                minMatchCharLength: 1,
                useExtendedSearch: true,
            } );
        },
        results () {
            console.log("I'M HERE");
            if (this.searchQuery.length < 1) {
                this.threshold = 1;
                return this.fuse.search( "-" );
            }
            this.threshold = 0.3;
            return this.fuse.search( `'${this.searchQuery}` );
        },

        school () {
            return (
                this.podcasts[ 0 ]?.school?.name || this.schoolsName[ this.$route.params.slug ] || ""
            );
        },
        schoolBackground () {
            return this.schoolsBackground[ this.$route.params.slug ] || "";
        },
        isDarkTheme() {
            return this.$colorMode.value === "dark";
        },
        borderColor() {
            if (this.$colorMode.value === "dark") {
                return "borderDark";
            }
            return "borderLight";
        },

    },
    methods: {
        fuseSearch ( query ) {
            return this.fuse.search( query );
        },
        audioPlayer(episode) {
        if (episode?.audio?.url) {
            let audio = `<vue-plyr style="flex:2;" options='{"title":"pippo"}'>
                        <audio controls crossorigin playsinline class="w-full rounded-xl">
                            <source
                                src="${this.$getStrapiImage(episode.audio.url)}"
                                type="audio/mp3"
                            />
                        </audio>
                        </vue-plyr>`;
            let title = `<h2><a href="/episodes/${episode.slug}">${episode.title}</a></h2>`;
            let img = `<img class="rounded-xl" src="${this.$getStrapiImage(
            episode.cover.url
            )}" width="200">`;
            return `<div class="flex flex-row w-full gap-2 justify-items-center items-center">
                    ${img} <div class="flex flex-col" style="flex:2;"> ${
            title + audio
            } </div>
                    </div>`;
        }
        return "";
        },

        spreakerEmbed(episode) {
        if (episode.spreaker_id) {
            let iframe = this.$spreakerIframe(
            episode.spreaker_id,
            "episode",
            "200px",
            this.$colorMode.value,
            episode.spreaker_limited
            );
            return iframe;
        } else if (episode.audio?.url) {
            return this.audioPlayer(episode);
        }
        return "";
        },

        getEpisodes(school) {
        this.episodesFiltred = this.episodes.filter((episode) => {
            return episode.school.slug === school;
        });
        },
    },
    mounted() {
        this.$nextTick(() => this.$refs.searchbar.focus());
    }

};
</script>
