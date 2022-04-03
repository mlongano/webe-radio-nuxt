<template>
  <div v-if="!$colorMode.unknown || isColorModeTimedOut">
    <Header />
    <Nuxt />
  </div>
  <Loading v-else class="bg-white dark:bg-dark-blue">Loading...</Loading>
</template>

<script>
export default {
  name: "home",
  head: {
    bodyAttrs: {
      class: "body",
    },
  },
  data() {
    return {
      isColorModeTimedOut: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isColorModeTimedOut = true;
      if (this.$colorMode.value !== "dark") {
        this.$colorMode.preference = "light";
      } else {
        this.$colorMode.preference = "dark";
      }
    }, 1000);
  },
};
</script>
<style lang="postcss">
.hero-img-bg {
  @apply bg-gradient-to-br dark:from-purple-800 dark:to-purple-400 from-purple-400 to-purple-100;
}

.body {
  @apply bg-white dark:bg-dark-blue min-h-full font-sans text-gray-700 dark:text-gray-50 leading-normal;
}

.home-cover {
  background-image: url(~/assets/images/home.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
