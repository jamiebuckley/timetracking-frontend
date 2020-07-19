<template>
  <div class="col-lg-8 col-xl-6">
    <h5 class="my-md-4">Projects</h5>
    <table class="table">
      <tbody>
        <tr v-for="project in projects" :key="project.name">
          <td>{{project.name}}</td>
          <td>
            <input type="color"
                   class="form-control"
                   name="new-project-color"
                   v-model="project.color"
                   disabled="disabled"
            />
          </td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteProject(project.name)"
            >Delete <span class="oi oi-ban"></span></button>
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
            <input type="color"
                class="form-control"
                name="new-project-color"
                v-model="newProject.color"
            />
          </td>

          <td>
            <button class="btn btn-primary ml-md-3 float-right" v-on:click="onSaveProjectClicked">Add Project <span class="oi oi-plus"></span></button>
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
      const newProject = { name: this.newProject.name, color: this.newProject.color };
      await this.saveProject(newProject);
      this.newProject = {};
    }
  }
};
</script>