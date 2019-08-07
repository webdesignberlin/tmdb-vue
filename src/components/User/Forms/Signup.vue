<template>
  <div class="form form--signup">
    <h3 class="form__title">Sign Up!</h3>
    <div class="input input--fluid input--outline">
      <input type="email" ref="email" placeholder="Your Email Address" />
    </div>
    <div class="input input--fluid input--outline">
      <input type="password" ref="password" placeholder="Password" />
    </div>
    <button @click="signup()">Create Account</button>
  </div>
</template>

<script>
import {
  MODULE_NAME as USER_MODULE,
  ACTIONS as USER_ACTIONS
} from "@/store/user/types";
export default {
  methods: {
    signup() {
      this.$store.dispatch(`${USER_MODULE}/${USER_ACTIONS.USER_SIGNUP}`, {
        email: this.$refs.email.value,
        password: this.$refs.password.value
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>