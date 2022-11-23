<template>
  <div class="note-wrap">
    <NoteListItem
      v-for="(n, i) in notesDataList"
      v-show="n.type == 1"
      :key="i"
      :note="n"
      @set-love-note="love"
    />
  </div>
</template>
<script>
import NoteListItem from "@/components/NoteListItem.vue";
export default {
  props: {
    notesDataList: Array,
  },
  components: {
    NoteListItem,
  },
  methods: {
    love(id) {
      this.$emit("set-love-note", id);
      console.log("这是主体的打印", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.note-wrap {
  width: 100vw;
  padding: 5px 15px;
  column-count: 2;
  background-color: #f1f1f1;
}
</style>