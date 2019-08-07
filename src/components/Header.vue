<template>
  <header class="header">
    <figure class="header__logo">
      <router-link to="/">
        <fa-icon :icon="['fal', 'film']" />
        <span>my movies</span>
      </router-link>
    </figure>
    <nav class="header__nav">
      <ul class="header__nav__items">
        <li class="header__nav__items__item">
          <router-link to="/">
            <fa-icon :icon="['fal', 'popcorn']" />
            <span>Browse</span>
          </router-link>
        </li>
        <li class="header__nav__items__item">
          <router-link to="/favorites">
            <fa-icon :icon="['fas', 'heart']" />
            <span>Favorites</span>
          </router-link>
        </li>
        <li class="header__nav__items__item">
          <router-link to="/watchlist">
            <fa-icon :icon="['far', 'eye']" />
            <span>Watchlist</span>
          </router-link>
        </li>
        <li class="header__nav__items__item">
          <router-link to="/diary">
            <fa-icon :icon="['fal', 'clipboard-list']" />
            <span>Diary</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--color-black);
  z-index: 5;

  span {
    color: white;
    font-size: 0.5rem;
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.1rem;
    padding: 10px 0;
  }

  &__logo {
    font-size: 2rem;
    line-height: 1;
    text-align: center;
    padding: 1.25rem 0 1rem 0;
    color: rgba(var(--color-primary), 0.5);
    /* border-bottom: 1px solid rgba(255, 255, 255, 0.25); */

    a {
      color: inherit;
    }

    &:hover {
      color: var(--color-primary);
    }
  }

  &__nav {
    &__items {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 1.35rem;

      &__item {
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.25);
          padding: 1.25rem 0;
          transition: color var(--animation-quick-settings);
          margin-bottom: 0.5rem;

          &.router-link-active,
          &:hover {
            color: rgba(255, 255, 255, 0.1);

            span {
              opacity: 1;
              transform: translateY(0);
            }
          }

          &.router-link-active {
            color: rgba(255, 255, 255, 0.4);
            background-color: var(--color-primary);

            &:hover {
              color: rgba(255, 255, 255, 0.4);
            }
          }

          span {
            position: absolute;
            transition: opacity var(--animation-quick-settings),
              transform var(--animation-quick-settings);
            opacity: 0;
            font-size: 0.6rem;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>