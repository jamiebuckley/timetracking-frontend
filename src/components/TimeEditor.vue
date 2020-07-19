<template>
  <div>
    <div class="d-flex justify-content-center p-2 bd-highlight">
      <button type="button" class="btn btn-outline-info btn-sm mr-5" v-on:click="this.moveBackMonth">
        <span class="oi oi-arrow-left"></span>
        Prev
      </button>
      <h4>{{currentMonth.format('MMMM')}}</h4>
      <button type="button" class="btn btn-outline-info btn-sm ml-5" v-on:click="this.moveForwardMonth">Next
        <span class="oi oi-arrow-right"></span>
      </button>
    </div>

    <div class="p-3">
      <span class="badge mr-3" v-for="project in timeForProject()" v-bind:style="{ background: project.color, color: 'white' }" :key="project.name">{{project.name}} - {{project.days}} days and {{project.hours}} hours</span>
    </div>

    <div class="row">
      <div
              v-for="day in dayNames"
              :key="day"
              class="col-sm day-header">{{day}}</div>
    </div>
    <div v-for="(week, index) in weeks" :key="index" class="row">
      <div
        v-for="(day, index) in week"
        :key="index"
        class="col-sm day-box"
        v-bind:class="{ isInMonth: day.isInMonth, notInMonth: !day.isInMonth, isToday: day.isToday }"
        v-on:click="onDaySelected(day)"
      >{{day.dayOfMonth}} <span class="smallDayTitle">{{dayNames[index]}}</span>
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
$light-yellow: #eeeee6;
$light-green: rgb(217, 255, 213);
$light-blue: rgb(243, 247, 248);

.day-box {
  height: 120px;
  padding: 8px;
  margin: 2px;
  background-color: $light-grey;
}

@media only screen and (max-width: 576px) {
  .day-header {
    display: none;
  }

  .notInMonth {
    display: none;
  }
}

.smallDayTitle {
  color: #454545;
  font-size: 10px;
}

@media only screen and (min-width: 576px) {
  .smallDayTitle {
    display: none;
  }
}

.day-header {
  background-color: lighten(#dc6123, 5%);
  margin: 2px;
  padding: 4px;
  padding-left: 8px;
  color: white;
}

.isInMonth {
  background-color: $light-blue;

  &:hover {
    background-color: $light-yellow;
    cursor: pointer;
  }
}

.isToday {
  background-color: $light-green;
}

.tinyText {
  font-size: 10px;
  font-weight: 500;
  width:100%;
  display: block;
  padding: 2px;
  border-radius: 2px;
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
      dayNames: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
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
    timeForProject() {
      const colorsForProjects = this.projects.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.color }), {});
      const data = this.times.reduce((acc, curr) => {
        const thisDays = curr.unit === 'days' ? curr.amount : 0;
        const thisHours = curr.unit === 'hours' ? curr.amount : 0;
        return {
          ...acc,
          [curr.projectName]: {
            days: (acc[curr.projectName]?.days ?? 0) + thisDays,
            hours: (acc[curr.projectName]?.hours ?? 0) + thisHours,
            color: colorsForProjects[curr.projectName]
          }
        };
      }, {});
      return Object.keys(data).map(name => ({ name , ...data[name] }));
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