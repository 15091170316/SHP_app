<template>
  <div>
    <HeaderVue></HeaderVue>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header/HeaderVue.vue'
import FooterVue from '@/components/Footer/FooterVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    FooterVue
  }
}
</script>

<style>

</style>
