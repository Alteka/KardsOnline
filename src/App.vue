<template>
  <div id="app">
    <test-card :config="config"></test-card>
  </div>
</template>

<script>
import TestCard from './components/TestCard.vue'

export default {
  name: 'App',
  components: {
    TestCard
  },
  data: function() { 
      return {
        config: require('./defaultConfig.json')
      }
    }
}
</script>

<style>
@font-face {
  font-family: Sansation;
  src: url("~@/assets/Sansation-Regular.ttf");
}
#app {
  font-family: 'Sansation', Helvetica, Arial, sans-serif;
}
</style>
