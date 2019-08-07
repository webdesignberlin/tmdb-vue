<template>
  <div class="user-menu">
    <template v-if="$store.state.user.loggedIn">
      <button class="user-menu__navTrigger" @click="userMenuVisible = !userMenuVisible">
        <span>
          <div class="user-menu__username">{{ $store.getters['user/displayName'] }}</div>
          <figure
            class="user-menu__avatar"
            style="background-image: url(https://res.cloudinary.com/evanagee/image/upload/c_scale,w_80/v1551277265/evanagee.com/evan-2018.jpg);"
          ></figure>
        </span>
      </button>
      <nav class="user-menu__nav" v-if="userMenuVisible">
        <ul class="user-menu__nav__items">
          <li class="user-menu__nav__items__item">
            <a>Profile</a>
          </li>
          <li class="user-menu__nav__items__item">
            <router-link to="/favorites">Favorites</router-link>
          </li>
          <li class="user-menu__nav__items__item">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </template>
    <div class="user-menu__auth" v-else key="user-auth-menu">
      <button class="user-menu__auth__trigger" @click="signupVisible = true">Sign Up</button>
      <button class="user-menu__auth__trigger" @click="signinVisible = true">Sign In</button>
    </div>
    <Overlay class="user-menu__signUp__form" :show="signupVisible" @close="signupVisible = false">
      <SignupForm />
    </Overlay>
    <Overlay class="user-menu__signin__form" :show="signinVisible" @close="signinVisible = false">
      <SigninForm />
    </Overlay>
  </div>
</template>

<script>
import {
  MODULE_NAME as USER_MODULE,
  ACTIONS as USER_ACTIONS
} from "@/store/user/types";
export default {
  data() {
    return {
      signupVisible: false,
      signinVisible: false,
      userMenuVisible: false
    };
  },

  computed: {},

  components: {
    Overlay: () => import("../Utility/Overlay"),
    SignupForm: () => import("../User/Forms/Signup"),
    SigninForm: () => import("../User/Forms/Signin")
  },

  methods: {
    logout() {
      return this.$store.dispatch(`${USER_MODULE}/${USER_ACTIONS.USER_LOGOUT}`);
    }
  }
};
</script>

<style lang="postcss" scoped>
.user-menu {
  position: fixed;
  right: 2rem;
  top: 0;
  height: var(--searchbar-height);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: var(--font-size-small);
  z-index: 10;
  min-width: 200px;

  &__avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
  }

  &__username {
    flex: 1;
    font-weight: 800;
    padding-right: 0.75rem;
  }

  &__signUp {
  }

  &__nav {
    font-size: 0.8rem;
    position: absolute;
    right: 0;
    top: var(--searchbar-height);
    width: 200px;
    background-color: var(--color-black-lighter);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

    &__items {
      list-style: none;
      margin: 0;
      padding: 0;

      &__item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        transition: background-color 0.2s ease, border-color 0.2s ease;

        &:last-child {
          border-bottom: 0;
        }

        &:hover {
          background-color: var(--color-black);
          border-color: rgba(255, 255, 255, 0.1);
        }

        a {
          display: block;
          padding: 0.75rem 1rem;
          cursor: pointer;
          color: inherit;

          &:hover {
          }
        }
      }
    }

    &Trigger {
      background: transparent;
      border: 0;
      font-size: inherit;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      & > span {
        display: flex;
        color: white;
        align-items: center;
      }
    }
  }
}
</style>