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
          <TimeEditor
            v-bind:onDaySelected="onDaySelected"
            v-bind:syncProjects="syncProjects"
            v-bind:times="times"
          />
        </div>
        <div class="col">
          <DayEditor
            v-bind:selectedDay="selectedDay"
            v-bind:projects="projects"
            v-bind:saveTime="saveTime"
            v-bind:timesForDay="timesForDay"
            v-bind:deleteTimeEntry="deleteTimeEntry"
            v-if="selectedDay"
          />
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
import moment from "moment";

export default {
  data() {
    return {
      tab: "time",
      projects: [],
      selectedDay: null,
      times: []
    };
  },
  components: {
    ProjectList,
    TimeEditor,
    DayEditor
  },
  mounted() {
    this.fetchProjects();
    this.fetchTimes();
  },
  methods: {
    fetchProjects: async function() {
      const projects = await ApiService.getProjects();
      this.projects = projects;
    },
    fetchTimes: async function() {
      const start = moment().startOf("month").toISOString();
      const end = moment().endOf("month").toISOString();
      const times = await ApiService.queryTimeEntries(start, end);
      console.log(times);
      this.times = times;
    },
    saveProject: async function(project) {
      await ApiService.saveProject(project);
      this.projects.push(project);
    },
    deleteProject: async function(projectName) {
      await ApiService.deleteProject({ name: projectName });
      this.projects = this.projects.filter(p => p.name != projectName);
    },
    async saveTime(newTimeEntry) {
      await ApiService.createTimeEntry({
        ...newTimeEntry,
        dateTime: this.selectedDay.date
      });
      this.fetchTimes();
    },
    async deleteTimeEntry(timeEntry) {
      await ApiService.deleteTimeEntry(timeEntry.key, timeEntry.dateTime);
      this.times = this.times.filter(t => t !== timeEntry);
    },
    onDaySelected(day) {
      this.selectedDay = day;
    },
    syncProjects(projects) {
      this.projects = projects;
    }
  },
  computed: {
    timesForDay() {
      return this.times.filter(t => moment(t.dateTime).isSame(moment(this.selectedDay.date), "day"));
    }
  }
};
</script>