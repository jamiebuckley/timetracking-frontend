<template>
  <div>
    <ul>
      <li v-for="project in projects" :key="project.name">{{project.name}}</li>
    </ul>
  </div>
</template>

<script>
import Constants from "../constants";

export default {
  data() {
    return {
      projects: []
    }
  },
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
      const projects = await response.json();
      this.projects = projects;
    }
  }
};
</script>