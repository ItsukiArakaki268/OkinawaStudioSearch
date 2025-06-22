<template>
  <div id="app">
    <h1>OkinawaMusicStudio</h1>
    <p>スタジオ数: {{ studioList.length }}</p>
    <ul>
      <li v-for="studio in studioList" :key="studio.id">
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

<style></style>
