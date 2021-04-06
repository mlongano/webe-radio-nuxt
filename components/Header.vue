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
        <button @click="changeMode" class="menu-item">
        <div v-html="btnIcon"></div>
      </button>

      </nav>
    </header>
  </client-only>
</template>

<script>
import podcastsQuery from "~/apollo/queries/podcast/podcasts";

export default {
  data() {
    return {
      title: "WeBe RADIO"
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "webe.radio",
          name: "Webe Radio",
          content: "La scuola che si ascolta"
        }
      ]
    };
  },
  computed: {
    btnIcon() {
      return this.$colorMode.preference === 'light' ?
      `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>` :
      `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`
    }
  },
  methods: {
    changeMode() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    }
  },
};
</script>
<style lang="postcss" scoped>
.menu-item {
  @apply md:px-2 md:m-auto block hover:underline;
}
</style>
