<template>
  <Header 
    v-bind:profile="profile"
    v-on:clickSignIn="signIn"
    v-on:clickSignOut="signOut"/>
</template>

<script>
import Header from './components/Header.vue';

export default {
  data() {
    return {
      profile: null
    };
  },
  mounted() {
    /* eslint-disable */
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: '846834681157-4heibg4re26art8qh89sr0334mjtfrea.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });

      const authInstance = gapi.auth2.getAuthInstance();
      authInstance.then(() => {
        if (authInstance.isSignedIn.get() == true) {
          console.log('is signed in');
          this.setProfile(authInstance.currentUser.get().getBasicProfile());
        }
      })
    });
    /* eslint-enable */
  },
  methods: {
    signIn() {
      /* eslint-disable */
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(() => {
        this.setProfile(auth2.currentUser.get().getBasicProfile());
      });
      /* eslint-enable */
    },
    signOut() {
      /* eslint-disable */
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        this.profile = null;
      });
      /* eslint-enable */
    },
    setProfile(profile) {
      this.profile = {
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl()
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style>
</style>
