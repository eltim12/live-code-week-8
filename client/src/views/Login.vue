<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card mb-4">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <form method="post" @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="email"
                >
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                >
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import serverAPI from "@/API/serverAPI.js";

export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      serverAPI
        .post("/login", {
          email: this.email,
          password: this.password
        })
        .then(loggedin => {
          localStorage.setItem("accessToken", loggedin.data.accessToken);
          this.$store.commit("setUserStatus", {
            status: true
          });
          this.$store.dispatch("notif", {
            type: "success",
            message: "You Have Successfully Logged In"
          });
          this.$router.push('/')
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
