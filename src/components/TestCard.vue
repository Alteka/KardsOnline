<template>
  <div id="bounds" class="superblack">
    <div id="cards">

      <div id="cardForPNG" class="testcard" :class="{animated: config.animated && config.cardType !='alteka' && config.cardType != 'audioSync'}">
          <Grid v-if="config.cardType == 'grid'" :config="config" :cardSize="cardSize" :time="time"></Grid>
          <SMPTE v-else-if="config.cardType == 'bars' && config.bars.type=='smpte'" :config="config" :cardSize="cardSize" :time="time"></SMPTE>
          <ARIB v-else-if="config.cardType == 'bars' && config.bars.type=='arib'" :config="config" :cardSize="cardSize" :time="time"></ARIB>
          <Bars v-else-if="config.cardType == 'bars' && config.bars.type=='simple'" :config="config" :cardSize="cardSize" :time="time"></Bars>
          <Ramp v-else-if="config.cardType == 'ramp'" :config="config" :cardSize="cardSize" :time="time"></Ramp>
          <AudioSync v-else-if="config.cardType=='audioSync'" :config="config" :cardSize="cardSize" :time="time"></AudioSync>
          <Placeholder v-else-if="config.cardType == 'placeholder'" :config="config" :cardSize="cardSize" :time="time"></Placeholder>
          <Alteka v-else :config="config" :cardSize="cardSize" :time="time"></Alteka>
      </div>

      <div v-if="config.animated && config.cardType !='alteka' && config.cardType !='audioSync'" class="testcard" :class="{animatedAbove: config.animated}">
        <Grid v-if="config.cardType == 'grid'" :config="config" :cardSize="cardSize" :time="time"></Grid>
        <SMPTE v-if="config.cardType == 'bars' && config.bars.type=='smpte'" :config="config" :cardSize="cardSize" :time="time"></SMPTE>
        <ARIB v-if="config.cardType == 'bars' && config.bars.type=='arib'" :config="config" :cardSize="cardSize" :time="time"></ARIB>
        <Bars v-if="config.cardType == 'bars' && config.bars.type=='simple'" :config="config" :cardSize="cardSize" :time="time"></Bars>
        <Ramp v-if="config.cardType == 'ramp'" :config="config" :cardSize="cardSize" :time="time"></Ramp>
        <Placeholder v-if="config.cardType == 'placeholder'" :config="config" :cardSize="cardSize" :time="time"></Placeholder>
      </div>

      <div v-if="config.animated && config.cardType !='alteka' && config.cardType !='audioSync'" class="testcard" :class="{animatedLeft: config.animated}">
        <Grid v-if="config.cardType == 'grid'" :config="config" :cardSize="cardSize" :time="time"></Grid>
        <SMPTE v-if="config.cardType == 'bars' && config.bars.type=='smpte'" :config="config" :cardSize="cardSize" :time="time"></SMPTE>
        <ARIB v-if="config.cardType == 'bars' && config.bars.type=='arib'" :config="config" :cardSize="cardSize" :time="time"></ARIB>
        <Bars v-if="config.cardType == 'bars' && config.bars.type=='simple'" :config="config" :cardSize="cardSize" :time="time"></Bars>
        <Ramp v-if="config.cardType == 'ramp'" :config="config" :cardSize="cardSize" :time="time"></Ramp>
        <Placeholder v-if="config.cardType == 'placeholder'" :config="config" :cardSize="cardSize" :time="time"></Placeholder>
      </div>

      <div v-if="config.animated && config.cardType !='alteka' && config.cardType !='audioSync'" class="testcard" :class="{animatedAboveLeft: config.animated}">
        <Grid v-if="config.cardType == 'grid'" :config="config" :cardSize="cardSize" :time="time"></Grid>
        <SMPTE v-if="config.cardType == 'bars' && config.bars.type=='smpte'" :config="config" :cardSize="cardSize" :time="time"></SMPTE>
        <ARIB v-if="config.cardType == 'bars' && config.bars.type=='arib'" :config="config" :cardSize="cardSize" :time="time"></ARIB>
        <Bars v-if="config.cardType == 'bars' && config.bars.type=='simple'" :config="config" :cardSize="cardSize" :time="time"></Bars>
        <Ramp v-if="config.cardType == 'ramp'" :config="config" :cardSize="cardSize" :time="time"></Ramp>
        <Placeholder v-if="config.cardType == 'placeholder'" :config="config" :cardSize="cardSize" :time="time"></Placeholder>
      </div>

    </div>

  </div>
</template>

<script>
import Grid from './TestCard/Grid'
import Ramp from './TestCard/Ramp'
import Alteka from './TestCard/Alteka'
import SMPTE from './TestCard/SMPTE'
import ARIB from './TestCard/ARIB'
import Bars from './TestCard/Bars'
import AudioSync from './TestCard/AudioSync'
import Placeholder from './TestCard/Placeholder'


  export default {
    name: 'testcard',
    components: { Grid, Alteka, SMPTE, ARIB, Bars, Placeholder, Ramp, AudioSync },
    props: {
      config: Object
    },
    data: function() { 
      return {
        cardSize: Math.round(visualViewport.width) + ' x ' + Math.round(visualViewport.height),
        time: '00:00'
      }
    },
    methods: {
      updateTime: function() {
        var cd = new Date()
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      },
      zeroPadding: function(num, digit) {
          var zero = '';
          for(var i = 0; i < digit; i++) {
              zero += '0';
          }
          return (zero + num).slice(-digit);
      },
    },
    mounted: function() {
      let vm = this

      vm.updateTime()
      setInterval(vm.updateTime, 1000)
      
      window.addEventListener('resize', function() {
        vm.cardSize = Math.round(visualViewport.width) + ' x ' + Math.round(visualViewport.height)
      })
      
    }
  }
  </script>

<style>
@font-face {
  font-family: Sansation;
  src: url("~@/assets/Sansation-Regular.ttf");
}
#cards {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  color: white;
  overflow: hidden;
}


.infoBounds {
  position: absolute;
  font-size: 20px;
  width: 150px;
  height: 95px;
  padding-top: 55px;
  margin: auto;
  left: calc(50% - 75px);
  top: calc(50% - 75px);
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  color: red;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,0,0,1);
  z-index: -1;
}
.testcard {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.animated {
  animation: diagonal 30s infinite;
  animation-timing-function: linear;
}
@keyframes diagonal {
    0%       { transform: translatex(0%) translatey(0%) }
    100%     { transform: translatex(100%) translatey(100%) }
}

.animatedAbove {
  animation: diagonalAbove 30s infinite;
  animation-timing-function: linear;
}
@keyframes diagonalAbove {
    0%       { transform: translatex(0%) translatey(-100%) }
    100%     { transform: translatex(100%) translatey(0%) }
}

.animatedLeft {
  animation: diagonalLeft 30s infinite;
  animation-timing-function: linear;
}
@keyframes diagonalLeft {
    0%       { transform: translatex(-100%) translatey(0%) }
    100%     { transform: translatex(0%) translatey(100%) }
}

.animatedAboveLeft {
  animation: diagonalAboveLeft 30s infinite;
  animation-timing-function: linear;
}
@keyframes diagonalAboveLeft {
    0%       { transform: translatex(-100%) translatey(-100%) }
    100%     { transform: translatex(0%) translatey(0%) }
}


.modal {
  font-family: Sansation;
  font-size: 200%;
}

 .black {
    background-color: rgb(16,16,16);
  }
  .superblack {
    background-color: rgba(0,0,0,1)
  }
  .grey40 {
    background-color: rgb(104,104,104);
  }
  .superwhite {
    background-color: rgb(255,255,255);
  }
  .white {
    background-color: rgb(235,235,235);
  }
  .white75 {
    background-color: rgb(180,180,180);
  }
 

 .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
