<template>
  <div class="main-left">
    <div
      class="type"
      :class="{ select: selectType == c.id }"
      v-for="c in classData"
      :key="c.id"
      @click="$emit('set-select-type', c.id)"
    >
      {{ c.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classData: Array,
    selectType: String,
  },
  created() {
    console.log(this.selectType);
  },
};
</script>

<style lang="scss" scoped>
.main-left {
  width: 100px;
  height: calc(100vh - 104px);
  overflow: auto;
  //   &::-webkit-scrollbar {
  //     background-color: transparent;
  //   }

  .type {
    position: relative;
    display: flex;
    font-size: 14px;
    width: 90px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: rgb(250, 250, 250);

    &.select {
      background-color: #fff;

      &::after {
        position: absolute;
        right: 5px;
        width: 3px;
        height: 20px;
        border-radius: 999;
        background-color: #fc0;
        content: "";
      }
    }
  }
}
</style>