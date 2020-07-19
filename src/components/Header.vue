<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">TimeTrack</a>

    <ul class="navbar-nav mr-auto"></ul>
    <div class="my-2 my-lg-0">
      <div v-if="profile">Signed in as {{profile.name}}
        <button class="btn btn-primary" v-on:click="$emit('clickSignOut')">Sign Out <span class="oi oi-account-logout"></span></button>
      </div>
      <button class="btn btn-primary" v-else id="google-signin-button" v-on:click="$emit('clickSignIn')">Sign In <span class="oi oi-account-login"></span></button>
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