<template>
  <div class="input-container">
    <div>
      <label for="people">人数</label>
      <select id="people" v-model="people">
        <option value="">人数を選択してください</option>
        <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
    <div>
      <label for="start-time">開始時刻</label>
      <select id="start-time" v-model="startTime">
        <option value="">時間を選択してください</option>
        <option v-for="n in 24" :key="n - 1" :value="n - 1">{{ n - 1 }}:00</option>
      </select>

      <label for="end-time">終了時刻</label>
      <select id="end-time" v-model="endTime">
        <option value="">時間を選択してください</option>
        <option v-for="n in 24" :key="n - 1" :value="n - 1">{{ n - 1 }}:00</option>
      </select>
    </div>
  </div>
  <div>
    <button id="submit" @click="handleSubmit">決定</button>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  emits: ['submit-form'],
  data() {
    return {
      people: null,
      startTime: '',
      endTime: '',
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit-form', {
        people: this.people,
        startTime: this.startTime,
        endTime: this.endTime,
      })
    },
  },
}
</script>
