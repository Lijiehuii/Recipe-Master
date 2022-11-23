<template>
  <div class="steps">
    <p class="title">烹饪步骤</p>
    <div class="step" v-for="(s, i) in cookstep" :key="i">
      <p class="step-title" v-if="i + 1 < cookstep?.length">
        步骤{{ i + 1 + stepCount }}
      </p>
      <p class="step-title" v-if="i + 1 == cookstep?.length">最后一步</p>
      <img :src="s.image" />
      <p class="tip">{{ s.content }}</p>
    </div>
    <p class="create-time">
      发布于{{ recipeData?.create_time?.split(" ")[0] }}
    </p>
    <p class="tips" v-if="recipeData?.tips">
      <span>小贴士</span> <span class="tips-text">{{ recipeData?.tips }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    recipeData: Object,
  },
  data() {
    return {
      cookstep: [],
    };
  },
  computed: {
    stepCount() {
      return "/" + this.cookstep?.length;
    },
  },
  created() {
    this.cookstep = this.recipeData?.cookstep;
  },
};
</script>

<style lang="scss" scoped>
.steps {
  padding: 0 20px;

  .title {
    font-size: 14px;
    margin: 20px 0 10px 0;
  }

  .step {
    display: flex;
    flex-direction: column;

    .step-title {
      font-size: 12px;
    }

    img {
      display: block;
      border-radius: 10px;
      margin: 5px 0;
    }

    .tip {
      margin: 10px 0;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .create-time {
    margin-top: -10px;
    font-size: 13px;
    color: #999;
  }

  .tips {
    margin: 10px 0;
    display: flex;
    flex-direction: column;

    .tips-text {
      margin: 10px 0;
      line-height: 20px;
    }
  }
}
</style>