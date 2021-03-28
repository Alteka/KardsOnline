<template>
  <div id="app">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
  
      <test-card :config="config" @click="alert('bob')"></test-card>

      <div id="ClickMeAlice" v-on:click="controlVisible = true" @mousemove="mousemove"></div>

      <transition name="fade">
        <div id="overlay" v-if="showOverlay && !isMobile">
          <img src="./assets/logo.png" width="140px" />
          <p style="font-size: 150%; margin-top: 0px; margin-bottom: 10px;">Kards Online</p>
          <el-button round type="success" v-on:click="controlVisible = true"><i class="fas fa-cogs"></i> Show Controls</el-button>
          <p style="font-size: 80%;">You can also just click anywhere...</p>
        </div>
      </transition>

      <el-dialog :visible.sync="controlVisible" width="666px"> 
        <el-form ref="form" :model="config" label-width="120px" size="small">
          <el-row style="text-align: center; font-size: 150%;">
            <el-col :span="5"><img src="./assets/icon.png" width="80px"/></el-col>
            <el-col :span="14">
              <p style="margin-bottom: 10px; margin-top: 0;">Kards Online</p>
              <el-button type="success" round v-on:click="toggleFullscreen" v-if="!fullscreen"><i class="fas fa-expand-arrows-alt"></i> Go Fullscreen</el-button>
              <el-button type="danger" round v-on:click="toggleFullscreen" v-else><i class="fas fa-compress-arrows-alt"></i> Stop Fullscreen</el-button>
            </el-col>
            <el-col :span="5"><a href="https://alteka.solutions"><img src="./assets/logo.png" width="140px"/></a></el-col>
          </el-row>
        <el-divider content-position="center">Select Test Card</el-divider>
        <el-row style="margin-left: 16px; margin-right: 16px;">
          <el-tabs type="border-card"  v-model="config.cardType" :stretch="true" style="height: 165px;">
            <el-tab-pane label="Alteka" name="alteka">
              <control-alteka :alteka="config.alteka" :colors="config.predefineColors"></control-alteka>
            </el-tab-pane>
            <el-tab-pane label="Bars" name="bars">
              <control-bars :bars="config.bars"></control-bars>
            </el-tab-pane>
            <el-tab-pane label="Grid" name="grid">
              <control-grid :grid="config.grid" :colors="config.predefineColors"></control-grid>
            </el-tab-pane>
            <el-tab-pane label="Ramp" name="ramp">
              <control-ramp :ramp="config.ramp"></control-ramp>
            </el-tab-pane>
            <el-tab-pane label="Name" name="placeholder">
              <control-placeholder :placeholder="config.placeholder" :colors="config.predefineColors"></control-placeholder>
            </el-tab-pane>
            <el-tab-pane label="AV Sync" name="audioSync">
              <control-audio-sync :audioSync="config.audioSync"></control-audio-sync>
            </el-tab-pane>
          </el-tabs>
        </el-row>

        <el-divider content-position="center">Display Options</el-divider>

        <el-row>
          <el-col :span="8">
            <el-form-item label="Name" label-width="70px">
              <el-input v-model="config.name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Show Info"><i class="fas fa-info-circle green"></i>
              <el-switch v-model="config.showInfo"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Motion"><i class="fas fa-external-link-square-alt fa-rotate-90 green" style="position: relative; top: 1px; margin-right: 5px;"></i>
              <el-switch v-model="config.animated" :disabled="config.cardType=='audioSync'"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>

        </el-form>
        <footer style="font-size: 85%; text-align: center;">
          <el-link type="success" href="https://alteka.solutions/kards"><i class="fas fa-link"></i> Get the free desktop app, with more features and customisation!</el-link><br />
          <i class="fas fa-keyboard green"></i> M, I, C, F and 1-6 are also useful keyboard shortcuts 🙂
          </footer>
      </el-dialog>
    </fullscreen>
  </div>
</template>

<script>
import TestCard from './components/TestCard.vue'
import ControlBars from './components/ControlBars.vue'
import ControlGrid from './components/ControlGrid.vue'
import ControlRamp from './components/ControlRamp.vue'
import ControlPlaceholder from './components/ControlPlaceholder.vue'
import ControlAlteka from './components/ControlAlteka.vue'
import ControlAudioSync from './components/ControlAudioSync.vue'

var Mousetrap = require('mousetrap');
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'App',
  components: {
    TestCard, ControlBars, ControlGrid, ControlRamp, ControlPlaceholder, ControlAlteka, ControlAudioSync
  },
  methods: {
    fullscreenChange: function(fullscreen) {
      console.log('callback!', fullscreen)
        this.fullscreen = fullscreen
      },
    toggleFullscreen: function() {
      this.$refs['fullscreen'].toggle()
    },
    mousemove: function() {
      let vm = this;
      this.showOverlay = true
      clearTimeout(this.mouseMoveTimer)
      this.mouseMoveTimer = setTimeout(function(){ vm.showOverlay = false }, 3000);
    }
  },
  data: function() { 
      return {
        config: require('./defaultConfig.json'),
        controlVisible: true,
        fullscreen: false,
        showOverlay: false,
        mouseMoveTimer: null,
        isMobile: isMobile
      }
    },
    mounted: function() {
      let vm = this;
      Mousetrap.bind('m', function() { vm.config.animated = !vm.config.animated });
      Mousetrap.bind('i', function() { vm.config.showInfo = !vm.config.showInfo });
      Mousetrap.bind(['c', 'space'], function() { vm.controlVisible = !vm.controlVisible });
      Mousetrap.bind('f', function() { vm.$refs['fullscreen'].toggle() });
      Mousetrap.bind(['1', 'a'], function() { vm.config.cardType = 'alteka' });
      Mousetrap.bind(['2', 'b'], function() { vm.config.cardType = 'bars' });
      Mousetrap.bind(['3', 'g'], function() { vm.config.cardType = 'grid' });
      Mousetrap.bind(['4', 'r'], function() { vm.config.cardType = 'ramp' });
      Mousetrap.bind(['5', 'n'], function() { vm.config.cardType = 'placeholder' });
      Mousetrap.bind(['6', 's', 'v'], function() { vm.config.cardType = 'audioSync' });
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
.green {
  color: #6ab42f;
  margin-right: 5px;
}
#overlay {
  position: absolute;
  width: 250px;
  top: 30px;
  right: 30px;
  padding: 5px;
  background: rgba(255,255,255,1.0);
  border-radius: 8px;
  text-align: center;
}
</style>
