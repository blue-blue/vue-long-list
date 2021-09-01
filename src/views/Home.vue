<template>
  <div class="news-wrapper">
    <!-- <item v-for="item in list" :newsItem="item" :key="item.id" /> -->
    <div class="scroll-container" ref="scrollContainer" @scroll.passive="handleScroll">
      <!-- 根据待显示新闻列表数据，显示新闻列表 -->
      <div v-for="item in showDataList" :key="item.id">
        <router-link class="one-new" to="/">
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
        </router-link>
      </div>
    </div>
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
      // 全部数据
      allDataList: [],
      // 单条数据高度
      itemHeight: 100,
      // 列表最大容积
      containSize: 0,
      // 容器第一元素的索引
      startIndex: 0
    }
  },
  async created () {
    this.getList(10)
  },
  computed: {
    // 容器最后一个元素的索引
    endIndex () {
      let endIndex = this.startIndex + this.containSize
      if (!this.allDataList[endIndex]) {
        endIndex = this.allDataList.length - 1
      }
      return endIndex
    },
    // 待显示的数据
    showDataList () {
      return this.allDataList.slice(this.startIndex, this.endIndex)
    }
  },
  mounted () {
    console.log(this.$refs.scrollContainer.offsetHeight)
    this.containSize = ~~(this.$refs.scrollContainer.offsetHeight / this.itemHeight) + 2
    console.log(this.containSize)
    console.log('dev-2 test')

    console.lgo('dev-1 test')
  },
  methods: {
    // 获取列表数据
    getList (num) {
      const url = `/newslist?pageNo=${num}`
      axios.get(url).then((res) => {
        if (res.status === 200) {
          this.allDataList = res.data.data.result
        }
      })
    },
    // 定义滚动行为事件方法
    handleScroll () {
      console.log(this.$refs.scrollContainer.scrollTop)
    }
  }
}
</script>
<style lang="scss" scoped>
.news-wrapper {
  width: 100%;
  // max-width: 800px;
  height: 100%;
  a {
    // display: block;
    // width: 100%;
    text-decoration: none;
  }
  .scroll-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    // .warpper {
    //   height: 100%;
    // }
    .loading {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      height: 60px;
      color: #2d8cf0;
    }
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
