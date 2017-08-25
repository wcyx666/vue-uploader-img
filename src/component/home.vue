<template>
	<section class="home">
		<Swiper></Swiper>	
	</section>
</template>
<script>
	import Swiper from '../component/home/home-swiper.vue'
	export default {
		name: 'app',
		data () {
		  return {
		    msg: '我的app'
		  }
		},
		components: {
		  Swiper
		}
	}
</script>
<style>
	
</style>