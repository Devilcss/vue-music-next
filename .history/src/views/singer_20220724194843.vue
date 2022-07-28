<template>
  <div class="singer">
    歌手
  </div>
</template>

<script>
 export default {
    name: 'singer',
    components: {
      IndexList
    },
    data() {
      return {
        singers: [],
        selectedSinger: null
      }
    },
    async created() {
      const result = await getSingerList()
      this.singers = result.singers
    },
    methods: {
      selectSinger(singer) {
        this.selectedSinger = singer
        this.cacheSinger(singer)
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
      },
      cacheSinger(singer) {
        storage.session.set(SINGER_KEY, singer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>
