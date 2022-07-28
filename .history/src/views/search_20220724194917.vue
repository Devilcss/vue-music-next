<template>
  <div class="search">
   搜索
  </div>
</template>

<script>
  export default {
    name: 'search',
    components: {
      Confirm,
      Scroll,
      SearchList,
      SearchInput,
      Suggest
    },
    setup() {
      const query = ref('')
      const hotKeys = ref([])
      const selectedSinger = ref(null)
      const scrollRef = ref(null)
      const confirmRef = ref(null)

      const store = useStore()
      const searchHistory = computed(() => store.state.searchHistory)

      const router = useRouter()

      const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

      getHotKeys().then((result) => {
        hotKeys.value = result.hotKeys
      })

      watch(query, async (newQuery) => {
        if (!newQuery) {
          await nextTick()
          refreshScroll()
        }
      })

      function refreshScroll() {
        scrollRef.value.scroll.refresh()
      }

      function addQuery(s) {
        query.value = s
      }

      function selectSong(song) {
        saveSearch(query.value)
        store.dispatch('addSong', song)
      }

      function selectSinger(singer) {
        saveSearch(query.value)
        selectedSinger.value = singer
        cacheSinger(singer)

        router.push({
          path: `/search/${singer.mid}`
        })
      }

      function cacheSinger(singer) {
        storage.session.set(SINGER_KEY, singer)
      }

      function showConfirm() {
        confirmRef.value.show()
      }

      return {
        scrollRef,
        confirmRef,
        query,
        hotKeys,
        selectedSinger,
        searchHistory,
        addQuery,
        selectSong,
        selectSinger,
        showConfirm,
        // searchHistory
        deleteSearch,
        clearSearch
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .search-input-wrapper {
      margin: 20px;
    }
    .search-content {
      flex: 1;
      overflow: hidden;
      .hot-keys {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
      .search-history {
        position: relative;
        margin: 0 20px;
        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;
          .text {
            flex: 1;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
    .search-result {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
