<template>
  <exception-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src"/>
</template>

<script>
import svg401 from '@/assets/exception/401.svg'
import exceptionContent from './exception-content.vue'
export default {
  name: 'exception_401',
  components: {
    exceptionContent
  },
  data () {
    return {
      src: svg401
    }
  }
}
</script>
