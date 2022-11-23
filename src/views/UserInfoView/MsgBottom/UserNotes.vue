<template>
  <div class="note" v-show="notesData">
    <p class="sign-in" v-if="notesData.straight_days">
      已连续打卡<span class="day">{{ notesData.straight_days }}</span>
    </p>
    <div class="note-item" v-for="(n, i) in notesData.notes" :key="i">
      <div class="note-day" v-if="n.day_text == '今天'">
        <p class="today">{{ n.day_text }}</p>
      </div>
      <div class="note-day" v-if="n.day_text != '今天'">
        <p class="month">{{ n.month_text }}</p>
        <p class="day">{{ n.day_text }}</p>
      </div>
      <div class="img-con">
        <img
          :src="i.image_u"
          v-for="i in n.day_list"
          :key="i.id"
          @click="goToNoteDetil(i.id)"
        />
      </div>
    </div>
    <div class="empty" key="empty">
      <van-empty
        v-if="notesData.notes?.length == 0"
        class="custom-image"
        image="/images/empty.jpg"
        description="该用户还没发布任何笔记~"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      notesData: [],
    };
  },
  created() {
    this.getUserNotes();
  },
  methods: {
    getUserNotes() {
      this.$axios
        .get(
          `https://apis.netstart.cn/douguo/user/usernotescalendar/${this.userId}/0/20`
        )
        .then(({ data }) => {
          this.notesData = data.result;
          console.log("notesData=>", this.notesData);
        });
    },
    goToNoteDetil(id) {
      console.log(id);
      this.$router.push({
        path: "/home/note",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.note {
  padding: 10px 20px;
  .sign-in {
    padding: 10px 0;
  }
  .note-item {
    display: flex;

    .note-day {
      width: 40px;
      display: flex;
      flex-direction: column;
      font-size: 14px;

      .today {
        font-weight: 600;
        font-size: 16px;
        display: flex;
        justify-content: center;
      }

      .month {
        display: flex;
        justify-content: center;
      }

      .day {
        font-weight: 600;
        font-size: 18px;
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
    }

    .img-con {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      img {
        display: block;
        width: calc(100% / 3.1);
        margin-right: 2px;
        margin-bottom: 2px;
        border-radius: 5px;
      }
    }
  }
}
</style>