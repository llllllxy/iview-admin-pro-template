<template>
  <exception-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src"/>
</template>

<script>
import svg500 from '@/assets/exception/500.svg'
import exceptionContent from './exception-content.vue'
export default {
  name: 'exception_500',
  components: {
    exceptionContent
  },
  data () {
    return {
      src: svg500
    }
  }
}
</script>
