import {indexPage} from '@/config/config'
const state = {
    // 已打开的路由数据
    tagsViews: localStorage.getItem('tagsViewList') ? JSON.parse(localStorage.getItem('tagsViewList')) : []
}

const mutations = {
    SET_TAGS_VIEW(state, data) { // 设置路由
        state.tagsViews = data
        localStorage.setItem('tagsViewList', JSON.stringify(state.tagsViews))
    },
    ADD_TAGS_VIEW(state, data) { // 增加路由
        const flag = state.tagsViews.some(r => r.path === data.path)
        if(!flag) {
            // 如果是默认主页 就放到第一个
            if(data.name === indexPage) {
                state.tagsViews.unshift(data)
            } else {
                state.tagsViews.push(data)
            }
            localStorage.setItem('tagsViewList', JSON.stringify(state.tagsViews))
        }
    },
    DEL_TAGS_VIEW(state, index) { // 删除路由
        state.tagsViews.splice(index, 1)
        localStorage.setItem('tagsViewList', JSON.stringify(state.tagsViews))
    }
}

const actions = {
    setTagsView({ commit }, data) { // 设置路由
        commit('SET_TAGS_VIEW', data);
    },
    addTagsView({ commit }, data) { // 增加路由
        commit('ADD_TAGS_VIEW', data);
    },
    delTagsView({ commit }, index) { // 删除路由
        commit('DEL_TAGS_VIEW', index);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
