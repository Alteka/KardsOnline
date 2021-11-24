<template>
  <div id="app">
    <fullscreen ref="fullscreen" @change="fullscreenChange">
  
      <test-card :config="config"></test-card>

      <div id="ClickMeAlice" v-on:click="controlVisible = true" @mousemove="mousemove"></div>

      <transition name="fade">
        <div id="overlay" v-if="showOverlay && !isMobile">
          <img src="./assets/logo.png" width="140px" />
          <p style="font-size: 150%; margin-top: 0px; margin-bottom: 10px;">Kards Online <span style="font-size: 50%;">v1.0</span></p>
          <el-button round type="success" v-on:click="controlVisible = true"><i class="fas fa-cogs"></i> Show Controls</el-button>
          <p style="font-size: 80%;">You can also just click anywhere...</p>
        </div>
      </transition>

      <el-dialog :visible.sync="controlVisible" width="666px"> 
        <el-form ref="form" :model="config" label-width="120px" size="small">
          <el-row style="text-align: center; font-size: 150%;">
            <el-col :span="5"><img src="./assets/icon.png" width="80px"/></el-col>
            <el-col :span="14">
              <p style="margin-bottom: 10px; margin-top: 0;">Kards Online <span style="font-size: 50%;">v1.0</span></p>
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
          <i class="fas fa-keyboard green"></i> M, I, C, F and 1-6 are also useful keyboard shortcuts 🙂<br />
          <el-button type="success" round size="small" v-on:click="shareVisible=true"><i class="fas fa-share"></i> Share</el-button>
          </footer>
      </el-dialog>

      <el-dialog :visible.sync="shareVisible"  title="Share Test Card Link"> 
       <el-form ref="form" :model="config" label-width="120px" size="small">
          
          <el-row style="text-align: center; padding-bottom: 15px;">
              Show controls on load <el-switch v-model="shareControlVisible" style="padding-left: 5px;"></el-switch><br />
              <span style="font-size: 80%;">(Useful for loading into vMix or OBS)</span>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="URL" label-width="70px">
                <el-input v-model="shareLink" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" style="text-align: center;">
            <el-button type="success" icon="el-icon-document-copy" size="small" round @click="copyUrl(shareLink)"></el-button>
            </el-col>
          </el-row>

          <el-row style="text-align: center;">
            You can share this current test card as a link!
          </el-row>

       </el-form>
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

var Mousetrap = require('mousetrap')
import { isMobile } from 'mobile-device-detect'

const set = require('lodash/set')
const has = require("lodash/has")
const get = require("lodash/get")

let initialConfig = {
  ...require('./defaultConfig.json'),
  ...decode(window.location.search)
}

export default {
  name: 'App',
  components: {
    TestCard, ControlBars, ControlGrid, ControlRamp, ControlPlaceholder, ControlAlteka, ControlAudioSync
  },
  methods: {
    fullscreenChange: function(fullscreen) {
        this.fullscreen = fullscreen
      },
    toggleFullscreen: function() {
      this.$refs['fullscreen'].toggle()
      this.$gtag.event('toggleFullscreen')
    },
    mousemove: function() {
      let vm = this;
      this.showOverlay = true
      clearTimeout(this.mouseMoveTimer)
      this.mouseMoveTimer = setTimeout(function(){ vm.showOverlay = false }, 3000);
    },
    copyUrl: function(value) {
      const el = document.createElement('textarea');  
      el.value = value;                                 
      el.setAttribute('readonly', '');                
      el.style.position = 'absolute';                     
      el.style.left = '-9999px';                      
      document.body.appendChild(el);                  
      const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
      el.select();                                    
      document.execCommand('copy');                   
      document.body.removeChild(el);                  
      if (selected) {                                 
        document.getSelection().removeAllRanges();    
        document.getSelection().addRange(selected);   
      }
    },
    encode: function(queryObj, nesting = "") {
      const pairs = Object.entries(queryObj).map(([key, val]) => {
        // Handle the nested, recursive case, where the value to encode is an object itself
        if (typeof val === "object") {
          return this.encode(val, nesting + `${key}.`);
        } else {
          // Handle base case, where the value to encode is simply a string.
          return [nesting + key, val].map(escape).join("=");
        }
      })
      return pairs.join("&");
    }
  },
  computed: {
    shareLink: function() {
      let c = JSON.parse(JSON.stringify(this.config)) // I know... so lazy right?
      delete c.predefineColors
      delete c['']
      c.controlVisible = this.shareControlVisible
      return 'https://kards.alteka.solutions/?' + this.encode(c)
    }
  },
  data: function() { 
      return {
        config: initialConfig,
        controlVisible: (initialConfig.controlVisible == "false") ? false : true,
        shareControlVisible: true,
        shareVisible: false,
        fullscreen: false,
        showOverlay: false,
        mouseMoveTimer: null,
        isMobile: isMobile,
        prevCard: null
      }
    },
    mounted: function() {
      let vm = this;
      Mousetrap.bind('m', function() { vm.config.animated = !vm.config.animated });
      Mousetrap.bind('i', function() { vm.config.showInfo = !vm.config.showInfo });
      Mousetrap.bind(['c', 'space'], function() { vm.controlVisible = !vm.controlVisible });
      Mousetrap.bind('f', vm.toggleFullscreen());
      Mousetrap.bind(['1', 'a'], function() { vm.config.cardType = 'alteka' });
      Mousetrap.bind(['2', 'b'], function() { vm.config.cardType = 'bars' });
      Mousetrap.bind(['3', 'g'], function() { vm.config.cardType = 'grid' });
      Mousetrap.bind(['4', 'r'], function() { vm.config.cardType = 'ramp' });
      Mousetrap.bind(['5', 'n'], function() { vm.config.cardType = 'placeholder' });
      Mousetrap.bind(['6', 's', 'v'], function() { vm.config.cardType = 'audioSync' });
    },
    watch: {
      config: {
        handler: function (val) { 
          if (val.cardType != this.prevCard) {
            console.log('card type now: ', val.cardType)
            this.$gtag.pageview({ page_path: val.cardType, page_title: val.cardType })
            this.prevCard = val.cardType
          }
        },
        deep: true
      },
    },
}

function decode(queryString) {
  const queryStringPieces = queryString.substring(1).split("&");
  const decodedQueryString = {};

  for (const piece of queryStringPieces) {
    let [key, value] = piece.split("=");
    value = value || "";
    if (has(decodedQueryString, key)) {
      const currentValueForKey = get(decodedQueryString, key);
      if (!Array.isArray(currentValueForKey)) {
        set(decodedQueryString, key, [currentValueForKey, value]);
      } else {
        currentValueForKey.push(decodeURIComponent(value));
      }
    } else {
      set(decodedQueryString, key, decodeURIComponent(value));
    }
  }
  return decodedQueryString;
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
