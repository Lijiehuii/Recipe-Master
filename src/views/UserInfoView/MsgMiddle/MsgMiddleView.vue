<template>
  <div class="msg-middle">
    <MsgComponent />
    <DataComponent />
    <CookWares />
  </div>
</template>

<script>
import MsgComponent from "./MsgComponent.vue";
import DataComponent from "./DataComponent.vue";
import CookWares from "./CookWares.vue";
export default {
  components: { MsgComponent, DataComponent, CookWares },
};
</script>

<style lang="scss" scoped>
.msg-middle {
  padding: 10px 20px;
}
</style>


