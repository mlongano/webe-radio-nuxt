<template>
  <header
    class="flex flex-row flex-wrap justify-between items-begins lg:items-left lg:space-x-4 py-6 px-3 relative larghezza-fissa"
  >
    <NuxtLink class="" to="/">
      <img class="mr-1" :src="logo()" alt="Logo" width="80px" height="50px" />
    </NuxtLink>

    <nav class="flex flex-row justify-items-center">
      <NuxtLink class="menu-item" to="/podcasts" title="Podcasts">
        <img
          class="mx-2"
          :src="podcasts()"
          alt="Podcasts"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
        <p class="text-xs">Podcasts</p>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/posts" title="Blog">
        <img
          class="mx-2"
          :src="news()"
          alt="Blog"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
        <p class="text-xs">News</p>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/aboutUs" title="Chi siamo">
        <img
          class="mx-2"
          :src="about()"
          alt="Logo"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
        <p class="text-xs">Chi siamo</p>
      </NuxtLink>
      <NuxtLink class="menu-item" to="/episodes" title="Cerca">
        <img
          class="mx-2"
          :src="search()"
          alt="Logo"
          :width="iconMenuSize"
          :height="iconMenuSize"
        />
        <p class="text-xs">&nbsp;</p>
      </NuxtLink>
    </nav>
    <button @click="changeTheme" class="menu-item">
      <img
        class="mx-2"
        :src="themeIcon()"
        alt="Theme"
        :width="iconMenuSize"
        :height="iconMenuSize"
      />
      <p class="text-xs">&nbsp;</p>
    </button>
  </header>
</template>
<style lang="postcss" scoped>
.menu-item {
  @apply flex flex-col justify-center items-center;
  @apply hover:text-gray-400 dark-hover:text-gray-600 hover:border-gray-500 lg:p-4 py-3 px-0 border-b-2 border-transparent lg:mb-0 mb-2;
}
.menu-item:focus,
.menu-item:focus-visible {
  @apply outline-none;
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
    themeColor() {
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
    search() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/lente-dark.png")
        : require("~/assets/images/lente-light.png");
    },
    themeIcon() {
      return this.$colorMode.value === "dark"
        ? require("~/assets/images/theme-dark.png")
        : require("~/assets/images/theme-light.png");
    },
    changeTheme() {
      this.$colorMode.preference = this.$colorMode.value === "light" ? "dark" : "light";
    },
  },
};
</script>
