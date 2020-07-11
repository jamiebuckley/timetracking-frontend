<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">TimeTrack</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <div class="my-2 my-lg-0">
        <div v-if="profile">Signed in as {{profile.name}}
          <button v-on:click="$emit('clickSignOut')">Sign Out</button>  
        </div>
        <button v-else id="google-signin-button" v-on:click="$emit('clickSignIn')">Sign In</button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  @import "./header.scss";
</style>

<script>
export default {
  props: ['profile', 'signIn', 'signOut']
};
</script>