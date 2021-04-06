<template>
  <client-only>

    <header
      class="flex flex-wrap flex-row justify-between items-begins md:items-left md:space-x-4 py-6 px-6 relative"
    >
      <NuxtLink class="" to="/" >
        <img
          class="mr-5"
          src="~/assets/images/logo.png"
          alt="Logo"
          width="50px"
          style="height: 50px"
        />
      </NuxtLink>
      <nav
        class="flex absolute md:relative top-16 left-0 md:top-0 z-20 md:flex flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-white shadow-md rounded-lg md:bg-opacity-75 p-6 md:pt-0 md:p-0 text-gray-500"
      >
        <NuxtLink
          class="menu-item"
          to="/podcasts"
          >Podcasts</NuxtLink
        >
        <NuxtLink
          class="menu-item"
          to="/posts"
          >Blog</NuxtLink
        >
        <NuxtLink
          class="menu-item"
          to="/aboutUs"
          >Chi siamo</NuxtLink
        >
      </nav>
    </header>
  </client-only>
</template>

<script>
import podcastsQuery from "~/apollo/queries/podcast/podcasts";
export default {
  data() {
    return {
      title: "Hello World!"
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description"
        }
      ]
    };
  }
};
</script>
<style lang="postcss" scoped>
.menu-item {
  @apply md:px-2 md:m-auto block hover:underline;
}
</style>
