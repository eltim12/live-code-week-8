<template>
  <form method="post" class="input-group mb-3" @submit.prevent="submitSearch">
    <input
      type="text"
      name="search"
      id="search"
      class="form-control"
      autocomplete="off"
      placeholder="Search..."
      v-model="search"
    >
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="submit">Search</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    submitSearch() {
      this.$emit("submitSearch", this.search);
      this.search = "";
    }
  }
};
</script>

<style>
</style>
