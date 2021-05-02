<template>
  <header
    class="flex flex-row flex-wrap justify-between items-begins lg:items-left lg:space-x-4 py-6 px-6 relative"
  >
    <NuxtLink class="" to="/">
      <img
        class="mr-5"
        src="~/assets/images/logo.png"
        alt="Logo"
        width="50px"
        style="height: 50px"
      />
    </NuxtLink>

    <!-- Hamburger -->
    <label
      for="menu-toggle"
      class="pointer-cursor lg:hidden block"
      v-html="hamburgerIcon"
    >
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden min-w-full lg:min-w-0 lg:block" id="menu">
      <nav
        class="p-6 z-20 font-semibold text-gray-500 dark:text-white bg-white dark:bg-gray-700 shadow-md rounded-lg flex flex-col items-start lg:flex-row lg:items-center lg:w-auto lg:space-x-6 lg:bg-opacity-75 lg:pt-0 lg:p-0 lg:top-0"
      >
        <NuxtLink class="menu-item" to="/podcasts">Podcasts</NuxtLink>
        <NuxtLink class="menu-item" to="/posts">Blog</NuxtLink>
        <NuxtLink class="menu-item" to="/aboutUs">Chi siamo</NuxtLink>
        <button @click="changeTheme" class="menu-item">
          <div v-html="themeIcon"></div>
        </button>
      </nav>
    </div>
  </header>
</template>
<style lang="postcss" scoped>
#menu-toggle:checked + #menu {
  display: block;
}
.menu-item {
  @apply hover:text-gray-400 dark-hover:text-gray-600 hover:border-gray-500 lg:p-4 py-3 px-0 border-b-2 border-transparent lg:mb-0 mb-2;
}
.menu-item:hover {
  text-decoration: none !important;
}
</style>
<script>
export default {
  data() {
    return {
      title: "WeBe RADIO",
      isMenuOpen: false,
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
      return this.$colorMode.preference === "light"
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>`;
    },
    hamburgerIcon() {
      return this.$colorMode.preference === "light"
        ? `<svg
          class="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>`
        : `<svg
          class="fill-current text-gray-50"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>`;
    },
  },
  methods: {
    changeTheme() {
      this.$colorMode.preference =
        this.$colorMode.value == "light" ? "dark" : "light";
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
<style lang="postcss" scoped>
.menu-item {
  @apply md:px-2 md:m-auto block hover:underline;
}
</style>
