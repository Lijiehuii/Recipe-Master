<template>
  <div class="note" @scroll.passive="pageScroll($event)">
    <NoteTop
      :author="author"
      :noteData="noteData"
      :followUserData="followUserData"
      @set-user-follow="setUserFollow"
      @reset-userdata="resetUserData"
    />
    <div v-if="noteData">
      <NoteMian :noteData="noteData" />
    </div>
    <div class="loading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import NoteTop from "@/components/NoteTop.vue";
import NoteMian from "./NoteMian.vue";
export default {
  components: {
    NoteTop,
    NoteMian,
  },
  data() {
    return {
      noteId: "",
      noteData: "",
      author: "",
      userId: "",
      followUserData: {},
    };
  },
  created() {
    this.noteId = this.$route.query.id;
    this.getNoteData(this.noteId);
  },
  computed: {
    ...mapState(["followUsersData"]),
  },
  methods: {
    getNoteData(id) {
      this.noteData = {};
      this.$axios
        .get(`https://apis.netstart.cn/douguo/note/detail/${id}`)
        .then(({ data }) => {
          this.noteData = data.result.note;
          this.author = { ...data.result.note.author, follow: false };
          this.getUser(this.author.id);
        });
    },
    getUser(userid) {
      this.userId = "";
      this.followUserData = {};
      this.$axios
        .get(`https://apis.netstart.cn/douguo/user/info/${userid}`)
        .then(({ data }) => {
          this.followUserData = { ...data.result.user, follow: false };
          for (let i = 0; i < this.followUsersData.length; i++) {
            if (this.followUserData.user_id == this.followUsersData[i].id) {
              this.followUserData.follow = true;
            }
          }
        });
    },
    setUserFollow() {
      this.followUserData.follow = !this.followUserData.follow;
    },
    resetUserData() {
      this.author = "";
      this.noteData = "";
    },
  },
  watch: {
    $route(newVal) {
      if (newVal.name == "note" && newVal.query.id) {
        this.noteData = "";
        this.noteId = newVal.query.id;
        this.getNoteData(this.noteId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-bottom: 40px;
  z-index: 2;
  background-color: #fff;
  overflow: auto;

  .loading {
    margin-top: 10px;
  }
}
</style>