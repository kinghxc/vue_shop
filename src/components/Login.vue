<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录头像部分 -->
      <div class="login_avatar">
        <img src="../assets/logo.png">
      </div>
      <!-- 登录表单部分 -->
      <el-form class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮部分 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单登录 用户名 和 密码 数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async vali => {
        if (!vali) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 将登陆成功后的 token 保存到客户端的 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 通过 编程式导航跳转到后台主页 路径 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
  .login_container {
    height: 100%;
    background-color: #2b4b6b;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
  }

  .login_box .login_avatar {
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .login_box .login_avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ccc;
  }

  .login_box .login_form {
    position: absolute;
    bottom: 16px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .login_box .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
