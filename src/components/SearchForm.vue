<template>
  <div class="search-form input-container">
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

    <div class="form-group button-group">
      <button class="submit-btn" @click="handleSubmit">検索</button>
    </div>
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
.input-container {
  max-width: 1000px;
  margin: 0 auto 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4カラムに変更 */
  gap: 20px;
}

.button-group {
  justify-content: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
  min-width: 80px;
}

.submit-btn:hover {
  background: #2980b9;
}

/* レスポンシブ対応 */
@media (max-width: 900px) {
  .input-container {
    grid-template-columns: 1fr;
    padding: 15px;
  }
  .button-group {
    align-items: stretch;
  }
  .submit-btn {
    width: 100%;
  }
}
</style>
