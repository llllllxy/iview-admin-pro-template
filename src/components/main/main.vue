<template>
  <div class="layout-page">
    <Layout class="layout-div">
      <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          :width="256"
          v-model="isCollapsed"
          :class="themeType === 'light' ? 'themeLight' : 'themeDark'">

        <div class="logo" :class="headMaxWidth ? 'headMaxWidth' : ''">
          <img v-if="!isCollapsed && headMaxWidth" :src="headMaxWidthLogoImg" alt="">
          <img v-if="!isCollapsed && !headMaxWidth" :src="logoImg" alt="">
          <img v-if="isCollapsed" :src="logoSmall" alt="">
        </div>

        <Menu
            :active-name="activeName"
            :theme="themeType"
            width="auto"
            :class="menuitemClasses"
            :open-names="openNames"
            accordion
            ref="side_menu"
            @on-select="menuNav" v-show="!isCollapsed">

          <template v-for="(item,index) in routersArr">

            <Submenu v-if="!item.meta.hide && !item.meta.singlePage"
                     :name="item.name">
              <template slot="title">
                <Icon :type="item.meta.icon"/>
                <span class="titlespan">{{ item.meta.title }}</span>
              </template>

              <template v-for="it in item.children">
                <!--三级菜单的处理，目前没用递归的形式，考虑到需求最多也就三级菜单，所以先这么简单处理，后续有需要再进行改造-->
                <Submenu v-if="it.children" :name="it.name">
                  <template slot="title">
                    <span class="titlespan">{{ it.meta.title }}</span>
                  </template>

                  <menu-item v-if="!node.meta.hide"
                             v-for="node in it.children"
                             :name="node.name"
                             :key="node.name">
                    <span style="margin-left: 15%">{{ node.meta.title }}</span>
                  </menu-item>
                </Submenu>

                <menu-item v-if="!it.children && !it.meta.hide"
                           :name="it.name">
                  <span>{{ it.meta.title }}</span>
                </menu-item>
              </template>
            </Submenu>

            <!--如果只有一个子路由-->
            <menu-item v-else-if="!item.meta.hide && item.meta.singlePage"
                       v-for="it in item.children" :key="index + it.name" class="ivu-menu-submenu"
                       :class="{ 'liActive': $route.name === it.name}" style="padding: 0!important;"
                       :name="it.name">
              <div class="ivu-menu-submenu-title">
                <Icon :type="item.meta.icon"/>
                <span style="margin-left: 10px">{{ it.meta.title }}</span>
              </div>
            </menu-item>

          </template>
        </Menu>

        <Dropdown v-for="(item,ind) in routersArr" :key="ind" v-show="isCollapsed && !item.meta.hide"
                  class="menuSmall" @on-click="dropdownNav">
                            <span :class="item.name === openNames[0]?'active':''">
                                <Icon :type="item.meta.icon"/>
                            </span>
          <DropdownMenu slot="list">

            <template v-for="it in item.children">

              <Dropdown placement="right-start" v-if="it.children" :name="item.name">
                <DropdownItem>
                  {{ it.meta.title }}
                  <Icon type="ios-arrow-forward"></Icon>
                </DropdownItem>
                <DropdownMenu slot="list">
                  <DropdownItem v-for="(node,ind) in it.children" v-if="!node.meta.hide"
                                :name="node.name" :key="ind"
                                :selected="node.name === activeName">
                    {{ node.meta.title }}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <DropdownItem v-if="!it.children && !it.meta.hide"
                            :name="it.name"
                            :selected="it.name === activeName">
                {{ it.meta.title }}
              </DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>

      </Sider>
      <Layout>
        <!--头部-->
        <Header class="header flexR">
          <div class="header_left flexR">
                        <span :class="['sider-trigger-a', isCollapsed ? 'collapsed' : '']">
                            <Icon
                                @click.native="collapsedSider"
                                type="md-menu"
                                size="24"></Icon>
                        </span>
            <span @click="refresh()">
                            <Icon type="ios-refresh" size="24"/>
                        </span>
            <span>
                            <Breadcrumb>
                                <BreadcrumbItem v-for="item in breadCrumbList" :to="item.to"
                                                :key="`bread-crumb-${item.name}`">
                                    {{ item.meta.title }}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </span>
          </div>
          <!--头部右边-->
          <div class="header_right flexR">
                        <span>
                            <Icon :type="isMaxWindow ? 'md-contract' : 'md-expand'" @click="maxWindow" size="18"/>
                        </span>
            <span>
                            <Dropdown trigger="click">
                                <Badge :count="3">
                                    <Icon type="ios-notifications-outline" size="20"/>
                                </Badge>
                                <DropdownMenu slot="list">
                                    <message></message>
                                </DropdownMenu>
                            </Dropdown>
                       </span>
            <span>
                            <Dropdown @on-click="personalSettings">
                            <a href="javascript:void(0)" style="color: #515A6E;">
                                <img :src="userData.avatar"
                                     alt=""
                                     class="ivu-avatar ivu-avatar-small"
                                     style="margin-right: 5px">
                                {{ userData.username }}
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="userCenter">个人中心</DropdownItem>
                                <DropdownItem name="setting">设置</DropdownItem>
                                <DropdownItem name="logout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        </span>
            <span @click="optionDrawer = true">
                           <Icon type="md-more" size="20"/>
                        </span>
          </div>
        </Header>

        <!--多页标签tagViews-->
        <div v-if="isTabsShow" class="tabsNav flexR">
          <div class="xiala pointer" v-if="tabSwitch" @click="handleScroll(240)">
            <Icon type="ios-arrow-back" size="16"/>
          </div>
          <div class="left flexR" id="tabsNav" ref="tabsNav" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
            <div class="flexR" id="tabsDiv" ref="tabsDiv" :style="{transform : 'translateX(' + transform + 'px)'}">
              <div class="pointer flexR" v-for="(item,index) in tagsViews" :key="item+index"
                   :data-route-item="item.name">
                                <span :class="activeName === item.name ? 'active' : '' " @click="tabNav(item.name)">
                                    {{ item.meta.title }}
                                </span>
                <Icon v-if="item.name !== $indexPage" type="ios-close" size="24" class="icon-close"
                      @click="tabNavClose(item,index)"/>
              </div>
            </div>
          </div>
          <div class="xiala pointer" v-if="tabSwitch" @click="handleScroll(-240)">
            <Icon type="ios-arrow-forward" size="16"/>
          </div>
          <div class="right">
            <Dropdown style="margin-left: 5px;" @on-click="tabRightClick">
              <div class="xiala pointer">
                <Icon type="ios-arrow-down"/>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="other">关闭其他</DropdownItem>
                <!-- <DropdownItem name="left">关闭左侧</DropdownItem> -->
                <!-- <DropdownItem name="right">关闭右侧</DropdownItem> -->
                <DropdownItem name="all">关闭全部</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <!--内容区-->
        <Content ref="main_content"
                 :style="{height: (!isTabsShow?'calc(100vh - 64px)':'calc(100vh - 108px)'), margin: (!isTabsShow ? '24px 0 24px 24px':'0 0 24px 24px') }"
                 class="main_content flexC">
          <keep-alive :include="cacheList">
            <router-view v-if="isRouterViewShow"></router-view>
          </keep-alive>
          <Footer></Footer>
        </Content>
        <Drawer v-model="optionDrawer" class="optionDrawer">
          <Divider slot="header" class="header">主题风格设置</Divider>
          <div class="flexR imgs">
            <Tooltip content="时尚酷黑" placement="top" transfer :class="themeType === 'dark'?'active':''">
              <img src="../../assets/main/nav-theme-dark.svg" alt="" @click="themeSwitch(0)">
            </Tooltip>
            <Tooltip content="极简雅白" placement="top" transfer :class="themeType === 'light'?'active':''">
              <img src="../../assets/main/nav-theme-light.svg" alt="" @click="themeSwitch(1)">
            </Tooltip>
          </div>
          <Divider class="otherDiv">其他设置</Divider>
          <div class="kaiguan flexR">
            <span>开启多页签</span>
            <i-switch v-model="isTabsShow" size="small"/>
          </div>
          <div class="kaiguan flexR">
            <span>顶栏通顶</span>
            <i-switch v-model="headMaxWidth" size="small"/>
          </div>
        </Drawer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import message from "../message/message"
import darkImg from '@/assets/main/logo-dark.png'
import lightImg from '@/assets/main/logo-light.png'
import logoSmall from '@/assets/main/logo-small.png'
import {themeData} from '@/config/config'
import Footer from "@/components/footer/footer"
import {mapGetters} from 'vuex'

export default {
  name: "main-page",
  components: {message, Footer},
  computed: {
    ...mapGetters([
      'routes',
      'tagsViews',
      'userData',
      'breadCrumbList'
    ]),
    // 获取vuex 用户tag多页签
    getTagsViewsVuex() {
      return this.tagsViews
    },
    // 导航收缩
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    cacheList() {
      return [...this.tagsViews.length ? this.tagsViews.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
  },
  data() {
    return {
      activeName: "", // 子导航选中的name
      isCollapsed: false, // 是否收缩
      isMaxWindow: false, // 是否最大化窗口
      routersArr: [], // 路由数据
      openNames: [], // 导航打开的父栏目
      transform: 0, // 导航左右方向移动距离
      tabSwitch: false, // 是否显示左右切换图标
      optionDrawer: false, // 是否显示配置抽屉
      themeType: themeData.themeType ? themeData.themeType : 'dark', // 主题风格
      logoImg: themeData.themeType === 'dark' ? lightImg : darkImg, // 主题logo图片
      logoSmall: logoSmall,
      isTabsShow: themeData.isTabsShow, // 是否显示多页签
      headMaxWidthLogoImg: darkImg, // 栏目是否通顶logo图片
      headMaxWidth: themeData.headMaxWidth, // 栏目是否通顶（最大宽度）
      isRouterViewShow: true, // 控制router-view的隐藏与展示
    }
  },
  created() {
    // 获取路由数据(JSON.parse(JSON.stringify是为了深拷贝)
    this.routersArr = JSON.parse(JSON.stringify(this.routes))
  },
  mounted() {
    // 如果没有权限 回到默认首页 防止错误地址程序崩溃 跳转非法路由
    if (this.$route.meta.hide) {
      this.$router.push({
            name: this.$indexPage
          }
      )
    }
    // 初始化面包屑数据
    this.$store.commit('permission/SET_HOME_ROUTE', this.routersArr)
    this.$store.commit('permission/SET_BREAD_CRUMB', this.$route)

    this.activeName = this.$route.name
    this.updateOpenName(this.activeName)
    this.$nextTick(() => {
      // 重新渲染导航
      if (this.$refs.side_menu) {
        this.$refs.side_menu.updateOpened()
      }
    })
  },
  methods: {
    getOpenNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName(name) {
      this.openNames = this.getOpenNamesByActiveName(name)
    },

    // 收缩切换
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
      this.$nextTick(() => {
        // 重新渲染导航
        this.$refs.side_menu.updateOpened()
      })
    },
    // 导航跳转
    menuNav(name) {
      this.routerPush(name)
    },
    // 下拉菜单跳转
    dropdownNav(name) {
      this.routerPush(name)
    },
    // tab切换跳转
    tabNav(name) {
      this.routerPush(name)
    },
    // 路由跳转
    routerPush(name) {
      this.$router.push({
        name: name
      })
      this.$nextTick(() => {
        let w = this.$refs.tabsDiv.offsetWidth
        let zw = this.$refs.tabsNav.offsetWidth

        if (w > zw) {
          // tagViews显示左右切换图标
          this.tabSwitch = true
        }
      })
    },
    // tab关闭
    tabNavClose(item, index) {
      let arr = this.tagsViews
      // 判断是否是首页（首页禁止关闭）
      if (item.name !== this.$indexPage) {
        this.$store.dispatch('tagsView/delTagsView', index)
        if (index !== 0) {
          // 如果关闭的是当前标签，则跳转到当前标签的上一个标签
          if (this.activeName === item.name) {
            this.$router.push({
              name: arr[index - 1].name
            })
          } else {
            // 否则直接关掉就行了，无需处理呀
          }
        }
      }
      this.$nextTick(() => {
        let w = this.$refs.tabsDiv.offsetWidth
        let zw = this.$refs.tabsNav.offsetWidth
        if (w < zw) {
          this.tabSwitch = false
        }
      })
    },
    // tab最右侧下拉框右键选中
    tabRightClick(type) {
      let arr = this.tagsViews
      this.tabSwitch = false
      switch (type) {
        case 'other': // 关闭其他，下标为0的不能删除，因为是'首页'
          for (let i = arr.length - 1; i > 0; i--) {
            if (arr[i].name !== this.activeName) {
              this.$store.dispatch('tagsView/delTagsView', i)
            }
          }
          break
        case 'all': // 关闭全部，下标为0的不能删除，因为是'首页'
          for (let i = arr.length - 1; i > 0; i--) {
            this.$store.dispatch('tagsView/delTagsView', i)
          }
          this.$router.push({
            name: this.$indexPage
          })
          break
      }
    },
    // 窗口最大化
    maxWindow() {
      if (this.isMaxWindow) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.isMaxWindow = false
      } else {
        let element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        this.isMaxWindow = true
      }
    },
    // 主题切换
    themeSwitch(type) {
      if (type === 0) {
        this.themeType = 'dark'
        this.logoImg = lightImg
      } else {
        this.themeType = 'light'
        this.logoImg = darkImg
      }
    },
    // 页面刷新
    refresh() {
      // 先隐藏
      this.isRouterViewShow = false
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isRouterViewShow = true
      })
    },
    // 个人设置功能
    personalSettings(name) {
      // 退出登录
      if (name === 'logout') {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({
            name: this.$loginPage
          })
        }).catch(error =>{})
      }
      // 个人中心
      if (name === 'userCenter') {
        this.$Message.info('个人中心页面待开发')
      }
      // 设置页面
      if (name === 'setting') {
        this.$Message.info('设置页面待开发')
      }
    },
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.tabsNav.offsetWidth
      const bodyWidth = this.$refs.tabsDiv.offsetWidth
      if (offset > 0) {
        this.transform = Math.min(0, this.transform + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.transform < -(bodyWidth - outerWidth)) {
            this.transform = this.transform
          } else {
            this.transform = Math.max(this.transform + offset, outerWidth - bodyWidth)
          }
        } else {
          this.transform = 0
        }
      }
    },
  },
  watch: {
    // 监听路由跳转
    $route(to, from) {
      this.$store.commit('permission/SET_BREAD_CRUMB', to)

      this.activeName = to.name
      this.updateOpenName(this.activeName)
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened()
      })
    },

    // 监听TagsViews数组内容改变
    getTagsViewsVuex(val) {
      if (val.length < 1) {
        this.$router.push({
          name: this.$indexPage
        })
      }
      // 动态监听路由变化 自动滚动多页签导航
      this.$nextTick(() => {
        // 修复退出登录 页面报错
        if (this.$refs.tabsDiv) {
          let w = this.$refs.tabsDiv.offsetWidth // 导航宽度
          let zw = this.$refs.tabsNav.offsetWidth // 总宽度
          if (w > zw) {
            let s = -(w - zw)
            this.transform = s
          } else {
            this.transform = 0
          }
        }
      })
    }
  },
  filters: {}
}
</script>

<style lang="less">
@import "main";
</style>
