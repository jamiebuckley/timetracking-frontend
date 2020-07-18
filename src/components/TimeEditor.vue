<template>
  <div>
    <h2>Time Editor</h2>
    <div class="d-flex p-2 bd-highlight">
      <button type="button" class="btn btn-info btn-sm mr-5" v-on:click="this.moveBackMonth">Prev</button>
      <strong>{{currentMonth.format('MMMM')}}</strong>
      <button type="button" class="btn btn-info btn-sm ml-5" v-on:click="this.moveForwardMonth">Next</button>
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
            <span class="tinyText">{{timeEntry.projectName}}: {{timeEntry.amount}}{{timeEntry.unit.slice(0, 1)}}</span>
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
  height: 100px;
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
  font-size: 8px;
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
  props: ['onDaySelected', 'syncProjects', 'times', 'moveBackMonth', 'moveForwardMonth', 'currentMonth'],
  data() {
    return {

    };
  },
  methods: {
    timesForDay(day) {
      const dayMoment = moment(day);
      return this.times.filter(t => moment(t.dateTime).isSame(dayMoment, "day"));
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