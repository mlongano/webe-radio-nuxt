<template>
  <header
    class="flex flex-row flex-wrap justify-between items-begins lg:items-left lg:space-x-4 py-6 px-3 relative"
  >
    <NuxtLink class="" to="/">
      <img class="mr-5" :src="logo()" alt="Logo" width="80px" height="50px" />
    </NuxtLink>

    <nav class="flex flex-row">
      <NuxtLink class="menu-item" to="/podcasts" title="Podcasts">
        <img
          class="mr-5"
          :src="podcasts()"
          alt="Podcasts"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
      </NuxtLink>
      <NuxtLink class="menu-item" to="/posts" title="Blog">
        <img
          class="mr-5"
          :src="news()"
          alt="Blog"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
      </NuxtLink>
      <NuxtLink class="menu-item" to="/aboutUs" title="Chi siamo">
        <img
          class="mr-5"
          :src="about()"
          alt="Logo"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
      </NuxtLink>
    </nav>
    <button @click="changeTheme" class="menu-item">
      <div v-html="themeIcon"></div>
    </button>
  </header>
</template>
<style lang="postcss" scoped>
.menu-item {
  @apply hover:text-gray-400 dark-hover:text-gray-600 hover:border-gray-500 lg:p-4 py-3 px-0 border-b-2 border-transparent lg:mb-0 mb-2;
}
</style>
<script>

export default {
  data() {
    return {
      title: "WeBe RADIO",
      isMenuOpen: false,
      iconMenuSize: "32px",
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
          content: "La scuola che si ascolta",
        },
      ],
    };
  },
  computed: {
    themeIcon() {
      return this.$colorMode.value === "light"
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`;
    },
    themColor() {
      return this.$colorMode.value;
    },
  },
  methods: {
    logo() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/logoWhite.png")
        : require("~/assets/images/logoBlack.png");
    },
    about() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/punto-di-domanda-bianco.png")
        : require("~/assets/images/punto-di-domanda-nero.png");
    },
    podcasts() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/microfono-pieno-bianco.png")
        : require("~/assets/images/microfono-pieno-nero.png");
    },
    news() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/news-bianco.png")
        : require("~/assets/images/news-nero.png");
    },
    changeTheme() {
      this.$colorMode.preference = this.$colorMode.value === "light" ? "dark" : "light";
    },
  },
};
</script>
