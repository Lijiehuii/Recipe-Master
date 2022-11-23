<template>
  <component
    :is="comp"
    :CardList="CardList"
    @set-collection="setCollection"
    @set-love="setLove"
    @fliter-unlike="unlike"
    @fliter-unlike-note="unlikenote"
  />
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import RadioCard from "@/components/RadioCard.vue";
import AdvertisementCart from "@/components/AdvertisementCart.vue";

export default {
  components: {
    NoteCard,
    RadioCard,
    AdvertisementCart,
  },
  props: {
    CardList: Object,
    type: Number,
  },
  computed: {
    comp() {
      return this.type == 3
        ? "NoteCard"
        : this.type == 1
        ? "RadioCard"
        : "AdvertisementCart";
    },
  },
  methods: {
    setCollection(id) {
      this.$emit("set-collection", id);
    },
    setLove(id) {
      console.log("设置123");
      this.$emit("set-love", id);
    },
    unlike(id) {
      this.$emit("fliter-unlike", id);
    },
    unlikenote(id) {
      this.$emit("fliter-unlike-note", id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>