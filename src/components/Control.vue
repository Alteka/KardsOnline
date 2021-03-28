<template>
  <div id="wrapper" style="position: relative;" :class="{ darkMode : darkMode }">

<el-form ref="form" :model="config" label-width="120px" size="small">

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
  </div>
</template>

<script>
import ControlBars from './Control/ControlBars.vue'
import ControlGrid from './Control/ControlGrid.vue'
import ControlRamp from './Control/ControlRamp.vue'
import ControlPlaceholder from './Control/ControlPlaceholder.vue'
import ControlAlteka from './Control/ControlAlteka.vue'
import ControlAudioSync from './Control/ControlAudioSync.vue'



  export default {
    name: 'control',
    components: { ControlBars, ControlGrid, ControlRamp, ControlPlaceholder, ControlAlteka, ControlAudioSync },
    props: {
        config: Object
    },
    data: function () {
        return {
        sync: false,
        darkMode: false
        }
    }
  }
</script>

<style>
 body {
  font-family: Sansation, Helvetica, sans-serif;
  overflow: hidden !important;
}
@font-face {
  font-family: Sansation;
  src: url("~@/assets/Sansation-Regular.ttf");
}
.logo {
  margin-top: 10px;
  margin-bottom: 0px;
  font-family: Sansation;
}
.green {
  color: #6ab42f;
  margin-right: 5px;
}
.darkMode {
  background: #222;
}
.darkMode .el-divider {
  background: #555;
}
.darkMode .el-divider__text {
  background: #222;
  color: #aaa;
}
.darkMode label {
  color: #bbb;
}
.darkMode .el-tabs--border-card {
  background: #333;
  border: 1px solid #111;
}
.darkMode .el-tabs--border-card>.el-tabs__header {
  background: #292929;
  border-bottom: 1px solid #111;
}
.darkMode .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background: #333;
  border-right: 1px solid #111;
  border-left: 1px solid #111;
}
.darkMode .el-color-picker__trigger {
  border: 1px solid #666;
}
.darkMode .el-radio-button__inner {
  background: #3d3d3d;
  color: #ddd;
  border: 1px solid #666;
}
.darkMode .el-radio-button:first-child .el-radio-button__inner {
  border-left: 1px solid #666;
}
.darkMode .el-button {
  background: #3d3d3d;
  color: #ddd;
  border: 1px solid #666;
}
.darkMode .el-input__inner {
  background: #3d3d3d;
  color: #ddd;
  border: 1px solid #666;
}
.darkMode .el-input-number__increase {
  background: #292929;
  color: #ddd;
}
.darkMode .el-input-number__decrease {
  background: #292929;
  color: #ddd;
}
.darkMode .el-drawer {
  background: #292929;
  border-top: 3px solid #6ab42f;
  color: #ddd;
}
.darkMode .el-checkbox-button__inner {
  background: none;
}
</style>
