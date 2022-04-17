<template>
<div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="`background-image: url(${$getStrapiImage(episode.cover.url)})`" title="episode.title">
    </div>
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r lg:w-48 p-4 flex flex-col justify-between leading-normal shadow-lg">
        <div class="mb-8">
            <div class="text-gray-900 font-bold text-xl mb-2">{{episode.title}}</div>
                <p class="text-gray-700 text-base font-bold">Tags:
                    <ul class="border rounded-md w-fit p-1 shadow-lg">
                        <li v-for="tag in episode.tags" :key="tag.id" class="even:bg-gray-200">
                            <NuxtLink :to='"/tags/"+tag.name'>{{ tag.name }}</NuxtLink>
                        </li>
                    </ul>
                </p>
        </div>
        <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" :src="$getStrapiImage(episode.cover.url)" :alt="episode.title">
            <div class="text-sm">
                <p class="text-gray-900 leading-none">{{episode.schools[0].short_name}}</p>
                <p class="text-gray-600">{{episode.date}}</p>
            </div>
        </div>
    </div>
    <NuxtLink
        class="link w-1/2 flex items-center justify-center rounded-md bg-black text-white"
        :to="'/episodes/'+episode.slug"
        >Link</NuxtLink>

</div>
</template>
<style scoped>
.link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
}

.podcast-tag {
    position: relative;
    z-index: 1;
}

</style>

<script>
import Tags from "~/components/Tags";

export default {
    components: {
        Tags,
    },
    props: ["episode"],
    computed: {
        // Search system
        description() {
            return this.episode.description || "";
        },
        google() {
            return this.episode.distribution?.google?.url || "";
        }
    },

};
</script>

