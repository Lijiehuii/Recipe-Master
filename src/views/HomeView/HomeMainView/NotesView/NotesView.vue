<template>
  <div class="notes">
    <NotesTop :hotTopic="hotTopic" />
    <NotesMain :notesDataList="notesDataList" @set-love-note="love" />
  </div>
</template>

<script>
import NotesTop from "./NotesTop.vue";
import NotesMain from "./NotesMain.vue";
export default {
  data() {
    return {
      notesDataList: [],
      hotTopic: [],
    };
  },
  created() {
    this.getNotesData();
  },
  methods: {
    getNotesData() {
      this.$axios.get("/api-json/home/note/note-0-20.json").then(({ data }) => {
        this.hotTopic = data.result.topics;
        this.notesDataList = data.result.list.map((n) => {
          return {
            ...n,
            love: false,
          };
        });
      });
    },
    love(id) {
      console.log(this.notesDataList);

      console.log(123);
      this.notesDataList = this.notesDataList.map((n) => {
        // return console.log(n);
        if (id == n?.note?.id) {
          if (!n.love) {
            n.note.like_count++;
            return {
              ...n,
              love: !n.love,
            };
          } else if (n.love) {
            n.note.like_count--;
            return {
              ...n,
              love: !n.love,
            };
          }
        }
        return n;
      });
      console.log("这是view的id", id);
    },
  },
  components: {
    NotesTop,
    NotesMain,
  },
};
</script>

<style lang="scss" scoped>
.notes {
  position: absolute;
  top: 94px;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 100vw;
  height: calc(100vh - 144px);
  overflow: auto;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>