<template>
  <exception-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/>
</template>

<script>
import svg404 from '@/assets/exception/404.svg'
import exceptionContent from './exception-content.vue'
export default {
  name: 'exception_404',
  components: {
    exceptionContent
  },
  data () {
    return {
      src: svg404
    }
  }
}
</script>
