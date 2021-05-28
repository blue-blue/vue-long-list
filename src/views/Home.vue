<template>
  <div class="news-wrapper">
    <!-- <item v-for="item in list" :newsItem="item" :key="item.id" /> -->
    <router-link to="/">
        <!-- 显示一条新闻 -->
        <div class="one-new" v-for="item in list" :key="item.id">
          <!-- 新闻左侧标题、评论、来源部分 -->
          <div class="new-left">
            <h3>{{ item.title }}</h3>
            <div>
              <p>
                <img src="../assets/icons/msg.png" alt="评" />
                <span>{{ item.reads }}</span>
                <span>{{ item.from }}</span>
              </p>
              <h4>{{ item.date }}</h4>
            </div>
          </div>
          <!-- 新闻右侧图片部分 -->
          <div class="new-right">
            <img :src="item.image" alt="PIC" />
          </div>
        </div>
      </router-link>
  </div>
</template>

<script>
import axios from 'axios'
// import Item from './Item'

export default {
  name: 'Home',
  components: {
    // Item
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
      axios.get(url).then((res) => {
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
  a {
    display: block;
    width: 100%;
    text-decoration: none;
  }
  .one-new {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 14px 10px 5px;
    .new-left {
      height: 80px;
      position: relative;
      h3 {
        padding: 0;
        margin: 0;
        font-size: 16px;
        text-align: justify;
        color: #555;
      }
      div {
        position: absolute;
        width: 100%;
        bottom: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        p {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
          img {
            height: 16px;
          }
          span {
            font-size: 12px;
            color: #555;
            margin-left: 3px;
            margin-right: 3px;
          }
        }
        h4 {
          font-size: 12px;
          color: #888;
        }
      }
    }
    .new-right {
      margin-left: 10px;
      img {
        height: 68px;
      }
    }
  }
}
</style>
