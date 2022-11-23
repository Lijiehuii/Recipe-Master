<template>
  <p class="title">
    {{ title }} <span class="count">{{ count }}</span>
  </p>
</template>

<script>
export default {
  props: {
    title: String,
    count: [Number, String],
  },
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  display: flex;
  height: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .count {
    margin: 2px 0;
    font-size: 12px;
  }

  &.active {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s linear;

    &::after {
      display: block;
      margin-top: 5px;
      width: 20px;
      height: 3px;
      border-radius: 999px;
      background-color: rgb(252, 201, 48);
      content: "";
    }

    &.expert {
      &::after {
        width: 40px;
      }
    }
  }
}
</style>