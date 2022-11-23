<template>
  <div class="food-list">
    <p class="title1">食材清单</p>
    <div class="food" v-for="(m, i) in major" :key="i">
      <p class="title">{{ m.title }}</p>
      <p class="note">{{ m.note }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipeData: Object,
    recipeId: String,
  },
  data() {
    return {
      major: "",
    };
  },
  created() {
    this.major = this.recipeData?.major;
  },
};
</script>

<style lang="scss" scoped>
.food-list {
  padding: 0 20px;
}
</style>

<style lang="scss" scoped>
.food-list {
  .title1 {
    margin-bottom: 10px;
  }
  .food {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: rgb(87, 145, 148);
      padding: 5px 0;
      align-items: center;
    }
  }
}
</style>
