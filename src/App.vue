<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: '我的app'
      }
    },
    components: {
      
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height:100%;
  }
  @media screen and(min-width:750px) {
    #app {
      width: 750px;
      height:100%;
      margin:0 auto;
    }
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
  }

  a {
    color: #42b983;
  }
</style>
