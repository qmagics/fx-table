<template>
  <FxButton
    :category="action.category"
    :icon="action.icon"
    :split="action.split"
    :type="action.type"
    :loading="action.loading"
    :disabled="action.disabled"
    @click="handler(action)"
  >
    <template v-if="action.category!=='group'">{{action.name}}</template>

    <template v-if="action.category==='dropdown'" #items>
      <ActionRenderer v-for="i in action.children" :key="i.code" :action="i" :handler="handler" />
    </template>

    <template v-if="action.category==='group'">
      <ActionRenderer v-for="i in action.children" :key="i.code" :action="i" :handler="handler" />
    </template>
  </FxButton>
</template>

<script>
import FxButton from "./FxButton.vue";

export default {
  name: "ActionRenderer",

  components: {
    FxButton
  },

  props: {
    action: {},
    handler: Function
  }
};
</script>

<style>
</style>