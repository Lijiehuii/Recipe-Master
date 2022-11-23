<template>
  <div class="expert" @click="goToUserInfo(expert.id)">
    <div class="expert-desc">
      <img v-lazy="expert.p" />
      <div class="desc">
        <div class="desc-top">
          <p class="expert-name">{{ expert.n }}</p>
          <p class="expert-level">LV.{{ expert.lvl }}</p>
        </div>
        <div class="desc-bottom">
          <p class="fans-count">
            {{ expert.followers_count_text }}<span class="dot">·</span>已发布{{
              " " + expert.recipes_count_text
            }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="follow-expert"
      @click.stop="followWith(expert.id)"
      :class="{ follow: expert.follow }"
    >
      <div v-if="!expert.follow">关注</div>
      <div :class="{ follow: expert.follow }" v-if="expert.follow">已关注</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
// import { getTime } from "@/utils";
import { Toast } from "vant";
export default {
  props: {
    expert: Object,
  },
  created() {},
  computed: {
    ...mapState(["expertsData", "followUsersData"]),
    ...mapGetters(["follow"]),
  },
  methods: {
    ...mapMutations([
      "followExpert",
      "getFollowExpertsData",
      "removeUnfollowExpertData",
    ]),
    followWith(expertId) {
      this.followExpert(expertId);
      if (!this.expert.follow) {
        Toast("已关注 " + this.expert.n);
        this.getFollowExpertsData(this.expert);
      } else if (this.expert.follow) {
        Toast("已取消关注 " + this.expert.n);
        this.removeUnfollowExpertData(this.expert);
      }
      console.log(this.expertsData, this.followUsersData);
    },

    goToUserInfo(id) {
      let route = this.$route.name;
      this.$router.push({
        path: `${route}/userinfo`,
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.expert {
  width: 100vw;
  padding: 10px 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;

  .expert-desc {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 999px;
      margin-right: 10px;
    }

    .desc {
      display: flex;
      height: 35px;
      padding: 2px;
      flex-direction: column;
      justify-content: space-between;

      .desc-top {
        display: flex;
        align-items: center;

        .expert-name {
          font-size: 14px;
          margin-right: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
        }

        .expert-level {
          font-size: 12px;
          font-style: italic;
          color: rgb(254, 198, 51);
        }
      }

      .desc-bottom {
        font-size: 13px;
        color: #999;

        .dot {
          font-weight: 900;
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
  }

  .follow-expert {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 20px;
    font-size: 12px;
    font-weight: bold;
    background-color: rgb(254, 198, 51);
    border-radius: 999px;
    transition: all 0.3s linear;

    &.follow {
      background-color: rgb(246, 246, 246);
    }
  }
}
</style>