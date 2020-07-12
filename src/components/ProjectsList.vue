<template>
  <div class="container py-md-5">
    <div class="row">
      <div class="col">

      </div>
      <div class="col">
        <h2>Projects</h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="project in projects" :key="project.name">
            {{project.name}}
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteProject(project.name)"
            >Delete</button>
          </li>
        </ul>

        <h2 class="mt-md-5">Add Project</h2>
        <div class="form-inline">
          <div class="input-group my-md-3 col-8 pl-md-0">
            <input
              class="form-control"
              name="new-project-name"
              v-model="newProject.name"
              placeholder="Project Name"
            />
          </div>
          <button class="btn btn-primary ml-md-3" v-on:click="saveProject">Add Project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "../apiService";

export default {
  data() {
    return {
      projects: [],
      newProject: {}
    };
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects: async function() {
      const projects = await ApiService.getProjects();
      this.projects = projects;
    },
    saveProject: async function() {
      const newProject = { name: this.newProject.name };
      await ApiService.saveProject(newProject);
      this.projects = [...this.projects, newProject];
      this.newProject = {};
    },
    deleteProject: async function(projectName) {
      await ApiService.deleteProject({ name: projectName });
      this.projects = this.projects.filter(p => p.name != projectName);
    }
  }
};
</script>