<template>
  <div></div>
</template>

<script>
import Constants from "../constants";

export default {
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects: async function() {
      /* eslint-disable */
      const auth2 = await gapi.auth2.getAuthInstance();
      const idToken = auth2.currentUser.get().getAuthResponse().id_token;
      /* eslint-enable */
      const response = await fetch(Constants.BASE_URL + Constants.PROJECTS_LIST, {
        headers: {
          auth: idToken
        }
      })
      const text = await response.text();
      console.log(text);
    }
  }
};
</script>