<template>
  <div>
    <h2>{{dayTitle}}</h2>
    <table class="table">
      <tbody>
        <tr v-for="(timeEntry, index) in timeEntries" :key="index">
          <td>{{timeEntry.projectName}}</td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteTime(timeEntry)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <form>
      <div class="form-group">
        <label for="project">Project</label>
        <select class="form-control" v-model="newTimeEntry.name">
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

      <button class="btn btn-primary ml-md-3 float-right" v-on:click="saveTime">Add</button>
    </form>
  </div>
</template>

<style scoped>
</style>

<script>
import moment from 'moment';

export default {
  props: ['selectedDay', 'projects'],
  data() {
    return {
      timeEntries: [],
      newTimeEntry: {
        unit: "days"
      }
    };
  },
  methods: {
    saveTime() {},
    deleteTime() {}
  },
  computed: {
    dayTitle: function() {
      return moment(this.selectedDay.date).format('dddd, MMMM Do YYYY');
    }
  }
};
</script>