<template>
  <iframe width="100%" height="400" :src="`https://player.vimeo.com/video/${props.videoId}`" title="Video player"
    frameborder="0" allowfullscreen></iframe>
</template>

<script setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});
</script>