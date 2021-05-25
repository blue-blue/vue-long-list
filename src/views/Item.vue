<template>
  <div class="item">
    <img v-lazy="newsItem.image" :key="newsItem.id" alt="">
    <p>{{ newsItem.title }}</p>
  </div>
</template>
<script>
export default {
  name: 'Item',
  props: {
    newsItem: {
      type: Object,
      required: true
    }
  }
}
</script>
