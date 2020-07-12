<template>
  <div class="container py-md-5">
    <ul class="nav nav-tabs mb-md-3">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          v-on:click="tab = 'time'"
          v-bind:class="{ active: (tab == 'time')}"
        >Time</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          v-on:click="tab = 'projects'"
          v-bind:class="{ active: (tab == 'projects')}"
        >Projects</a>
      </li>
    </ul>
    <div v-if="tab == 'time'">
      <div class="row">
        <div class="col">
          <TimeEditor v-bind:onDaySelected="onDaySelected" v-bind:syncProjects="syncProjects" />
        </div>
        <div class="col">
          <DayEditor v-bind:selectedDay="selectedDay" v-bind:projects="projects" v-if="selectedDay" />
        </div>
      </div>
    </div>
    <ProjectList v-if="tab == 'projects'" v-bind="{ projects, saveProject, deleteProject }" />
  </div>
</template>

<script>
import ApiService from "../apiService";
import ProjectList from "./ProjectsList";
import TimeEditor from "./TimeEditor";
import DayEditor from "./DayEditor";

export default {
  data() {
    return {
      tab: "time",
      projects: [],
      selectedDay: null
    };
  },
  components: {
    ProjectList,
    TimeEditor,
    DayEditor
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects: async function() {
      const projects = await ApiService.getProjects();
      this.projects = projects;
    },
    saveProject: async function(project) {
      await ApiService.saveProject(project);
      this.projects.push(project);
    },
    deleteProject: async function(projectName) {
      await ApiService.deleteProject({ name: projectName });
      this.projects = this.projects.filter(p => p.name != projectName);
    },
    onDaySelected(day) {
      this.selectedDay = day;
    },
    syncProjects(projects){
      this.projects = projects;
    }
  }
};
</script>