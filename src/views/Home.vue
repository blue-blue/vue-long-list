<template>
  <div class="news-wrapper">
      <item v-for="item in list" :newsItem="item" :key="item.id" />
  </div>
</template>

<script>
import axios from 'axios'
import Item from './Item'

export default {
  name: 'Home',
  components: {
    Item
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getList(10)
  },
  methods: {
    getList (num) {
      const url = `/newslist?pageNo=${num}`
      axios.get(url).then(res => {
        if (res.status === 200) {
          this.list = res.data.data.result
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .news-wrapper {
    width: 100%;
    max-width: 800px;
    height: 100%;
  }
</style>
