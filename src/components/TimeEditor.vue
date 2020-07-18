<template>
  <div>
    <h2>Time Editor</h2>
    <div class="d-flex p-2 bd-highlight">
      <button type="button" class="btn btn-info btn-sm mr-5" v-on:click="this.moveBackMonth">Prev</button>
      <strong>{{currentMonth.format('MMMM')}}</strong>
      <button type="button" class="btn btn-info btn-sm ml-5" v-on:click="this.moveForwardMonth">Next</button>
    </div>

    <div class="p-3">
      <ul class="list-group">
        <li v-for="project in this.projects" :key="project.name" class="list-group-item d-flex justify-content-between align-items-center">{{project.name}}
          <span class="badge badge-primary badge-pill">{{timeForProject(project.name)}}</span>
        </li>
      </ul>
    </div>

    <div v-for="(week, index) in weeks" :key="index" class="row">
      <div
        v-for="(day, index) in week"
        :key="index"
        class="col-sm day-box"
        v-bind:class="{ isInMonth: day.isInMonth, isToday: day.isToday }"
        v-on:click="onDaySelected(day)"
      >{{day.dayOfMonth}}
        <ul class="unstyledList">
          <li v-for="(timeEntry, index) in timesForDay(day.date)" :key="index">
            <span class="tinyText" v-bind:style="{ background: timeEntry.background, color: timeEntry.color }">{{timeEntry.projectName}}: {{timeEntry.amount}}{{timeEntry.unit.slice(0, 1)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$light-grey: #e2e2e2;
$light-yellow: #ffffe3;
$light-green: rgb(217, 255, 213);

.day-box {
  height: 120px;
  padding: 8px;
  background-color: $light-grey;
}

.isInMonth {
  background-color: white;

  &:hover {
    background-color: $light-yellow;
    cursor: pointer;
  }
}

.isToday {
  background-color: $light-green;
}

.tinyText {
  font-size: 12px;
  width:100%;
  display: block;
  padding: 4px;
  border-radius: 5px;
  margin-bottom: 2px;
  color:white;
}

.unstyledList {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
}
</style>

<script>
import moment from "moment";

moment.updateLocale("en", {
  week: {
    dow: 1
  }
});

export default {
  props: ['onDaySelected', 'syncProjects', 'times', 'moveBackMonth', 'moveForwardMonth', 'currentMonth', 'projects'],
  data() {
    return {

    };
  },
  methods: {
    timesForDay(day) {
      const dayMoment = moment(day);
      let times = this.times.filter(t => moment(t.dateTime).isSame(dayMoment, "day"));
      times = times.map(t => {
        const project = this.projects.find(p => p.name === t.projectName);
        if (project) t.background = project.color;
        else t.background = '#EEEEEE';
        return t;
      })
      return times;
    },
    timeForProject(projectName) {
      let numHours = 0;
      let numDays = 0;
      const projectTimes = this.times.filter(p => p.projectName === projectName);
      for(let i = 0; i < projectTimes.length; i++) {
        if (projectTimes[i].unit === 'days') numDays += projectTimes[i].amount;
        if (projectTimes[i].unit === 'hours') numHours += projectTimes[i].amount;
      }
      let string = '';
      if (numDays !== 0) {
        string += `${numDays} days`;
        if (numHours !== 0) string += ' and ';
      }
      if (numHours !== 0) string += `${numHours} hours`;
      return string;
    }
  },
  mounted() {

  },
  computed: {
    weeks() {
      const now = moment();
      const days = [];
      const firstMonday = moment(this.currentMonth)
              .startOf("month")
              .startOf("week");
      const lastSunday = moment(this.currentMonth)
              .endOf("month")
              .endOf("week");

      for (
              let i = moment(firstMonday);
              i.isSameOrBefore(lastSunday, "day");
              i.add(1, "days")
      ) {
        days.push({
          date: i.utcOffset(0, true).toISOString(false),
          dayOfMonth: i.format("D"),
          isInMonth: i.isSame(this.currentMonth, "month"),
          isToday: i.isSame(now, "day")
        });
      }

      const result = [];
      while (days.length > 7) {
        result.push(days.splice(0, 7));
      }
      if (days.length > 0) result.push(days);
      return result;
    }
  }
};
</script>