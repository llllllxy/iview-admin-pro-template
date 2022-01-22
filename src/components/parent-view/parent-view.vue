<template>
    <keep-alive :include="cacheList" :exclude="notCacheName">
        <router-view ref="child"/>
    </keep-alive>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ParentView",
        computed: {
            ...mapGetters([
                'tagsViews'
            ]),
            notCacheName () {
                return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : '']
            },
            cacheList () {
                const list = [...this.tagsViews.length ? this.tagsViews.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
                return list
            },
        }
    }
</script>

<style scoped>

</style>
