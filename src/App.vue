<template>
  <div id="app">
    
    <test-card :config="config" @click="alert('bob')"></test-card>

    <div id="ClickMeAlice" v-on:click="controlVisible = true"></div>

    <el-dialog title="Control - Select Test Card" :visible.sync="controlVisible" width="666px">
      <control :config="config" class="controlDialog"></control>
    </el-dialog>


  </div>
</template>

<script>
import TestCard from './components/TestCard.vue'
import Control from './components/Control.vue'

export default {
  name: 'App',
  components: {
    TestCard, Control
  },
  data: function() { 
      return {
        config: require('./defaultConfig.json'),
        controlVisible: true
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
#ClickMeAlice {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.controlDialog {
  min-width: 625px;
}
</style>
