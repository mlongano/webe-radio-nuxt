<template>
  <ClientOnly>
    <div class="px-6 pt-4 pb-2" v-if="tags && tags.data && tags.data.length > 0">
      <NuxtLink
        class="episode-list"
        v-for="tag in tags.data"
        :key="tag.id"
        :to="'/tags/'+tag.attributes.name"
      >
        <span
          class="hover:underline inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ tag.attributes.name }}</span
        >
      </NuxtLink>
  </div>
  </ClientOnly>
</template>

<style>
.podcast-tag {
  position: relative;
  z-index: 1;
}
</style>
<script>
export default {
  props: [ "post" ],
  computed: {
    tags () {
      //console.log(JSON.stringify(this.post.attributes.tags,null,2));
      return this.post.attributes.tags;
    }
  }
};
</script>

