<template>
  <div class="col-lg-8 col-xl-6">
    <h5 class="my-md-4">Projects</h5>
    <table class="table">
      <tbody>
        <tr v-for="project in projects" :key="project.name">
          <td>{{project.name}}</td>
          <td>
            <input type="color"
                   style="min-width: 50px;max-width: 80px"
                   class="form-control"
                   name="new-project-color"
                   v-model="project.color"
                   disabled="disabled"
            />
          </td>
          <td>
            <button
              class="btn btn-danger ml-md-3 float-right"
              v-on:click="deleteProject(project.name)">
              <span class="d-none d-sm-none d-lg-inline-block">Delete</span>
              <span class="oi oi-ban"></span></button>
          </td>
        </tr>
        <tr>
          <td>
            <input
              class="form-control"
              v-bind:class="{ 'is-invalid': !!errors['name'] }"
              name="new-project-name"
              v-model="newProject.name"
              placeholder="Project Name"
            />
            <div class="invalid-feedback" v-if="!!errors['name']">{{errors['name']}}</div>
          </td>
          <td>
            <input type="color"
                class="form-control"
                   style="min-width: 50px;max-width: 80px"
                   v-bind:class="{ 'is-invalid': !!errors['color'] }"
                name="new-project-color"
                v-model="newProject.color"
            />
            <div class="invalid-feedback" v-if="!!errors['color']">{{errors['color']}}</div>
          </td>

          <td>
            <button class="btn btn-primary ml-md-3 float-right" v-on:click="onSaveProjectClicked"><span class="d-none d-sm-none d-lg-inline-block">Add</span> <span class="oi oi-plus"></span></button>
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
      newProject: {},
      errors: {}
    };
  },
  mounted() {

  },
  methods: {
    onSaveProjectClicked: async function() {
      this.errors = {};
      if (this.newProject.name == null) this.errors['name'] = 'Project name is required';
      if (this.newProject.color == null) this.errors['color'] = 'Color is required';

      if (Object.keys(this.errors).length !== 0) return;
      const newProject = { name: this.newProject.name, color: this.newProject.color };
      await this.saveProject(newProject);
      this.newProject = {};
    }
  }
};
</script>