<template>
  <div>
    <h2>{{dayTitle}}</h2>
    <table class="table">
      <tbody>
        <tr v-for="(timeEntry, index) in timesForDay" :key="index">
          <td>{{timeEntry.amount}} {{timeEntry.unit}} - {{timeEntry.projectName}}</td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteTimeEntry(timeEntry)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form-group">
      <label for="project">Project</label>
      <select class="form-control" v-model="newTimeEntry.projectName">
        <option v-for="project in projects" :key="project.name">{{project.name}}</option>
      </select>
    </div>

    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="project">Number of units</label>
          <input class="form-control" v-model="newTimeEntry.amount" placeholder="Number of units" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="project">Unit type</label>
          <select class="form-control" v-model="newTimeEntry.unit">
            <option value="days" selected="selected">Days</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>
    </div>

    <button class="btn btn-primary ml-md-3 float-right" v-on:click="onSaveTimeClicked">Add</button>
  </div>
</template>

<style scoped>
</style>

<script>
import moment from 'moment';
export default {
  props: ['selectedDay', 'projects', 'saveTime', 'timesForDay', 'deleteTimeEntry'],
  data() {
    return {
      newTimeEntry: {
        unit: "days"
      }
    };
  },
  methods: {
    onSaveTimeClicked() {
      this.saveTime(this.newTimeEntry);
      this.newTimeEntry = {
        unit: "days"
      }
    }
  },
  computed: {
    dayTitle: function() {
      return moment(this.selectedDay.date).format('dddd, MMMM Do YYYY');
    }
  }
};
</script>