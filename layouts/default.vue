<template>
  <div>
    <Header :key="componentKey" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "default",
  head: {
    bodyAttrs: {
      class:
        "bg-white dark:bg-dark-blue min-h-full font-sans text-gray-700 dark:text-gray-50 leading-normal",
    },
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
  mounted() {
    this.forceRerender();
  },
};
</script>