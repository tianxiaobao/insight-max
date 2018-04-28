<template>
<div class="mainCon">
    <div class="indexTit">
        <h2 class="fl"><i class="titIcon"></i>我的大屏</h2>
        <div class="tip fr tipFixed" v-if="opSuccess" >温馨提示：操作成功</div>
        <div class="tip-warning fr tipFixed" v-if="opFailed">温馨提示：操作失败</div>
    </div>
    <!-- 基本信息 begin -->
    <div class="innerCon">
        <div class="statement">
            <div class="s-leftMenu" id="leftDiv">
                <div class="mt myScreen-title">我的大屏<span class="fold-txt" @click="newScreen">+新建大屏</span></div>
                <div class="mc">
                    <div class="s-search">
                        <input type="text" class="s-searchInput" placeholder="请输入关键词搜索" v-model="key"><a class="s-searchBtn"><i class="i31"></i></a>
                    </div>
                    <ul class="source-menu myScreen-left">
                        <li :class="curScreen.bigScreenId==screen.bigScreenId?'on':''" v-for="screen,$index in screenList" @click="setCurScreen($index)">
                            <h3 class="fl">{{screen.bigScreenName}}</h3>
                            <span class="fold-txt fr" @click.stop="showList($event)">...</span><ul class="fold-drop newdrop"><li><a @click.stop="reScreen($index,screen.bigScreenId)">重命名</a></li><li><a @click.stop="copScreen($index,screen.bigScreenId)">复制</a></li><li><a @click.stop="delScreen($index,screen.bigScreenId)">删除</a></li></ul>
                            <div class="clear"></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="s-rightMenu">
                <div class="bor-box-mt">
                    {{curScreen.bigScreenName}}<div class="fr" v-if="curScreen.bigScreenId!=null">
                    <router-link :to="{ path: '/editScreen', query: { id: curScreen.bigScreenId}}" class="ml10 blueLink">编辑</router-link>
                    <a class="ml10 blueLink" @click="preview">预览</a>
                    <a @click="publish" class="ml10 blueLink" v-if="curScreen.push">发布（开）</a>
                    <a @click="publish" class="ml10 blueLink" v-if="!curScreen.push">发布（关）</a></div>
                </div>
                <div class="bor-box-mc white-bg mb20" style="overflow:hidden;">
                    <img :src="curScreen.picUrl" onerror="javascript:this.src='/static/images/defaultBg.png';" style="max-width: 100%;">
                </div>
            </div>
        </div>
    </div>
    <!-- 基本信息 end -->
    <!-- 新建大屏弹窗开始 -->
    <div class="popup layerScreen" style="display: none;padding: 54px 24px;">
        <ul class="listItem">
            <li class="first">
                <p class="tit">大屏名称：</p>
                <p class="con">
                    <input type="text" class="inputMode w270" v-model="NewScreen.name" v-if="NewScreen.used" maxlength="30" :class="errorTip?'itxt-error':''">
                    <input type="text" class="inputMode w270" v-model="ReScreen.name" v-else-if="ReScreen.used" maxlength="30" :class="errorTip?'itxt-error':''">
                    <input type="text" class="inputMode w270" v-model="CopScreen.name" v-else="CopScreen.used" maxlength="30" :class="errorTip?'itxt-error':''">
                </p>
                <p class="tips" v-if="!errorTip">支持中英文，数字，30字符内</p>
                <p class="tips red" v-if="errorTip">请输入正确的名称（支持中英文，数字，30字符内）</p>
            </li>
        </ul>
    </div>
    <!-- 新建大屏弹窗结束 -->
    <!-- 删除弹出层开始 -->
    <div class="popup delScreen" style="display:none;">
        <div class="textCon f14">
           确认删除大屏：{{DelScreen.name}}？
           </div>
    </div>
    <!-- 删除弹出层结束 -->
    <!-- 发布弹窗开始 -->
    <div class="popup pubScreen" style="display: none;">
        <ul class="listItem">
            <li class="first">
                <p class="tit">发布：</p>
                <p class="con"><i class="switch" :class="curScreen.push?'on':'off'" @click="switchBtn"></i></p>
            </li>
            <li>
                <p class="tit">链接：</p>
                <p class="con"><input type="text" class="inputMode" v-model="pubLink"><span class="i41 mt10" title="复制" @click="copyTxt"><i class="i44"></i></span></p>
                <p class="tips">发布后将链接发给使用者，身份验证后即可查看！</p>
            </li>
            <li>
                <p class="tit">密码：</p>
                <p class="con"><i class="switch mr10" :class="curScreen.isPassword?'on':'off'" @click="switchPass"></i><input type="text" class="inputMode w160" v-model="pubPassword"></p>
                <p class="tips ml60">请设置查看密码</p>
            </li>
        </ul>
    </div>
    <!-- 发布弹窗结束 -->
</div>
</template>
<script>
import api from '../../api';
export default {
    name: 'myScreen',
    data () {
        return {
            screens:[],
            screenList:[],// 大屏列表
            curScreen:{bigScreenId:null},// 当前screen
            NewScreen:{
                used:false,
                name:null
            },// 新建大屏
            ReScreen:{
                used:false,
                name:null
            },// 重命名大屏
            CopScreen:{
                used:false,
                name:null
            },// 复制大屏
            DelScreen:{
                name:null
            },// 删除大屏
            opSuccess:false,// 操作提示
            opFailed:false,// 操作提示
            key:'',// 搜索关键字
            pubPassword:'', // 发布密码
            errorTip:false// 错误提示
        };
    },
    watch:{
        key:function (val) {
            const screens = this.screens;
            this.screenList = screens.filter(function (item) {
                return item.bigScreenName.toLowerCase().indexOf(val.toLowerCase()) != -1;
            });
        }
    },
    computed: {
        // 发布链接
        pubLink: function () {
            const url = window.location.href.split("?")[0].replace('console/myScreen', 'previewScreen?id=');
            return url+this.curScreen.bigScreenId;
        }
    },
    mounted () {
        document.title = '大屏';
        this.getMyScreen();
    },
    methods: {
        // 判断编辑的大屏
        setEditScreen () {
            if(this.$route.query.id) {
                const _this = this;
                const id = this.$route.query.id;
                this.screenList.forEach(function ( item) {
                    if(item.bigScreenId == id) {
                        _this.curScreen = item;
                    }
                });
            }
        },
        // 获取大屏列表
        getMyScreen () {
            api.getScreenList().then(res => {
                if(res.code == 0 && res.data['screens']!=null) {
                    this.screens = res.data['screens'];
                    this.screenList = res.data['screens'];
                    this.curScreen = this.screenList[0];
                    this.key = '';
                    this.setEditScreen();
                } else {
                }
            });
        },
        // 左侧选择当前大屏
        setCurScreen (index) {
            this.curScreen = this.screenList[index];
        },
        // 新建大屏函数
        newScreen () {
            this.NewScreen.used = true;
            this.ReScreen.used = false;
            this.CopScreen.used = false;
            this.layerScreen('新建大屏',(layero, index) => {
                if(this.checkName(this.NewScreen.name)) {
                    this.errorTip = false;
                    api.newScreen({bsName:this.NewScreen.name}).then(res => {
                        if(res.code == 0) {
                            this.opSuccess = true;
                            setTimeout(() => {this.opSuccess = false;}, 3000);
                            this.NewScreen.name = null;
                            this.$router.replace({path:'/editScreen',query:{id:res.data}});
                            layer.close(index);
                        } else {
                            this.layerMsg(res.message);
                        }
                    });
                }else{
                    this.errorTip = true;
                }
            }, () => {
                this.errorTip = false;
                this.NewScreen.name = null;
            });
        },
        // 重命名函数
        reScreen (index,id) {
            this.NewScreen.used = false;
            this.ReScreen.used = true;
            this.CopScreen.used = false;
            this.layerScreen('重命名',(layero, index) => {
                const params = {bsId:id,bsName:this.ReScreen.name};
                if(this.checkName(this.ReScreen.name)) {
                    this.errorTip = false;
                    api.reScreen(params).then(res => {
                        if(res.code == 0) {
                            this.opSuccess = true;
                            setTimeout(() => {this.opSuccess = false;}, 3000);
                            this.ReScreen.name = null;
                            this.getMyScreen();
                            layer.close(index);
                        } else {
                            this.layerMsg(res.message);
                        }
                    });
                }else{
                    this.errorTip = true;
                }
            }, () => {
                this.errorTip = false;
                this.ReScreen.name=null;
            });
        },
        // 复制大屏函数
        copScreen (index,id) {
            this.NewScreen.used = false;
            this.ReScreen.used = false;
            this.CopScreen.used = true;
            this.layerScreen('复制大屏',(layero, index) => {
                const params = {id:id,bsName:this.CopScreen.name};
                if(this.checkName(this.CopScreen.name)) {
                    this.errorTip = false;
                    api.copScreen(params).then(res => {
                        if(res.code == 0) {
                            this.opSuccess = true;
                            setTimeout(() => {this.opSuccess = false;}, 3000);
                            this.CopScreen.name = null;
                            this.getMyScreen();
                            layer.close(index);
                        } else {
                            this.layerMsg(res.message);
                        }
                    });
                }else{
                    this.errorTip = true;
                }
            }, () => {
                this.errorTip = false;
                this.CopScreen.name = null;
            });
        },
        // 根据ID删除大屏
        delScreen (index,id) {
            this.DelScreen.name = this.screenList[index].bigScreenName;
            this.layerDelScreen((layero, index) => {
                api.delScreen({id:id}).then(res => {
                    if(res.code == 0) {
                        this.opSuccess = true;
                        setTimeout(() => {this.opSuccess = false;}, 3000);
                        this.getMyScreen();
                        layer.close(index);
                    } else {
                        this.layerMsg(res.message);
                    }
                });
            }, () => {
            });
        },
        // 发布按钮
        switchBtn () {
            this.curScreen.push=!this.curScreen.push;
            this.$forceUpdate();
        },
        // 密码按钮
        switchPass () {
            this.curScreen.isPassword=!this.curScreen.isPassword;
            this.$forceUpdate();
        },
        // 发布函数
        publish () {
            const push = this.curScreen.push;
            this.layerPubScreen((layero, index) => {
                const params = {bsId:this.curScreen.bigScreenId,isPush:this.curScreen.push,bsUrl:this.pubLink,isPassword:this.curScreen.isPassword,password:this.pubPassword};
                api.publish(params).then(res => {
                    if(res.code == 0) {
                        this.opSuccess = true;
                        setTimeout(() => {this.opSuccess = false;}, 3000);
                        layer.close(index);
                    } else {
                        this.layerMsg(res.message);
                    }
                });
            }, () => {
                this.curScreen.push = push;
            });
        },
        // 复制功能
        copyTxt () {
            $(".pubScreen .inputMode")[0].select();
            document.execCommand("Copy");
        },
        // 预览功能
        preview () {
            const url = window.location.href.split("?")[0].replace('console/myScreen', 'previewScreen?id=');
            window.open(url+this.curScreen.bigScreenId+'&pre=1');
        },
        // 检查名称
        checkName (name) {
            const regex = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,30}$/;
            return regex.test(name);
        },
        showList (event) {
            const wh = $(window).height();
            const target = $($(event)[0].target);
            const drop = target[0].nextSibling;
            if($(drop).hasClass("open")) {
                $(drop).removeClass("open");
            } else{
                $(".newdrop").removeClass("open");
                $(drop).addClass("open");
            }
            if(wh-target.offset().top < 100) {
                $(drop).css("top","-80px");
            }
            $(document).one('click',function () {
                $(".newdrop").removeClass("open");
            });
        }
    }
};
</script>
<style>
.source-menu li,.myScreen-title .fold-txt,.blueLink{
    cursor: pointer;
}
.tipFixed{
    position: fixed;
    right: 20px;
}
.myScreen-left{
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    top: 84px;
    width: 198px;
}
.myScreen-left h3{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 120px
}
.source-menu.myScreen-left>li{
    position: relative;
}
.itxt-error {
    border: 1px solid #ff0000;
}
.tips.red {
    color: #ff0000;
}
.newdrop{
    z-index: 11;
    top: 26px;
}
.newdrop.open{
    display: block;
}
.newdrop li{
    padding: 0;
    line-height: 30px;
}
.newdrop li a{
    display: block;
    padding: 0 5px;
    line-height: 30px;
    text-align: left;
}
html{
    overflow-x: auto;
}
</style>