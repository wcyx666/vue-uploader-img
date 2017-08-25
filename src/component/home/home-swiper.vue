<!--  url 上产地址  -->
<template>
  <div>
      <div class="health-describe-content">
      <textarea name="" id="" cols="30" rows="10" placeholder="文本框" v-model="textarea"></textarea>
      </div>
      <uploader :src="'url'" :textarea="textarea">
        <p class="photo-upload-text">
            提示文本
        </p>
      </uploader>
  </div>
</template>
<script>
  import uploader from './uploader.vue'
  export default {
    data() {
      return {
        textarea:""
      }
    },
    components: {
      uploader
    }
  }
</script>
<style>
  .health-describe-content {
    width: 100%;
    height: 4.55rem;
    background: #fff;
  }
  .health-describe-content textarea {
    resize: none;
    border: 0 none;
    outline: none;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.22rem 0.64rem 0 0.3rem;
    color: #333;
    font-size: 0.24rem;
    overflow: hidden;
  }
</style>