<template>
  <div>
    <h4 class="d-inline-block d-md-none">{{dayTitle.format('ddd, MMMM Do YYYY')}}</h4>
    <h2 class="d-none d-sm-none d-md-inline-block">{{dayTitle.format('dddd, MMMM Do YYYY')}}</h2>
    <table class="table">
      <tbody>
        <tr v-for="(timeEntry, index) in timesForDay" :key="index">
          <td>{{timeEntry.amount}} {{timeEntry.unit}} - {{timeEntry.projectName}}</td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteTimeEntry(timeEntry)"
            >Delete <span class="oi oi-ban"></span></button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form-group">
      <label for="project">Project</label>
      <select class="form-control" v-model="newTimeEntry.projectName" v-bind:class="{ 'is-invalid': !!errors['projectName'] }">
        <option v-for="project in projects" :key="project.name">{{project.name}}</option>
      </select>
      <div class="invalid-feedback" v-if="!!errors['projectName']">{{errors['projectName']}}</div>
    </div>

    <div class="row">
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label for="project">Number</label>
          <input class="form-control" v-model="newTimeEntry.amount" placeholder="Days/hours" v-bind:class="{ 'is-invalid': !!errors['amount'] }"/>
          <div class="invalid-feedback" v-if="!!errors['amount']">{{errors['amount']}}</div>
        </div>
      </div>
      <div class="col col-md-6 col-12">
        <div class="form-group">
          <label for="project">Days or hours</label>
          <select class="form-control" v-model="newTimeEntry.unit">
            <option value="days" selected="selected">Days</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>
    </div>

    <button class="btn btn-danger ml-md-3" v-on:click="this.cancelDaySelection">Cancel <span class="oi oi-delete"></span></button>
    <button class="btn btn-primary ml-md-3 float-right" v-on:click="onSaveTimeClicked">Add <span class="oi oi-plus"></span></button>
  </div>
</template>

<style scoped>
</style>

<script>
import moment from 'moment';
export default {
  props: ['selectedDay', 'projects', 'saveTime', 'timesForDay', 'deleteTimeEntry', 'cancelDaySelection'],
  data() {
    return {
      newTimeEntry: {
        unit: "days"
      },
      errors: {

      }
    };
  },
  methods: {
    onSaveTimeClicked() {
      this.errors = {};
      if (this.newTimeEntry.projectName == null) this.errors['projectName'] = 'Required';
      if (this.newTimeEntry.amount == null) this.errors['amount'] = 'Required';
      if (Object.keys(this.errors).length !== 0) return;

      this.saveTime(this.newTimeEntry);
      this.newTimeEntry = {
        unit: "days"
      }
    }
  },
  computed: {
    dayTitle: function() {
      return moment(this.selectedDay.date);
    }
  }
};
</script>