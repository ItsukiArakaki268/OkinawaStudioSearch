<template>
  <div class="search-form">
    <div class="form-group">
      <label for="people">人数</label>
      <select id="people" v-model="people" class="select">
        <option value="">人数を選択してください</option>
        <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="start-time">開始時刻</label>
      <select id="start-time" v-model="startTime" class="select">
        <option value="">時間を選択してください</option>
        <option v-for="n in 24" :key="n - 1" :value="n - 1">{{ n - 1 }}:00</option>
      </select>
    </div>

    <div class="form-group">
      <label for="end-time">終了時刻</label>
      <select id="end-time" v-model="endTime" class="select">
        <option value="">時間を選択してください</option>
        <option v-for="n in 24" :key="n - 1" :value="n - 1">{{ n - 1 }}:00</option>
      </select>
    </div>

    <button class="submit-btn" @click="handleSubmit">決定</button>
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

<style scoped>
.search-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-btn:hover {
  background: #0056b3;
}
</style>
