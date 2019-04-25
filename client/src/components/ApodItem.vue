<template>
  <div class="card-body">
    <h5 class="card-title">{{apod.title}}</h5>

    <div>
      <!-- FOR VIDEO -->
      <iframe width="498" height="332" :src="apod.url" v-if="apod.mediaType !=='image'"></iframe>

      <!-- FOR IMAGE -->
      <img class="card-img-top" v-bind:src="apod.url" alt="Card image cap" v-else>
    </div>

    <div class="mt-3">
      <a href="#" class="btn btn-primary mr-2" @click.prevent="apodDetail(apod._id)">See detail</a>
      <a href="#" class="btn btn-danger" @click.prevent="deleteApod(apod._id)">Delete</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApodItem",
  props: ["apod"],
  methods: {
    deleteApod(id) {
      this.$emit("deleteApod", id);
    },
    apodDetail(id) {
      this.$emit("apodDetail", id);
    }
  }
};
</script>

<style>
</style>
