<template>
    <div class="register-container">
        <!-- 注册内容 -->
        <div class="register">
            <h3>注册新用户
                <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
                </span>
            </h3>

            <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="userInfo.phone" placeholder="请输入你的手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="code">
                    <el-input v-model="userInfo.code" placeholder="请输入验证码" style="width:200px"></el-input>
                    <button style="width:100px;height: 38px;" @click="getCodeHandler">获取验证码</button>
                </el-form-item>
                <el-form-item label="登录密码：" prop="password">
                    <el-input v-model="userInfo.password" placeholder="请输入你的登录密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="passwordRepeat">
                    <el-input v-model="userInfo.passwordRepeat" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <div class="controls">
                    <input name="m1" type="checkbox" v-model="userInfo.agree">
                    <span>同意协议并注册《尚品汇用户协议》</span>
                </div>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('userInfo')" style="width:200px;margin-top: 10px;">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 底部 -->
        <div class="copyright">
            <ul>
                <li>关于我们</li>
                <li>联系我们</li>
                <li>联系客服</li>
                <li>商家入驻</li>
                <li>营销中心</li>
                <li>手机尚品汇</li>
                <li>销售联盟</li>
                <li>尚品汇社区</li>
            </ul>
            <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
            <div class="beian">京ICP备19006430号
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'RegisterVue',
    data() {
        return {
            userInfo: {
                phone: '',
                code: '',
                password: '',
                passwordRepeat: '',
                agree: false
            },
            // 表单验证
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号格式不正确', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式为6-18位', trigger: 'blur' }
                ],
                passwordRepeat: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码格式为6-18位', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        ...mapActions('user', ['getRegisterCode', 'registerUser']),
        // 获取验证码事件
        async getCodeHandler() {
            try {
                if (this.userInfo.phone) {
                    let code = await this.getRegisterCode(this.userInfo.phone)
                    this.userInfo.code = code
                } else {
                    alert('请输入你的手机号')
                }
            } catch (error) {
                console.log(error.message);
                alert('获取验证码失败')
            }
        },

        // 表单验证是否成功事件
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registerHandler()  //注册并跳转
                } else {
                    console.log('表单验证不通过');
                    return false;
                }
            });
        },

        // 确认注册事件
        async registerHandler() {
            try {
                if (this.userInfo.phone && this.userInfo.password === this.userInfo.passwordRepeat && this.userInfo.agree) {
                    let params = {
                        phone: this.userInfo.phone,
                        password: this.userInfo.password,
                        code: this.userInfo.code
                    }
                    await this.registerUser(params)
                    this.$router.push('/login')
                }

            } catch (error) {
                alert('账号注册失败')
            }
        }
    }
}
</script>

<style lang="less" scoped>
// el-input框修改样式
.register-container .register div[data-v-8b12950a]:nth-of-type(1) {
    margin-top: 0;
}

.el-form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-form-item {
        width: 400px
    }
}

.register-container {
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;

        h3 {
            background: #ececec;
            margin: 0;
            padding: 6px 15px;
            color: #333;
            border-bottom: 1px solid #dfdfdf;
            font-size: 20.04px;
            line-height: 30.06px;

            span {
                font-size: 14px;
                float: right;

                a {
                    color: #e1251b;
                }
            }
        }

        div:nth-of-type(1) {
            margin-top: 40px;
        }

        // .content {
        //     padding-left: 390px;
        //     margin-bottom: 18px;
        //     position: relative;

        //     label {
        //         font-size: 14px;
        //         width: 96px;
        //         text-align: right;
        //         display: inline-block;
        //     }

        //     input {
        //         width: 270px;
        //         height: 38px;
        //         padding-left: 8px;
        //         box-sizing: border-box;
        //         margin-left: 5px;
        //         outline: none;
        //         border: 1px solid #999;
        //     }

        //     img {
        //         vertical-align: sub;
        //     }

        //     .error-msg {
        //         position: absolute;
        //         top: 100%;
        //         left: 495px;
        //         color: red;
        //     }
        // }

        .controls {
            text-align: center;
            position: relative;

            input {
                vertical-align: middle;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .btn {
            text-align: center;
            line-height: 36px;
            margin: 17px 0 0 55px;

            button {
                outline: none;
                width: 270px;
                height: 36px;
                background: #e1251b;
                color: #fff !important;
                display: inline-block;
                font-size: 16px;
            }
        }
    }

    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
}
</style>