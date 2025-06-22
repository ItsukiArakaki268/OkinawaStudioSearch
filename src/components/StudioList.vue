<template>
  <div>
    <h2>
      検索結果 <span v-if="studios.length">{{ studios.length }}件</span>
    </h2>
    <ul v-if="studios.length">
      <li v-for="studio in studios" :key="studio.id">
        <div class="studio-card">
          <div class="studio-name">{{ studio.name }}</div>
          <div v-for="room in studio.availableRooms" :key="room.id" class="room-info">
            <div class="room-row"><strong>ルーム名:</strong> {{ room.name }}</div>
            <div class="room-row"><strong>料金:</strong> {{ room.price }}円</div>
            <div class="room-row"><strong>最大人数:</strong> {{ room.maxMembers }}人</div>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>該当するスタジオはありません。</p>
  </div>
</template>

<script>
export default {
  name: 'StudioList',
  props: {
    studios: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 24px;
}

.studio-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.studio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.studio-name {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
  font-weight: bold;
}

.room-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
}

.room-row {
  margin-bottom: 6px;
  color: #555;
  font-size: 0.98rem;
}
.room-row:last-child {
  margin-bottom: 0;
}
.room-row strong {
  color: #2c3e50;
  min-width: 80px;
  display: inline-block;
}

p {
  color: #888;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  text-align: center;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .studio-card {
    padding: 15px;
  }
  .room-info {
    padding: 10px;
  }
}
</style>
