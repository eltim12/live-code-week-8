<template>
  <div class="home">
    <div class="container my-4">
      <AddPodForm @addedApod="fetchData"></AddPodForm>
      <div class="row">
        <div class="col-6">
          <SearchBar @submitSearch="filterApods"></SearchBar>
          <ApodList
            @apodDetail="apodDetail"
            @updatedApod="updatedApod"
            @deleteApod="deleteApod"
            :apods="apods"
          ></ApodList>
        </div>
        <div class="col-6">
          <router-view :apod="detail"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import serverAPI from "@/API/serverAPI.js";

import AddPodForm from "@/components/AddPodForm.vue";
import SearchBar from "@/components/SearchBar";
import ApodList from "@/components/ApodList";
// import ApodDetail from "@/components/ApodDetail";

export default {
  name: "home",
  components: {
    AddPodForm,
    SearchBar,
    ApodList
    // ApodDetail
  },
  data() {
    return {
      apods: [],
      detail: ""
    };
  },
  created() {
    this.fetchData();
    if (this.$route.params.id) {
      this.apodDetail(this.$route.params.id);
    }
  },
  watch: {
    $route() {
      this.apodDetail(this.$route.params.id);
    }
  },
  methods: {
    fetchData() {
      serverAPI
        .get("/apods", {
          headers: {
            "Access-Token": localStorage.getItem("accessToken")
          }
        })
        .then(({ data }) => {
          this.apods = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteApod(id) {
      serverAPI
        .delete(`/apods/${id}`, {
          headers: {
            "Access-Token": localStorage.getItem("accessToken")
          }
        })
        .then(deleted => {
          this.$store.dispatch("notif", {
            type: "success",
            message: "You have successfully deleted an apods!"
          });
          this.fetchData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    updatedApod() {
      this.fetchData();
    },
    apodDetail(id) {
      serverAPI
        .get(`/apods/${id}`, {
          headers: {
            "Access-Token": localStorage.getItem("accessToken")
          }
        })
        .then(({ data }) => {
          this.detail = data;
          this.$router.push(`/${id}`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterApods(title) {
      serverAPI
        .get("/apods", {
          headers: {
            "Access-Token": localStorage.getItem("accessToken")
          }
        })
        .then(({ data }) => {
          this.apods = data;
          let regexTitle = new RegExp("^" + title, "i");
          let result = [];
          this.apods.map(e => {
            if (e.title.match(regexTitle)) {
              console.log(e.title);
              result.push(e);
            }
          });

          console.log(result);
          if (result[0] === undefined) {
            this.$store.dispatch("notif", {
              type: "error",
              message: "Oops, not found :("
            });
          } else {
            this.apods = result;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
