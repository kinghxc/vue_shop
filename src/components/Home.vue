<template>
  <el-container class="el_container">
    <!-- 头部区域 -->
    <el-header>
      <span>后台管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <el-container>
      <!-- 导航栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 菜单栏 -->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
            unique-opened>
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in MenuList" :key="item.id">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconList[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单栏 -->
              <el-menu-item :index="'/' + subitem.path + ''" v-for="subitem in item.children" :key="subitem.id" @click="saveActiveStatus('/' + subitem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subitem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>
      <!-- 主体内容区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 导航栏数据
      MenuList: [],
      // 图标对象
      iconList: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // 菜单导航链接
      activePath: ''
    }
  },
  created () {
    // 执行获取左侧导航栏数据函数
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.MenuList = res.data
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveActiveStatus (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped>
.el_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  color: #fff;
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #fff;
}

.el-aside .el-menu {
  border-right: none;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>
