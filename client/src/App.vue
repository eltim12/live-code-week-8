<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import serverAPI from "@/API/serverAPI.js";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  name: "app",
  created() {
    if (localStorage.getItem("accessToken")) {
      this.verify();
    } else {
      this.$router.push("/login");
      this.$store.commit("setUserStatus", {
        status: false
      });
    }
  },
  methods: {
    verify() {
      serverAPI
        .post(
          "/verify",
          {},
          {
            headers: {
              "Access-Token": localStorage.getItem("accessToken")
            }
          }
        )
        .then(verified => {
          this.$store.commit("setUserStatus", {
            status: true
          });
        })
        .catch(err => {
          this.$store.commit("setUserStatus", {
            status: false
          });
          localStorage.clear();
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
</style>
