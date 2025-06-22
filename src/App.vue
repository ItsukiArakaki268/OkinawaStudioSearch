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
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue'

export default {
  name: 'App',
  components: {
    SearchForm,
  },
  data() {
    return {
      studioList: [], // ← スタジオのリスト（配列）
    }
  },
  async mounted() {
    await this.loadStudios()
  },
  methods: {
    async loadStudios() {
      try {
        const response = await fetch('/studios.json')
        const data = await response.json()
        // this.studioList は data()で定義したstudioListを指す
        // ここのstudiosはjsonのstudiosプロパティ
        this.studioList = data.studios // ← スタジオのリストを保存
        console.log(this.studioList)
      } catch (error) {
        console.log('スタジオデータの読み込みに失敗しました:', error)
      }
    },
    handleSearchSubmit(searchData) {
      // SearchFormから受け取った検索データを処理
      console.log('受け取った検索情報:', searchData)
      // ここで予約ロジックを実装（例: API送信、状態更新など）
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
