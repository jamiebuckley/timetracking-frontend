<template>
  <div class="col w-50">
    <h2>Projects</h2>

    <table class="table">
      <tbody>
        <tr v-for="project in projects" :key="project.name">
          <td>{{project.name}}</td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteProject(project.name)"
            >Delete</button>
          </td>
        </tr>
        <tr>
          <td>
            <input
              class="form-control"
              name="new-project-name"
              v-model="newProject.name"
              placeholder="Project Name"
            />
          </td>

          <td>
            <button class="btn btn-primary ml-md-3 float-right" v-on:click="onSaveProjectClicked">Add Project</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['projects', 'saveProject', 'deleteProject'],
  data() {
    return {
      newProject: {}
    };
  },
  mounted() {

  },
  methods: {
    onSaveProjectClicked: async function() {
      const newProject = { name: this.newProject.name };
      await this.saveProject(newProject);
      this.newProject = {};
    }
  }
};
</script>