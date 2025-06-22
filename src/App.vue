<template>
  <div class="app-container">
    <h1 class="title">OkinawaMusicStudio</h1>
    <p class="count">スタジオ数: {{ studioList.length }}</p>
    <ul class="studio-list">
      <li v-for="studio in studioList" :key="studio.id" class="studio-item">
        {{ studio.name }}
      </li>
    </ul>
    <SearchForm @submit-form="handleSearchSubmit" />
    <StudioList v-if="searched" :studios="filteredStudios" />
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'
import StudioList from './components/StudioList.vue'

export default {
  name: 'App',
  components: {
    SearchForm,
    StudioList,
  },
  data() {
    return {
      studioList: [], // スタジオのリスト（配列）
      filteredStudios: [], // 検索結果のスタジオリスト
      searched: false, // 検索を実行済みかどうか
    }
  },
  async mounted() {
    await this.loadStudios()
    // this.filteredStudios = this.studioList // 初期表示は全件
  },
  methods: {
    async loadStudios() {
      try {
        const response = await fetch('/studios.json')
        const data = await response.json()
        // this.studioList は data()で定義したstudioListを指す
        // ここのstudiosはjsonのstudiosプロパティ
        this.studioList = data.studios // スタジオのリストを保存
        console.log(this.studioList)
      } catch (error) {
        console.log('スタジオデータの読み込みに失敗しました:', error)
      }
    },
    // handleSearchSubmit(searchData) {
    //   // SearchFormから受け取った検索データを処理
    //   console.log('受け取った検索情報:', searchData)
    //   // ここで予約ロジックを実装（例: API送信、状態更新など）
    // },
    handleSearchSubmit({ people, startTime, endTime }) {
      // SearchFormから受け取った検索データを処理
      // console.log('受け取った検索情報:', people, startTime, endTime)
      this.filteredStudios = this.searchStudios(people, startTime, endTime)
      this.searched = true // 検索実行時にtrueに
    },
    searchStudios(people, startTime, endTime) {
      return this.studioList
        .map((studio) => {
          // 営業時間外の場合は除外
          if (
            startTime < studio.businessHours.open ||
            startTime > studio.businessHours.close ||
            endTime < studio.businessHours.open ||
            endTime > studio.businessHours.close
          ) {
            return null
          }
          // 人数がmaxMembersを超える場合は除外
          const availableRooms = studio.room.filter((room) => {
            return Number(people) <= room.maxMembers
          })
          if (availableRooms.length > 0) {
            return {
              ...studio,
              availableRooms: availableRooms,
            }
          }
          return null
        })
        .filter((studio) => studio !== null)
    },
  },
}
</script>

<style>
.app-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.count {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}

.studio-list {
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
}

.studio-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  color: #555;
}

.studio-item:last-child {
  border-bottom: none;
}
</style>
