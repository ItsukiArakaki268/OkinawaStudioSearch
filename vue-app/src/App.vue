<template>
  <div id="app">
    <h1>OkinawaMusicStudio</h1>
    <div>Studios: {{ studios.length }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      studios: [],
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
        // this.studios は data()で定義したstudiosを指す
        this.studios = data.studios
        console.log(this.studios)
      } catch (error) {
        console.log('スタジオデータの読み込みに失敗しました:', error)
      }
    },
  },
}
</script>

<style></style>
