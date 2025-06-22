<template>
  <div>
    <h2>検索結果</h2>
    <ul v-if="studios.length">
      <li v-for="studio in studios" :key="studio.id">
        <div>
          <strong>{{ studio.name }}</strong>
          <ul>
            <li v-for="room in studio.availableRooms" :key="room.name">
              部屋名: {{ room.name }} / 最大人数: {{ room.maxMembers }}
            </li>
          </ul>
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
