
<template>
  <div class="card mt-2">
    <ApodItem
      @deleteApod="deleteApod"
      @updatedApod="updatedApod"
      @apodDetail="apodDetail"
      v-for="(apod) in apods"
      :key="apod._id"
      :apod="apod"
    ></ApodItem>
  </div>
</template>

<script>
import ApodItem from "@/components/ApodItem";

export default {
  name: "ApodList",
  props: ["apods"],
  components: {
    ApodItem
  },
  methods: {
    deleteApod(id) {
      this.$emit("deleteApod", id);
    },
    updatedApod(id) {
      this.$emit("updatedApod", id);
    },
    apodDetail(id) {
      this.$emit("apodDetail", id);
    }
  }
};
</script>

<style>
</style>
