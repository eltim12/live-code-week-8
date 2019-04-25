<template>
  <div class="jumbotron">
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div>
          <h2>Add Astronomy Picture</h2>
          <p>
            <em>Please input date</em>, etc.
          </p>
          <form method="post" class="input-group" @submit.prevent="postPod">
            <datepicker v-model="date"></datepicker>
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import serverAPI from "@/API/serverAPI.js";

export default {
  name: "AddPodForm",
  components: {
    Datepicker
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    postPod() {
      serverAPI
        .post(
          "/apods",
          {
            date: this.date.toISOString().slice(0, 10)
          },
          {
            headers: {
              "Access-Token": localStorage.getItem("accessToken")
            }
          }
        )
        .then(added => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "You Have Successfully added a new apod!"
          });
          this.$emit("addedApod");
          this.date = "";
          console.log("sukses yey");
        })
        .catch(err => {
          this.$store.dispatch("notif", {
            type: "error",
            message: err.response.data.msg
          });
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
