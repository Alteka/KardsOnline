<template>
  <div> 
    <el-row>
      <el-col :span="8">
        <el-form-item label="Background" label-width="100">
          <el-color-picker v-model="alteka.bg" :predefine="colors"></el-color-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Foreground" label-width="100">
          <el-color-picker v-model="alteka.fg" :predefine="colors"></el-color-picker>
        </el-form-item>
      </el-col>      
      <el-col :span="8">
        <el-form-item label="Gradient" label-width="100">
          <el-switch v-model="alteka.gradient"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      alteka: Object,
      colors: Array
    }
  }
</script>

<style scoped>
  
</style>
