<template>
  <div id="audioSync">

    <div class="border">
      <div class="borderTop"></div>
      <div class="borderBottom"></div>
      <div class="borderLeft"></div>
      <div class="borderRight"></div>
    </div>

    <div class="corners">
      <div class="cornerTopLeft"></div>
      <div class="cornerTopRight"></div>
      <div class="cornerBottomLeft"></div>
      <div class="cornerBottomRight"></div>
    </div>

    <div class="arrows">
      <div class="arrowTop"></div>
      <div class="arrowRight"></div>
      <div class="arrowBottom"></div>
      <div class="arrowLeft"></div>
    </div>


    <video id="vt24" v-if="!isSafari && config.audioSync.rate == 24" src="~@/assets/audiosync/24.webm" loop autoplay class="vt" />
    <video id="vt25" v-if="!isSafari && config.audioSync.rate == 25" src="~@/assets/audiosync/25.webm" loop autoplay class="vt" />
    <video id="vt29-97" v-if="!isSafari && config.audioSync.rate == 29.97" src="~@/assets/audiosync/29.97.webm" loop autoplay class="vt" />
    <video id="vt30" v-if="!isSafari && config.audioSync.rate == 30" src="~@/assets/audiosync/30.webm" loop autoplay class="vt" />
    <video id="vt50" v-if="!isSafari && config.audioSync.rate == 50" src="~@/assets/audiosync/50.webm" loop autoplay class="vt" />
    <video id="vt59-94" v-if="!isSafari && config.audioSync.rate == 59.94" src="~@/assets/audiosync/59.94.webm" loop autoplay class="vt" />
    <video id="vt60" v-if="!isSafari && config.audioSync.rate == 60" src="~@/assets/audiosync/60.webm" loop autoplay class="vt" />

    <video id="vt24mac" v-if="isSafari && config.audioSync.rate == 24" src="~@/assets/audiosync/24.mp4" loop autoplay class="vt" />
    <video id="vt25mac" v-if="isSafari && config.audioSync.rate == 25" src="~@/assets/audiosync/25.mp4" loop autoplay class="vt" />
    <video id="vt29-97mac" v-if="isSafari && config.audioSync.rate == 29.97" src="~@/assets/audiosync/29.97.mp4" loop autoplay class="vt" />
    <video id="vt30mac" v-if="isSafari && config.audioSync.rate == 30" src="~@/assets/audiosync/30.mp4" loop autoplay class="vt" />
    <video id="vt50mac" v-if="isSafari && config.audioSync.rate == 50" src="~@/assets/audiosync/50.mp4" loop autoplay class="vt" />
    <video id="vt59-94mac" v-if="isSafari && config.audioSync.rate == 59.94" src="~@/assets/audiosync/59.94.mp4" loop autoplay class="vt" />
    <video id="vt60mac" v-if="isSafari && config.audioSync.rate == 60" src="~@/assets/audiosync/60.mp4" loop autoplay class="vt" />

<span v-if="isSafari">HELLO</span>

    <div id="topText" class="textRow">
      <transition name="fade">
        <span v-resize-text="{ratio:1.5, maxFontSize: '50px'}" v-if="config.showInfo" style="text-align: left">{{ time }}</span>
      </transition>
      <span v-resize-text="{ratio:1.5, maxFontSize: '50px'}">{{ config.audioSync.rate }} FPS</span>
      <transition name="fade">
        <span v-resize-text="{ratio:1.5, maxFontSize: '50px'}" style="text-align: right" v-if="config.showInfo">{{ cardSize }}</span>
      </transition>
    </div>
  
    <div id="bottomText" class="textRow" >
      <span v-resize-text="{ratio:2, maxFontSize: '32px'}" style="text-align: left">Alteka Kards</span>
      <transition name="fade">
        <span v-resize-text="{ratio:2, maxFontSize: '32px'}" style="text-align: right" v-if="config.showInfo">{{ config.name }}</span>
      </transition>
    </div>
  
  </div>
</template>

<script>
import ResizeText from 'vue-resize-text'

export default {
  directives: { ResizeText },
  props: {
    config: Object,
    cardSize: String,
    time: String
  },
  data: function() {
    return {
      rates: ['24', '25', '29-97', '30', '50', '59-94', '60' ],
      isSafari: (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
    }
  }
}
</script>

<style scoped>

.textRow {
  position: absolute;
  font-size: 28px;
  width: calc(100% - 80px);
  left: 40px;
  right: 40px;
  text-align: center;
  opacity: 0.8;
  display: flex;
  height: 38px;
  overflow: hidden;
  vertical-align: bottom;
}

#topText {
  top: 30px;
  height: 50px;
}
.textRow span {
  width: 100%;
  vertical-align: bottom;
}

#bottomText {
  bottom: 25px;
}

.vt {
  position: absolute;
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  top: 50px;
  left: 50px;
  right: 50px;
  bottom: 50px;
}

.border {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}
.border div {
  position: absolute;
  background-size: 100px 100px;
  background-position: 50%;
}
.borderTop {
  background: black;
  background-image: linear-gradient(270deg, transparent 50%, currentColor 50%);
  height: 25px;
  width: 100%;
  top: 0px;
}
.borderBottom {
  background: black;
  background-image: linear-gradient(90deg, transparent 50%, currentColor 50%);
  height: 25px;
  bottom: 0px;
  width: 100%;
}
.borderLeft {
  left: 0;
  width: 25px;
  height: 100%;
  background: black;
  background-image: linear-gradient(0deg, transparent 50%, currentColor 50%);
}
.borderRight {
  right: 0;
  width: 25px;
  height: 100%;
  background: black;
  background-image: linear-gradient(180deg, transparent 50%, currentColor 50%);
}


.corners {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.corners div {
  width: 50px;
  height: 50px;
  position: absolute;
}
.cornerTopLeft {
  top: 0;
  left: 0;
  border-top: 25px solid #6ab42e;
  border-left: 25px solid #6ab42e;
}
.cornerTopRight {
  top: 0;
  right: 0;
  border-top: 25px solid #6ab42e;
  border-right: 25px solid #6ab42e;
}
.cornerBottomLeft {
  bottom: 0;
  left: 0;
  border-bottom: 25px solid #6ab42e;
  border-left: 25px solid #6ab42e;
}
.cornerBottomRight {
  bottom: 0;
  right: 0;
  border-bottom: 25px solid #6ab42e;
  border-right: 25px solid #6ab42e;
}


.arrows {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.arrows div {
  position: absolute;
  width: 0;
  height: 0;
}
.arrowTop {
  left: calc(50% - 25px);
  border-right: 25px solid transparent;
  border-bottom: 25px solid #6ab42e;
  border-left: 25px solid transparent;
}
.arrowBottom {
  left: calc(50% - 25px);
  bottom: 0;
  border-right: 25px solid transparent;
  border-top: 25px solid #6ab42e;
  border-left: 25px solid transparent;
}
.arrowLeft {
  top: calc(50% - 25px);
  border-top: 25px solid transparent;
  border-right: 25px solid #6ab42e;
  border-bottom: 25px solid transparent;
}
.arrowRight {
  top: calc(50% - 25px);
  right: 0;
  border-top: 25px solid transparent;
  border-left: 25px solid #6ab42e;
  border-bottom: 25px solid transparent;
}

@media screen and (max-height: 600px), (max-width: 600px) {
  .borderLeft {
    width: 15px;
  }
  .borderRight {
    width: 15px;
  }
  .borderTop {
    height: 15px;
  }
  .borderBottom {
    height: 15px;
  }
  #bottomText {
    bottom: 15px;
  }
  #topText {
    bottom: 15px;
  }

  .corners div {
    height: 30px;
    width: 30px;
  }
  .cornerTopLeft {
    border-width: 15px;
  }
  .cornerTopRight {
    border-width: 15px;
  }
  .cornerBottomLeft {
    border-width: 15px;
  }
  .cornerBottomRight {
    border-width: 15px;
  }

  .arrowTop {
    border-width: 15px;
    left: calc(50% - 15px)
  }
  .arrowBottom {
    border-width: 15px;
    left: calc(50% - 15px)
  }
  .arrowLeft {
    border-width: 15px;
    top: calc(50% - 15px)
  }
  .arrowRight {
    border-width: 15px;
    top: calc(50% - 15px)
  }
}

#audioSync {
  background: #272727;
  height: 100%;
  width: 100%;
  color: white;
  font-size: 16px;
}

</style>
