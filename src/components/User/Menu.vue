<template>
  <div class="user-menu">
    <div class="user-menu__username">Evan Agee</div>
    <figure
      class="user-menu__avatar"
      style="background-image: url(https://res.cloudinary.com/evanagee/image/upload/c_scale,w_80/v1551277265/evanagee.com/evan-2018.jpg);"
    ></figure>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.css";

.user-menu {
  position: fixed;
  right: 2rem;
  top: 1rem;
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  z-index: 10;

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
}
</style>