<template>
  <ul class="pills" :class="{ 'pills--closable': closable }">
    <li v-for="(p, i) in pills" :key="`pill-${i}-${p[labelKey]}`" class="pills__item">
      {{ p[labelKey] }}
      <fa-icon
        v-if="closable"
        :icon="['fal', 'times']"
        class="pills__item__icon"
        @click="$emit('pill-item-closed', i)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pills: {
      type: Array,
      required: true
    },
    labelKey: {
      type: String,
      default: "label"
    },
    closable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="postcss">
.pills {
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: inherit;
  flex-wrap: wrap;

  &__item {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin: 0;
    margin-right: 1rem;
    margin-bottom: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }
  }

  &--closable {
    .pills__item {
      &__icon {
        font-size: 0.7rem;
        margin-left: 0.7rem;
        cursor: pointer;
      }

      &:hover {
        background-color: var(--color-red);
      }
    }
  }
}
</style>