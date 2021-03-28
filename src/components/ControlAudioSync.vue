<template>
<div>
  <el-row>
    <el-form-item label="Video Rate (FPS)">
      <el-radio-group v-model="audioSync.rate" size="small">
          <el-radio-button v-for="item in rates" :key="item" :label="item">{{item}}</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-row>
</div>
</template>

<script>

  export default {
    props: {
      audioSync: Object
    },
    data: function() {
      return {
        audioDevices: [],
        rates: [24, 25, 29.97, 30, 50, 59.94, 60]
      }
    },
    methods: {
      updateDevices: function() {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          this.audioDevices = devices.filter(device => device.kind === 'audiooutput').filter(device => device.deviceId != 'communications')
        })  
      }
    },
    mounted: function() {
      this.updateDevices()
      setInterval(this.updateDevices, 5000)
    }
  }
</script>

<style scoped>
  
</style>
