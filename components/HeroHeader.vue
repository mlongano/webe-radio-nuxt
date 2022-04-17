<template>
  <div>
    <div class="relative larghezza-fissa">
      <div class="z-0 font-montserrat">
        <h1 class="font-bold text-5xl text-center">{{ h1 }}</h1>
        <h2 v-if="h2" class="font-normal text-4xl uppercase text-center">{{ h2 }}</h2>
      </div>
      <img class="z-10 mx-auto" :src="image(imgsrc)" alt />
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  props: ["h1", "h2", "imgsrc"],
  methods: {
    image(src) {
      return require(`@/assets/images/${src}`);
    },
  },
};
</script>
