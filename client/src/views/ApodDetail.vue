<template>
  <div class="card" id="detail">
    <div class="card-header">Detail</div>
    <div class="card-body">
      <h2 class="card-title">
        <u>{{apod.title}}</u>
      </h2>
      <div class="card-text">
        <h4>Description</h4>
        {{apod.desc}}
        <br>
        <br>
        <br>
        <h4>Date of picture</h4>
        {{apod.date}}
      </div>
      <a href="#" class="btn btn-primary mr-2 mt-3" @click.prevent="showUpdate = true">Update</a>
      <form action v-if="showUpdate" @submit.prevent="updateApod(apod._id)">
        <datepicker v-model="date"></datepicker>
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/API/serverAPI.js";
import Datepicker from "vuejs-datepicker";

export default {
  name: "detail",
  components: {
    Datepicker
  },
  props: ["apod"],
  data() {
    return {
      showUpdate: false,
      date: ""
    };
  },
  methods: {
    updateApod(id) {
      serverAPI
        .put(
          `/apods/${id}`,
          {
            date: this.date.toISOString().slice(0, 10)
          },
          {
            headers: {
              "Access-Token": localStorage.getItem("accessToken")
            }
          }
        )
        .then(updated => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "You Have Successfully updated this apod!!"
          });
          this.$emit("updatedApod");
          this.date = "";
          this.showUpdate = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
