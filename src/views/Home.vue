<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <test></test> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import test from '@/components/test.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
    // test
  }
}
</script>
