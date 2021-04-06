<template>
  <img class="webe-logo" :width="width" src="~/assets/images/logo.svg" />
</template>

<script>
export default {
props: {
    width: {
      type: Number,
      required: true,
    }
  }
}
</script>

<style>
.webe-logo {
  animation: 2s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
